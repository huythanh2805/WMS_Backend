import { Module } from '@nestjs/common';
import { DocumentationService } from './documentation.service';
import { DocumentationController } from './documentation.controller';
import { DocumentationRepository } from 'src/respositories/documentation.respository';

@Module({
  controllers: [DocumentationController],
  providers: [DocumentationService, DocumentationRepository],
})
export class DocumentationModule {}
