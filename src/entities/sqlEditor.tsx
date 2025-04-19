"use client"

import type React from "react"
import { Button } from "@/shared"
import { Play } from "lucide-react"

interface SqlEditorProps {
  value: string
  onChange: (value: string) => void
  onExecute?: () => void
  placeholder?: string
  height?: string
}

export function SqlEditor({
  value,
  onChange,
  onExecute,
  placeholder = "-- Write your SQL query here\nSELECT * FROM users;",
  height = "200px",
}: SqlEditorProps) {
  // In a real implementation, you would use a proper code editor like Monaco or CodeMirror
  // This is a simplified version for demonstration purposes

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement
      const start = target.selectionStart
      const end = target.selectionEnd

      // Insert tab at cursor position
      const newValue = value.substring(0, start) + "  " + value.substring(end)
      onChange(newValue)

      // Move cursor after the inserted tab
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2
      }, 0)
    }
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-muted p-2 flex justify-between items-center border-b">
        <span className="text-sm font-medium">SQL Editor</span>
        {onExecute && (
          <Button size="sm" onClick={onExecute} className="h-8 gap-1">
            <Play className="h-4 w-4" />
            Run Query
          </Button>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full p-4 font-mono text-sm bg-black text-white focus:outline-none"
        style={{
          height,
          resize: "vertical",
          minHeight: "100px",
        }}
      />
    </div>
  )
}