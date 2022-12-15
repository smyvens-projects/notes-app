import ResizablePanel from "~/components/Resizable"

export default function Page() {
    return (
        <div className="flex h-screen w-full">
            <ResizablePanel side="right" width={350} minWidth="20vw" maxWidth="70vw">
                <nav className="bg-container-200 h-full">Sidebar</nav>
            </ResizablePanel>
            <main className="w-full">content</main>
        </div>
    )
}
