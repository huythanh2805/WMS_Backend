import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { BaseAbstractService } from 'src/services/base/base.abstract.service';
import { ProjectRepository } from 'src/respositories/project.respository';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService extends BaseAbstractService<Project> {
   constructor(
    private readonly projectRepository: ProjectRepository
   ) {
     super(projectRepository);
   }      
   async createProject(item: CreateProjectDto): Promise<Project> {
    const existingProject = await this.projectRepository.findOneByCondition({ name: item.name });
    if (existingProject) {
      throw new ConflictException('Project with this name already exists');
    }
    return this.projectRepository.create(item);
   }
} 
