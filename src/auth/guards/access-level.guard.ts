import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  ForbiddenException,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { AccessLevel, WorkspaceMember } from "@prisma/client"
import { ACCESS_KEY } from "src/decorators/user-access"
import { ProjectAccessService } from "src/project-access/project-access.service"
import { WorkspaceMemberService } from "src/workspace-member/workspace-member.service"

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private workspaceMemberService: WorkspaceMemberService,
    private projectAccessService: ProjectAccessService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredAccess = this.reflector.getAllAndOverride<AccessLevel[]>(
      ACCESS_KEY,
      [context.getHandler(), context.getClass()],
    )
    if (!requiredAccess) return true

    const request = context.switchToHttp().getRequest()
    // You need to pass the workspaceId and projectId in the params for every authorized route.
    const workspaceId = request.params?.workspaceId
    const projectId = request.params?.projectId
    const user = request.user
    // find exact access level
    let accessLevel: AccessLevel
    // If user do not request task route, just check workspace-access-level, in the other hand prioritize project-access-level
    const workspaceMember =
      (await this.workspaceMemberService.findOneByCondition({
        userId: user.userId,
        workspaceId,
      })) as WorkspaceMember
    if (!workspaceMember) throw new ForbiddenException("You're not authorized")
    accessLevel = workspaceMember.accessLevel
  // Check path of request to get exact access-level
    const controllerPath = request.url.split("/")[1]
    if (controllerPath === "task") {
      const projectAccess = await this.projectAccessService.findProjectAccessBy(
        projectId,
        user.userId,
      )
      if (!projectAccess) throw new ForbiddenException("You're not authorized")
      accessLevel = projectAccess.accessLevel
    }
    if(!requiredAccess.includes(accessLevel)) {
      throw new ForbiddenException("You're not authorized")
    }
    return true
  }
}
