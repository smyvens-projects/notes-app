import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { HiOutlineDuplicate, HiOutlineNewspaper } from "react-icons/hi"
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5"
import Input from "~/components/Input"
import PopupWindow from "~/components/PopupWindow"
import { useNote } from "~/hooks/useNote"
import { createNote, deleteNote, updateNote } from "~/utils/note-manager"
import MenuRow from "./MenuRow"

interface MenuProps {
    openMenuBtn: HTMLElement | null
}

export default function Menu({ openMenuBtn }: MenuProps) {
    const router = useRouter()
    const note = useNote()
    const { id, title, is_favorite: isFavorite } = note
    const [closeMenuBtn, setCloseMenuBtn] = useState<HTMLElement | null>(null)

    const [menuLocation, setMenuLocation] = useState<{ left: `${number}px`; top: `${number}px` }>()
    const handleMenuLocation = (isOpen: boolean) => {
        if (!isOpen || !openMenuBtn) return
        setMenuLocation({
            left: `${openMenuBtn.offsetLeft + openMenuBtn.offsetWidth}px`,
            top: `${openMenuBtn.offsetTop + openMenuBtn.offsetHeight}px`,
        })
    }

    // *****************************************

    const [openRenameNote, setOpenRenameNote] = useState<HTMLElement | null>(null)
    const [closeRenameNote, setCloseRenameNote] = useState<HTMLElement | null>(null)

    const [newName, setNewName] = useState("")
    const handleRename = async (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
        event?.stopPropagation()

        // don't rename if the user did not type anything
        if (!newName || newName === title) return

        await updateNote(id, { title: newName })
        closeRenameNote?.click()
        router.refresh()
    }

    // *****************************************

    const handleFavorite = async () => {
        await updateNote(id, { is_favorite: !isFavorite })
        router.refresh()
    }

    const handleDuplicate = async () => {
        const data = (({ content, is_favorite, tags }) => ({ content, is_favorite, tags }))(note)
        await createNote({ ...data, title: `${title} copy` })

        closeMenuBtn?.click()
        router.refresh()
    }

    const handleDelete = async () => {
        await deleteNote(id)
        router.refresh()
    }

    return (
        <>
            <PopupWindow
                triggers={{
                    open: openMenuBtn,
                    close: closeMenuBtn,
                }}
                location={menuLocation || { left: "0px", top: "0px" }}
                onChange={handleMenuLocation}
            >
                <div className="flex flex-col justify-center py-1 px-1 gap-2">
                    <MenuRow
                        icon={IoCreateOutline}
                        onClick={() => closeMenuBtn?.click()} // close current menu
                        innerRef={setOpenRenameNote} // opens new note menu
                    >
                        Rename
                    </MenuRow>
                    <MenuRow
                        icon={isFavorite ? { Name: AiFillStar, color: "orange" } : AiOutlineStar}
                        onClick={handleFavorite}
                    >
                        Favorite
                    </MenuRow>
                    <MenuRow icon={HiOutlineDuplicate} onClick={handleDuplicate}>
                        Duplicate
                    </MenuRow>
                    <MenuRow icon={{ Name: IoTrashOutline, color: "red" }} onClick={handleDelete}>
                        Delete
                    </MenuRow>
                </div>
                <input type="button" ref={setCloseMenuBtn} className="hidden" />
            </PopupWindow>

            <PopupWindow
                triggers={{ open: openRenameNote, close: closeRenameNote }}
                location={menuLocation || { left: "0px", top: "0px" }}
            >
                <form method="post" onSubmit={handleRename} className="w-72">
                    <Input
                        onChange={input => setNewName(input.target.value)}
                        icon={{
                            name: HiOutlineNewspaper,
                            onClick: handleRename,
                        }}
                        focusOnLoad
                    />
                    <input type="button" className="hidden" ref={setCloseRenameNote} />
                </form>
            </PopupWindow>
        </>
    )
}
