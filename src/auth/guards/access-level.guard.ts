import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AccessLevel, WorkspaceMember } from '@prisma/client'
import { ACCESS_KEY } from 'src/decorators/user-access'
import { WorkspaceMemberService } from 'src/workspace-member/workspace-member.service'

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private workspaceMemberService: WorkspaceMemberService
  ) {}

  async  canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredAccess = this.reflector.getAllAndOverride<AccessLevel[]>(
      ACCESS_KEY,
      [
        context.getHandler(),
        context.getClass(),
      ],
    )
    if (!requiredAccess) return true
    
    const request = context.switchToHttp().getRequest()
    const workspaceId = request.params.workspaceId
    const user = request.user
    const workspaceMember = await this.workspaceMemberService.findOneByCondition({userId: user.userId, workspaceId}) as WorkspaceMember
    if(!workspaceMember) throw new ForbiddenException("You're not authorized")
    const accessLevel = workspaceMember.accessLevel
    console.log({accessLevel})

    return requiredAccess.includes(accessLevel)
  }
}