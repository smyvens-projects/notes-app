import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { HiOutlineNewspaper } from "react-icons/hi"
import Input from "~/components/Input"
import PopupWindow from "~/components/PopupWindow"
import { createNote } from "~/utils/note-manager"

export default function Header() {
    const router = useRouter()

    const [newNoteBtn, setNewNoteBtn] = useState<HTMLElement | null>(null)
    const [closeNewNoteBtn, setCloseNewNoteBtn] = useState<HTMLElement | null>(null)
    const [newNoteName, setNewNoteName] = useState("")

    const handleNewNote = async (event?: FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault()
            event.stopPropagation()
        }

        if (newNoteName !== "") {
            await createNote({ title: newNoteName })
            closeNewNoteBtn?.click()
            router.refresh()
        }
    }

    return (
        <div className="flex items-center justify-between mb-3 px-3 pt-3">
            <h1 className="font-loudrina-shadow text-3xl uppercase">Notes - App</h1>
            {/* TODO: Refractor into Button Component */}
            <span
                className="cursor-pointer hover:bg-container-300 rounded-md p-1"
                ref={setNewNoteBtn}
            >
                <AiOutlinePlus size={25} className="font-extrabold text-blue-600" />
            </span>

            {newNoteBtn && (
                <PopupWindow
                    triggers={{ open: newNoteBtn, close: closeNewNoteBtn }}
                    location={{
                        top: `${newNoteBtn.offsetTop}px`,
                        left: `${newNoteBtn.offsetWidth + newNoteBtn.offsetLeft}px`,
                    }}
                >
                    <form method="post" onSubmit={handleNewNote} className="p-[2px] w-96">
                        <Input
                            onChange={event => setNewNoteName(event.target.value)}
                            icon={{
                                name: HiOutlineNewspaper,
                                onClick: () => closeNewNoteBtn?.click(),
                            }}
                            focusOnLoad
                        />
                        <input type="button" value="" className="hidden" ref={setCloseNewNoteBtn} />
                    </form>
                </PopupWindow>
            )}
        </div>
    )
}