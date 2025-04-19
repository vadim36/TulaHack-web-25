import { $api, handleErr, Maybe } from "@/shared";

export enum TaskLevels {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD"
}
  
export type SubTask = {
  id: number;
  name: string;
  description: string;
  solution: string;
  taskId: string;
}

export type CreateSubTaskDto = {
    name: string;
    description?: string;
    solution: string;
}

export type CreateTaskDto = {
    title: string;
    description?: string;
    sqlSchema: string;
    fillData: string;
    level: TaskLevels;
    subTasks: CreateSubTaskDto[];
}

export class TaskService {
    static async createTask(dto: CreateTaskDto): Promise<Maybe<{ ok: true }>> {
        return handleErr<{ ok: true }>(async () => {
            const result = await $api.post<{ok: true }>("/task", dto);
            return result.data;
        });
    }
}