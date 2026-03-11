import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto, @Req() req) {
    return this.workspaceService.createNewWorkSpace({...createWorkspaceDto, ownerId: req.user.userId});
  }

  @Get()
  findAll( @Req() req) {
    return this.workspaceService.findAllWorkspaces({ownerId: req.user.userId});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspaceService.findOneByCondition({id}, {projects: true});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspaceService.update(id, updateWorkspaceDto);
  }

  @Delete(':id')
  deleteWorkspaceById(@Param('id') id: string) {
    return this.workspaceService.deleteWorkspaceById(id);
  }
}
