import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileRepository } from 'src/respositories/file.respository';

@Module({
  controllers: [FileController],
  providers: [FileService, FileRepository],
})
export class FileModule {}
