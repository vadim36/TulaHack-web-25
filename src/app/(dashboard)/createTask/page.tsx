"use client"

import type React from "react"

import { useState } from "react"
import { SqlEditor } from "@/entities/sqlEditor"
import { ResultPreview } from "@/entities/resultPreview"
import { X } from "lucide-react"
import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/shared"

export default function CreateTaskPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [initialQuery, setInitialQuery] = useState(
    "-- Initial query that will be provided to the student\nSELECT * FROM users LIMIT 10;",
  )
  const [solutionQuery, setSolutionQuery] = useState(
    "-- Solution query that will be used to validate student answers\nSELECT id, name, email FROM users WHERE role = 'admin' ORDER BY created_at DESC;",
  )
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [previewData, setPreviewData] = useState<any[]>([])

  const handleAddTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const executeQuery = () => {
    // In a real application, this would send the query to a backend
    // For this demo, we'll simulate a response
    setIsExecuting(true)

    // Simulate API call delay
    setTimeout(() => {
      setPreviewData([
        { id: 1, name: "John Doe", email: "john@example.com", role: "admin", created_at: "2023-01-15" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "admin", created_at: "2023-02-20" },
      ])
      setIsExecuting(false)
    }, 1000)
  }

  const handleSaveTask = () => {
    // In a real application, this would save the task to a database
    console.log({
      title,
      description,
      difficulty,
      initialQuery,
      solutionQuery,
      tags,
    })

    // Show success message or redirect
    alert("Task saved successfully!")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create SQL Task</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Details</CardTitle>
              <CardDescription>Create a new SQL learning task for students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Basic SELECT Query with Filtering"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what the student needs to accomplish..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      placeholder="Add a tag"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <Button type="button" onClick={handleAddTag} variant="outline">
                      Add
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((t) => (
                        <Badge key={t} variant="secondary" className="flex items-center gap-1">
                          {t}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(t)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SQL Queries</CardTitle>
              <CardDescription>Define the initial query and solution for this task</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="initial-query">Initial Query</Label>
                <p className="text-sm text-muted-foreground">
                  This is the starting point that will be provided to students
                </p>
                <SqlEditor value={initialQuery} onChange={setInitialQuery} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solution-query">Solution Query</Label>
                <p className="text-sm text-muted-foreground">
                  The correct solution that will be used to validate student answers
                </p>
                <SqlEditor value={solutionQuery} onChange={setSolutionQuery} onExecute={executeQuery} />
              </div>
            </CardContent>
            <CardFooter className="border-t p-6 flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSaveTask}>Save Task</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Preview</CardTitle>
              <CardDescription>Preview how this task will appear to students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{title || "Task Title"}</h3>
                <p className="text-sm text-muted-foreground">{description || "Task description will appear here..."}</p>

                {difficulty && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      difficulty === "easy"
                        ? "bg-green-100 text-green-800"
                        : difficulty === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </span>
                )}

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tags.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Your Task:</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Write a SQL query that returns the expected results.
                </p>

                <div className="bg-muted p-3 rounded-md text-sm font-mono mb-4">
                  {initialQuery || "-- Initial query will appear here"}
                </div>
              </div>
            </CardContent>
          </Card>

          <ResultPreview data={previewData} isLoading={isExecuting} />

          <Card>
            <CardHeader>
              <CardTitle>Help & Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium">Creating Effective Tasks</h4>
                  <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                    <li>Start with a clear, concise description</li>
                    <li>Provide enough context for students to understand the problem</li>
                    <li>Make sure the solution query produces the expected results</li>
                    <li>Test your task before publishing</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium">Difficulty Levels</h4>
                  <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                    <li>
                      <span className="text-green-600 font-medium">Easy:</span> Basic queries with simple conditions
                    </li>
                    <li>
                      <span className="text-yellow-600 font-medium">Medium:</span> Joins, aggregations, or multiple
                      conditions
                    </li>
                    <li>
                      <span className="text-red-600 font-medium">Hard:</span> Complex joins, subqueries, or advanced SQL
                      features
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}