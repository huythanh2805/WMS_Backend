import { ConflictException, HttpException, Injectable } from "@nestjs/common"
import { Activity, ActivityType, Project } from "@prisma/client"
import { BaseAbstractService } from "src/services/base/base.abstract.service"
import { ProjectRepository } from "src/respositories/project.respository"
import { CreateProjectDto } from "./dto/create-project.dto"
import { ActivityRepository } from "src/respositories/activity.respository"
import { ProjectOverviewType } from "src/types"

@Injectable()
export class ProjectService extends BaseAbstractService<Project> {
  constructor(
    private readonly projectRepository: ProjectRepository,
  ) {
    super(projectRepository)
  }
  async createProject(
    item: CreateProjectDto,
    userId: string,
  ): Promise<Project> {
    try {
     return this.projectRepository.createNewProject(item, userId)
    } catch (error) {
      throw new HttpException("Create Project Error", 500)
    }
  }
  async getProjectOverview({
    workspaceId,
    projectId,
  }: {
    workspaceId: string,
    projectId: string
  }): Promise<ProjectOverviewType> {
    try {
      return this.projectRepository.getProjectOverview({workspaceId, projectId})
    } catch (error) {
      throw new HttpException("Get Project Overview Error", 500)
      
    }
  }
}
