import { ReactNode } from "react"
import Resizable from "~/components/Resizable"
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
            <Resizable side="right" width="350px" minWidth="275px" maxWidth="75vw">
                <Sidebar notes={notes} />
            </Resizable>
            <div>{children}</div>
        </div>
    )
}
