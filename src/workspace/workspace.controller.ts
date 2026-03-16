import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Access } from 'src/decorators/user-access';
import { AccessLevel } from '@prisma/client';
import { AccessGuard } from 'src/auth/guards/access-level.guard';

@UseGuards(JwtAuthGuard)
@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @UseGuards(AccessGuard)
  @Access(AccessLevel.OWNER)
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
  
  @UseGuards(AccessGuard)
  @Access(AccessLevel.OWNER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspaceService.update(id, updateWorkspaceDto);
  }
  
  @UseGuards(AccessGuard)
  @Access(AccessLevel.OWNER)
  @Delete(':id')
  deleteWorkspaceById(@Param('id') id: string) {
    return this.workspaceService.deleteWorkspaceById(id);
  }
}
