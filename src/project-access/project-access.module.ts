import { Module } from '@nestjs/common';
import { ProjectAccessService } from './project-access.service';
import { ProjectAccessController } from './project-access.controller';
import { ProjectAccessRepository } from 'src/respositories/project-access.respository';

@Module({
  controllers: [ProjectAccessController],
  providers: [ProjectAccessService , ProjectAccessRepository],
  exports: [ProjectAccessService]
})
export class ProjectAccessModule {}
