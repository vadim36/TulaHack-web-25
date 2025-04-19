import Link from "next/link"
import { BarChart3, Database, LayoutDashboard, List, PlusCircle, Settings } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 min-h-dvh border-r dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b dark:border-gray-700">
        <Link href="/" className="flex items-center gap-2 font-semibold text-xl">
          <Database className="h-6 w-6 text-primary" />
          <span>SQL Admin</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/tasks"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          <List className="h-5 w-5" />
          <span>Tasks</span>
        </Link>
        <Link
          href="/createTask"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Create Task</span>
        </Link>
      </nav>
      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">A</div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}