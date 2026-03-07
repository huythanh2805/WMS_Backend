import { Injectable } from '@nestjs/common';
import { BaseAbstractService } from 'src/services/base/base.abstract.service';
import { Documentation } from '@prisma/client';
import { DocumentationRepository } from 'src/respositories/documentation.respository';

@Injectable()
export class DocumentationService extends BaseAbstractService<Documentation> {
    constructor(
      private readonly documentationRepository: DocumentationRepository
     ) {
       super(documentationRepository);
     }
}
