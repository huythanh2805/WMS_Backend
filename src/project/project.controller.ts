import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common"
import { ProjectService } from "./project.service"
import { CreateProjectDto } from "./dto/create-project.dto"
import { UpdateProjectDto } from "./dto/update-project.dto"
import { JwtAuthGuard } from "src/auth/guards/jwt.guard"

@UseGuards(JwtAuthGuard)
@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    return this.projectService.createProject(createProjectDto, req.user.userId)
  }

  @Get("/overview/:workspaceId/:projectId")
  getProjectOverview(
    @Param("workspaceId") workspaceId: string,
    @Param("projectId") projectId: string,
  ) {
    return this.projectService.getProjectOverview({ workspaceId, projectId })
  }
  @Get(":workspaceId")
  findProjectsByWorkspaceId(@Param("workspaceId") workspaceId: string) {
    return this.projectService.findAll({ workspaceId })
  }

  @Get()
  findAll() {
    return this.projectService.findAll()
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.projectService.remove(id)
  }
}
