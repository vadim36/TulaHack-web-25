import { $api, handleErr } from "@/shared";

export class AnalyticsService {
    static async getTotalTasks() {
        return handleErr<number>(async () => {
            const res = await $api.get<number>("/analytics/tasksAmount");
            return res.data;
        });
    }

    static async getTotalUsers() {
        return handleErr<number>(async () => {
            const res = await $api.get<number>("/analytics/usersAmount");
            return res.data;
        });
    }

    static async getCompletedTasks() {
        return handleErr<number>(async () => {
            const res = await $api.get<number>("/analytics/solvedTasks");
            return res.data;
        });
    }
}