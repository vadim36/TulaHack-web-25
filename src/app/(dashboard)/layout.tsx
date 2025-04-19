import { Sidebar } from "@/shared";
import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
    return <div className="flex">
        <Sidebar/>
        <main className="p-2">
            {children}
        </main>
    </div>
}