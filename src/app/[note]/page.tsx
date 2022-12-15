import ResizablePanel from "~/components/Resizable"
import Sidebar from "./(Sidebar)"

export default function Page() {
    return (
        <div className="flex h-screen w-full">
            <ResizablePanel side="right" width={350} minWidth="20vw" maxWidth="70vw">
                <nav className="bg-container-200 h-screen">
                    <Sidebar />
                </nav>
            </ResizablePanel>
            <main className="w-full h-screen">content</main>
        </div>
    )
}
