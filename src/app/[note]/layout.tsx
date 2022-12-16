import { ReactNode } from "react"
import ResizablePanel from "~/components/Resizable"
import { PartialNote } from "~/types"
import Sidebar from "./(Sidebar)"

interface LayoutProps {
    children: ReactNode
}

const getNotes = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/notes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await response.json()
    return data as PartialNote[]
}

export default async function Layout({ children }: LayoutProps) {
    const notes: PartialNote[] = await getNotes()

    return (
        <div className="flex h-screen w-full">
            <ResizablePanel side="right" width={350} minWidth="20vw" maxWidth="70vw">
                <nav className="bg-container-200 h-screen">
                    <Sidebar notes={notes} />
                </nav>
            </ResizablePanel>
            {children}
        </div>
    )
}
