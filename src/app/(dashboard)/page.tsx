import { AnalyticsService } from "@/services/AnalyticsService"
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared"
import { CheckCircle, Database, Users } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const tasksAmount = await AnalyticsService.getTotalTasks();
  const usersAmount = await AnalyticsService.getTotalUsers();
  const completedTasksAmount = await AnalyticsService.getCompletedTasks();

  if (!tasksAmount.ok || !usersAmount.ok) {
    return (
      <h1>Something get wrong! Try later</h1>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link
          href="/createTask"
        >
          <Button>Create New Task</Button>        
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasksAmount.res}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersAmount.res}</div>
          </CardContent>
        </Card>
        <Card className="w-72">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasksAmount.res}</div>
          </CardContent>
        </Card>
      </div>

        <Card>
          <CardHeader>
            <CardTitle>Popular Tasks</CardTitle>
            <CardDescription>Most attempted SQL tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 5, title: "Filtering with WHERE", attempts: 245, completion: "82%" },
                { id: 6, title: "GROUP BY Clauses", attempts: 189, completion: "65%" },
                { id: 7, title: "INNER JOIN Basics", attempts: 176, completion: "71%" },
                { id: 8, title: "ORDER BY and LIMIT", attempts: 154, completion: "89%" },
              ].map((task) => (
                <div key={task.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{task.attempts} attempts</span>
                      <span>•</span>
                      <span>{task.completion} completion</span>
                    </div>
                  </div>
                  <Link href={`/admin/tasks/${task.id}`} className="text-primary text-sm hover:underline">
                    View
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}