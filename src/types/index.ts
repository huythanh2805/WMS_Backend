import { Prisma } from "@prisma/client";

export type ProjectDetail = Prisma.ProjectGetPayload<{
  include: {
    tasks: true;
  };
}>;
export type TaskStatusProgress = {
    count: number,
    percent: number,
    total: number
}
export type ProjectOverviewType = {
    taskCompleted: TaskStatusProgress,
    taskInProgress: TaskStatusProgress,
    taskOverdue: TaskStatusProgress,
    taskNotStarted: TaskStatusProgress,
    members: TaskStatusProgress,
}