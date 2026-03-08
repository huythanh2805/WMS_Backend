import { HttpException, Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { BaseAbstractService } from 'src/services/base/base.abstract.service';
import { Activity } from '@prisma/client';
import { ActivityRepository } from 'src/respositories/activity.respository';
import { FindAllResponse } from 'src/types/common.type';

@Injectable()
export class ActivityService extends BaseAbstractService<Activity> {
  constructor(private readonly activityRespository: ActivityRepository){
    super(activityRespository)
  }
   async findActivitiesByProjectId(
    projectId: string
    ): Promise<FindAllResponse<Activity>> {
      try {
        return this.activityRespository.findActivitiesByProjectId(projectId)
      } catch (error) {
        throw new HttpException("Create Project Error", 500)
      }
    }
}
