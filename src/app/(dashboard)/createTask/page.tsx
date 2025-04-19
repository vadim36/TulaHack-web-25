"use client"

import { SqlEditor } from "@/entities/sqlEditor";
import { CreateSubTaskDto, SubTask, TaskLevels, TaskService, CreateTaskDto } from "@/features/TaskService";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertTitle, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/shared"
import { AlertCircle, GripVertical, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, MouseEvent } from "react"
import { toast } from "sonner";
import * as z from 'zod'

type UpdateTaskProp = "name" | "description" | "solution";

const TaskSchema = z.object({
  title: z.string().min(3).max(128),
  description: z.string().max(512).optional(),
  sqlSchema: z.string().min(3).max(512),
  fillData: z.string().min(3).max(512),
  level: z.nativeEnum(TaskLevels),
  subTasks: z.array(z.object({
    name: z.string().min(3).max(128),
    description: z.string().max(512).optional(),
    solution: z.string().min(3).max(512),
  }))
});

export default function CreateTaskPage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [level, setLevel] = useState<TaskLevels>(TaskLevels.MEDIUM);
  const [createQuery, setCreateQuery] = useState<string>("");
  const [insertQuery, setInsertQuery] = useState<string>("");
  const [subtasks, setSubtasks] = useState<Omit<SubTask, "taskId">[]>([
    { id: 1, name: "Test", description: "test description", solution: "SELECT * FROM Table"}
  ]);
  const [activeSubtaskId, setActiveSubtaskId] = useState<string>();
  const { replace } = useRouter()

  async function handleSaveTask(e: MouseEvent<HTMLButtonElement, Event>) {
    e.preventDefault();

    const parsedSubtasks: CreateSubTaskDto[] = subtasks.map(task => {
      return { name: task.name, description: task.description, solution: task.solution }
    });

    const { data, error } = TaskSchema.safeParse({ 
      title, 
      description, 
      level, 
      sqlSchema: createQuery, 
      fillData: insertQuery, 
      subTasks: parsedSubtasks 
    });

    if (error) {
      return toast("Validation Error");
    }

    const { ok } = await TaskService.createTask(data!);

    toast(ok ? "Task had been created successfully" : "Something got wrong! Try again later")
    await replace("/")
  }
  function handleAddSubtask() {
    if (subtasks.length >= 20) {
      return toast("Too much subtasks");
    }
    
    setSubtasks([...subtasks, { 
      id: subtasks.length + 1,
      name: "Test",
      description: "",
      solution: "SELECT * FROM Table"
    }]);
  }

  function handleRemoveSubtask(id: number) {
    const res = subtasks.filter(task => {
      if (task.id !== id) {
        return task;
      }
    });
    setSubtasks([...res]);
  }

  function updateSubtask(id: number, prop: UpdateTaskProp, value: string): void {
    const res = subtasks.map(task => {
      if (task.id === id) {
        task[prop] = value;
      }

      return task;
    });
    setSubtasks(res);
  }

  return <form className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">Create Multi-Step SQL Task</h1>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-6 h-100">
        <Card>
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
            <CardDescription>Create a new multi-step SQL learning task for students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="e.g., Database Normalization Exercise"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the overall goal of this multi-step task..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Overall Difficulty Level</Label>
                <Select value={level} onValueChange={(value) => setLevel(value as TaskLevels)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TaskLevels.EASY}>Easy</SelectItem>
                    <SelectItem value={TaskLevels.MEDIUM}>Medium</SelectItem>
                    <SelectItem value={TaskLevels.HARD}>Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>SQL Queries</CardTitle>
            <CardDescription>Define the initial query and solution for this task</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="initial-query">Initial Creating Query</Label>
              <p className="text-sm text-muted-foreground">
                This is the starting point that will be provided to students
              </p>
              <SqlEditor value={createQuery} onChange={setCreateQuery}/>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>SQL Queries</CardTitle>
            <CardDescription>Define the initial query and solution for this task</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="initial-query">Inserting Query</Label>
              <p className="text-sm text-muted-foreground">
                This is the starting point that will be provided to students
              </p>
              <SqlEditor value={insertQuery} onChange={setInsertQuery}/>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="space-y-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Subtasks</CardTitle>
              <CardDescription>Define the individual steps of this SQL task</CardDescription>
            </div>
            <Button onClick={handleAddSubtask} size="sm" type="button">
              <Plus className="h-4 w-4 mr-1" /> Add Subtask
            </Button>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Multi-step Task</AlertTitle>
              <AlertDescription>
                Students will need to complete each subtask in sequence to finish the entire task. Each subtask can
                have its own SQL query and solution.
              </AlertDescription>
            </Alert>
            <Accordion
              type="single"
              collapsible
              value={activeSubtaskId || undefined}
              onValueChange={(value) => setActiveSubtaskId(value)}
              className="space-y-4"
            >
              {subtasks.map((subtask, index) => (
                <AccordionItem key={subtask.id} value={String(subtask.id)} className="border rounded-lg overflow-hidden">
                  <div className="flex items-center border-b bg-muted/30 p-2 ">
                    <div className="flex items-center text-muted-foreground mr-2">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <AccordionTrigger className="py-0 hover:no-underline flex-1">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{index + 1}.</span>
                          <span className="font-medium">{subtask.name}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <div className="flex items-center gap-1 ml-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveSubtask(subtask.id)
                        }}
                        type="button"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <AccordionContent className="pt-0">
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`${subtask.id}-title`}>Subtask Title</Label>
                          <Input
                            id={`${subtask.id}-title`}
                            value={subtask.name}
                            onChange={(e) => updateSubtask(subtask.id, "name", e.target.value)}
                            minLength={1}
                            placeholder="e.g., Filter data with WHERE clause"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${subtask.id}-description`}>Description</Label>
                        <Textarea
                          id={`${subtask.id}-description`}
                          value={subtask.description}
                          onChange={(e) => updateSubtask(subtask.id, "description", e.target.value)}
                          placeholder="Provide specific instructions for this step..."
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${subtask.id}-solution`}>Solution Query</Label>
                        <p className="text-sm text-muted-foreground">The correct solution for this subtask</p>
                        <SqlEditor
                          value={subtask.solution}
                          onChange={(value) => updateSubtask(subtask.id, "solution", value)}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
    </Card>

    <Card className="space-y-6">
      <CardHeader>
        <CardTitle>Task Preview</CardTitle>
        <CardDescription>Preview how this task will appear to students</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title || "Task Title"}</h3>
          <p className="text-sm text-muted-foreground">{description || "Task description will appear here..."}</p>
          {level && (
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                level === TaskLevels.EASY
                  ? "bg-green-100 text-green-800"
                  : level === TaskLevels.MEDIUM
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>
          )}
        </div>
        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-2">Your Task:</p>
          <p className="text-sm text-muted-foreground mb-4">
            Write a SQL query that returns the expected results.
          </p>
          <code className="bg-muted p-3 rounded-md text-sm font-mono mb-4">
            {createQuery || "-- Initial query will appear here"}
          </code>
        </div>
      </CardContent>
    </Card>

      <Card className="space-y-6">
        <CardHeader>
          <CardTitle>Help & Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium">Creating Multi-Step Tasks</h4>
              <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                <li>Break complex problems into logical steps</li>
                <li>Make each subtask build upon previous ones</li>
                <li>Assign appropriate point values to each step</li>
                <li>Provide clear instructions for each subtask</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Effective Sequencing</h4>
              <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                <li>Start with simpler queries and increase complexity</li>
                <li>Consider making earlier steps provide hints for later ones</li>
                <li>Test the complete sequence to ensure logical progression</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <CardFooter className="border-t p-6 flex justify-between space-y-6">
      <Button variant="outline" type="button">Cancel</Button>
      <Button onClick={handleSaveTask}>Save Task</Button>
    </CardFooter>
  </form>
}