import { Injectable } from '@nestjs/common';
import { Workspace } from '@prisma/client';
import { BaseAbstractService } from 'src/services/base/base.abstract.service';
import { WorkspaceRepository } from 'src/respositories/workspace.respository';

@Injectable()
export class WorkspaceService extends BaseAbstractService<Workspace> {
     constructor(
        private readonly workspaceRepository: WorkspaceRepository
     ) {
       super(workspaceRepository);
     }
}
