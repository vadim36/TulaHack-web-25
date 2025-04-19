"use client"

import { Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared"


interface ResultPreviewProps {
  data?: any[]
  isLoading?: boolean
  error?: string
}

export function ResultPreview({ data = [], isLoading = false, error }: ResultPreviewProps) {
  // If there's no data, show sample data
  const displayData =
    data.length > 0
      ? data
      : [
          { id: 1, name: "John Doe", email: "john@example.com", role: "admin", created_at: "2023-01-15" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", created_at: "2023-02-20" },
          { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "user", created_at: "2023-03-10" },
        ]

  // Get column headers from the first row
  const columns = displayData.length > 0 ? Object.keys(displayData[0]) : []

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Query Result Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="table">
          <TabsList className="mb-4">
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="json">JSON View</TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="p-4 text-red-500 bg-red-50 rounded-md">{error}</div>
            ) : (
              <div className="border rounded-md overflow-auto max-h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((column) => (
                        <TableHead key={column}>{column}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayData.map((row, index) => (
                      <TableRow key={index}>
                        {columns.map((column) => (
                          <TableCell key={column}>{row[column]?.toString() || ""}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="json">
            <div className="bg-muted p-4 rounded-md overflow-auto max-h-[300px]">
              <pre className="text-xs font-mono">{JSON.stringify(displayData, null, 2)}</pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}