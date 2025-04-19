"use client"

import { useState } from "react"
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared"
import { Edit, PlusCircle, Search, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock data for tasks
const MOCK_TASKS = [
  {
    id: 1,
    title: "Basic SELECT Queries",
    description: "Learn how to retrieve data from a single table",
    difficulty: "Easy",
    created: "2023-04-15",
    tags: ["SELECT", "WHERE", "Basics"],
  },
  {
    id: 2,
    title: "JOIN Operations",
    description: "Combine data from multiple tables using JOIN",
    difficulty: "Medium",
    created: "2023-04-12",
    tags: ["JOIN", "INNER JOIN", "LEFT JOIN"],
  },
  {
    id: 3,
    title: "Aggregate Functions",
    description: "Use COUNT, SUM, AVG, and other aggregate functions",
    difficulty: "Medium",
    created: "2023-04-10",
    tags: ["Aggregation", "GROUP BY", "HAVING"],
  },
  {
    id: 4,
    title: "Subqueries",
    description: "Write nested queries for complex data retrieval",
    difficulty: "Hard",
    created: "2023-04-05",
    tags: ["Subquery", "Advanced"],
  },
  {
    id: 5,
    title: "Filtering with WHERE",
    description: "Filter data using various WHERE conditions",
    difficulty: "Easy",
    created: "2023-04-01",
    tags: ["WHERE", "Filtering", "Basics"],
  },
]

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  // Filter tasks based on search term and difficulty
  const filteredTasks = MOCK_TASKS.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesDifficulty =
      difficultyFilter === "all" || task.difficulty.toLowerCase() === difficultyFilter.toLowerCase()

    return matchesSearch && matchesDifficulty
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">SQL Tasks</h1>
        <Link href="/admin/tasks/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Task
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-md">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b bg-muted/50">
              <div className="col-span-5">Task</div>
              <div className="col-span-3 hidden md:block">Tags</div>
              <div className="col-span-2 hidden md:block">Difficulty</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task.id} className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center">
                  <div className="col-span-5">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground hidden md:block">{task.description}</p>
                  </div>
                  <div className="col-span-3 hidden md:flex flex-wrap gap-1">
                    {task.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-muted rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        task.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : task.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {task.difficulty}
                    </span>
                  </div>
                  <div className="col-span-7 md:col-span-2 flex justify-end gap-2">
                    <Link href={`/admin/tasks/${task.id}`}>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">No tasks found matching your criteria.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}