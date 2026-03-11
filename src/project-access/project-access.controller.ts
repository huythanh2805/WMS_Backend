import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectAccessService } from './project-access.service';
import { CreateProjectAccessDto } from './dto/create-project-access.dto';
import { UpdateProjectAccessDto } from './dto/update-project-access.dto';

@Controller('project-access')
export class ProjectAccessController {
  constructor(private readonly projectAccessService: ProjectAccessService) {}

  @Post()
  create(@Body() createProjectAccessDto: CreateProjectAccessDto) {
    return this.projectAccessService.createNewProjectAccess(createProjectAccessDto);
  }

  @Get()
  findAll() {
    return this.projectAccessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectAccessService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectAccessDto: UpdateProjectAccessDto) {
    return this.projectAccessService.update(id, updateProjectAccessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectAccessService.remove(id);
  }
}
