import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectRepository } from 'src/respositories/project.respository';
import { ActivityRepository } from 'src/respositories/activity.respository';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, ActivityRepository],
})
export class ProjectModule {}
