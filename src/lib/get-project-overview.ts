import { TaskStatus } from "@prisma/client";
import { ProjectDetail, ProjectOverviewType } from "src/types";

type ProjectTaskOverview = Omit<ProjectOverviewType, "members">
export function getTasksNumberByStatus(projectDetail: ProjectDetail): ProjectTaskOverview {
  const total = projectDetail.tasks.length;
  const now = new Date();

  const counts = projectDetail.tasks.reduce(
    (acc, task) => {
      if (
        task.dueDate &&
        new Date(task.dueDate) < now &&
        task.status !== TaskStatus.COMPLETED
      ) {
        acc.overdue++;
        return acc;
      }

      switch (task.status) {
        case TaskStatus.COMPLETED:
          acc.completed++;
          break;

        case TaskStatus.IN_PROGRESS:
        case TaskStatus.IN_REVIEW:
          acc.inProgress++;
          break;

        case TaskStatus.TODO:
        case TaskStatus.BACKLOG:
          acc.notStarted++;
          break;
      }

      return acc;
    },
    {
      completed: 0,
      inProgress: 0,
      notStarted: 0,
      overdue: 0,
    }
  );

  const calcPercent = (count: number) =>
    total === 0 ? 0 : Math.round((count / total) * 100);

  return {
    taskCompleted: {
      count: counts.completed,
      percent: calcPercent(counts.completed),
      total,
    },
    taskInProgress: {
      count: counts.inProgress,
      percent: calcPercent(counts.inProgress),
      total,
    },
    taskNotStarted: {
      count: counts.notStarted,
      percent: calcPercent(counts.notStarted),
      total,
    },
    taskOverdue: {
      count: counts.overdue,
      percent: calcPercent(counts.overdue),
      total,
    }
  };
}