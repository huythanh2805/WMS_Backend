import { HttpException, Injectable } from '@nestjs/common';
import { CreateProjectAccessDto } from './dto/create-project-access.dto';
import { UpdateProjectAccessDto } from './dto/update-project-access.dto';
import { BaseAbstractService } from 'src/services/base/base.abstract.service';
import { ProjectAccess } from '@prisma/client';
import { ProjectAccessRepository } from 'src/respositories/project-access.respository';

@Injectable()
export class ProjectAccessService extends BaseAbstractService<ProjectAccess> {
  constructor(private readonly projectAccessRespository: ProjectAccessRepository){
    super(projectAccessRespository)
  }
  async createNewProjectAccess (createDto: CreateProjectAccessDto):Promise<ProjectAccess> {
    try {
      return this.projectAccessRespository.createNewProjectAccess(createDto)
    } catch (error) {
      throw new HttpException(error.response.message, 500)
      
    }
  }
  async findProjectAccessBy(projectId: string, userId: string):Promise<ProjectAccess | null> {
    try {
      return this.projectAccessRespository.findProjectAccessBy(projectId, userId)
    } catch (error) {
      throw new HttpException(error.response.message, 500)
      
    }
  }
}
