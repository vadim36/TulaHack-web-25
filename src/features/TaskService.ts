import { $api } from "@/shared";

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
    static async createTask(dto: CreateTaskDto): Promise<{ ok: boolean }> {
        try {
            const result = await $api.post<{ok: true }>("/task", dto);
            return result.data;
        } catch (err) {
            console.error(err)
            return { ok: false }
        }
    }
}