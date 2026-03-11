import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkspaceMemberService } from './workspace-member.service';
import { CreateWorkspaceMemberDto } from './dto/create-workspace-member.dto';
import { UpdateWorkspaceMemberDto } from './dto/update-workspace-member.dto';

@Controller('workspace-member')
export class WorkspaceMemberController {
  constructor(private readonly workspaceMemberService: WorkspaceMemberService) {}

  @Post()
  create(@Body() createWorkspaceMemberDto: CreateWorkspaceMemberDto) {
    return this.workspaceMemberService.create(createWorkspaceMemberDto);
  }

  @Get(':workpsaceId')
  findOne(@Param('workpsaceId') workspaceId: string) {
    return this.workspaceMemberService.findAllByWorkspaceId({workspaceId});
  }
  
  @Get()
  findAll() {
    return this.workspaceMemberService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkspaceMemberDto: UpdateWorkspaceMemberDto) {
    return this.workspaceMemberService.update(id, updateWorkspaceMemberDto);
  }

  @Delete(':id')
  deleteWorkspaceMember(@Param('id') id: string) {
    return this.workspaceMemberService.deleteWorkspaceMember(id);
  }
}
