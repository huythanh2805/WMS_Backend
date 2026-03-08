import { PrismaService } from "src/prisma/prisma.service";
import { BaseRepositoryAbstract } from "./base/base.abstract.respository";
import { Activity } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { ActivityInterface } from "src/activity/interfaces/activity.interface";
import { FindAllResponse } from "src/types/common.type";

@Injectable()
export class ActivityRepository extends BaseRepositoryAbstract<Activity> implements ActivityInterface {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, prisma.activity)
}
 async findActivitiesByProjectId(projectId: string): Promise<FindAllResponse<Activity>> {
    const activities = await this.prisma.activity.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        user: true
      },
    })
    return {
      count: activities.length,
      items: activities
    }
  }
}