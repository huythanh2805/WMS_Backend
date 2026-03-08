import { HttpException, Injectable } from '@nestjs/common';
import { BaseAbstractService } from 'src/services/base/base.abstract.service';
import { Documentation } from '@prisma/client';
import { DocumentationRepository } from 'src/respositories/documentation.respository';
import { CreateDocumentationDto } from './dto/create-documentation.dto';

@Injectable()
export class DocumentationService extends BaseAbstractService<Documentation> {
    constructor(
      private readonly documentationRepository: DocumentationRepository
     ) {
       super(documentationRepository);
     }

     async createOrUpdate (createDto: CreateDocumentationDto): Promise<Documentation> {
        try {
          const existingDocumentation = await this.documentationRepository.findOneByCondition({taskId: createDto.taskId})
          if(!existingDocumentation){
            return this.documentationRepository.create(createDto)
          }else{
            return this.documentationRepository.update(existingDocumentation.id, {...createDto})
          }
        } catch (error) {
          throw new HttpException("Documentation can't be created", 500)
          
        }
     }
}
