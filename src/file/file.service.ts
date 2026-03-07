import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { BaseAbstractService } from 'src/services/base/base.abstract.service';
import { FileRepository } from 'src/respositories/file.respository';
import { File } from '@prisma/client';

@Injectable()
export class FileService extends BaseAbstractService<File>{
  constructor(private readonly fileRespository: FileRepository){
    super(fileRespository)
  }
}
