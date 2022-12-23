import { ReactNode } from "react"
import { getAllNotes } from "~/utils/note-manager"
import Sidebar from "./(Sidebar)"

interface LayoutProps {
    params: {
        note: string
    }
    children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
    const notes = await getAllNotes()

    return (
        <div className="h-screen w-full">
            <div className="w-[350px] h-screen border-r-container-300 border-r">
                <Sidebar notes={notes} />
            </div>
            <div>{children}</div>
        </div>
    )
}
