import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectAccessDto } from './create-project-access.dto';

export class UpdateProjectAccessDto extends PartialType(CreateProjectAccessDto) {}
