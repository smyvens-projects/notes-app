"use client"

import { FormEvent } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { IoCreateOutline } from "react-icons/io5"
import Button from "~/components/Button"
import { PartialNote } from "~/types"
import Note from "~/app/[note]/(Sidebar)/Note"
import { useRouter } from "next/navigation"

interface SidebarProps {
    notes: PartialNote[]
}

export default function Sidebar({ notes }: SidebarProps) {
    const router = useRouter()
    const handleSearch = (event: FormEvent) => {
        event.preventDefault()
    }

    const newNote = async () => {
        const tempGenID = () => {
            return Math.random().toString(36)
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/notes/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: tempGenID(),
                title: "Untitled Note",
                date_created: new Date(),
                last_modified: new Date(),
            }),
        })

        router.refresh()
    }

    return (
        <div className="py-3 h-full flex flex-col">
            <div className="mb-4 px-3">
                <div className="flex items-center justify-between mb-3 px-2">
                    <h1 className="font-loudrina-shadow text-3xl uppercase">Notes - App</h1>
                    <Button onClick={newNote}>
                        <IoCreateOutline size={25} className="font-extrabold text-blue-600" />
                    </Button>
                </div>
                <form
                    onSubmit={handleSearch}
                    className="flex items-center justify-center bg-container-100 rounded-md h-10 border border-container-300 "
                >
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="bg-container-100 w-full h-full rounded-md pl-2 focus:outline-none font-gilroy text-container-700"
                    />
                    <Button background={{ hover: "hover:", active: "active:" }}>
                        <span className="flex items-center justify-center border-l border-container-300 h-full pl-3 pr-[6px] cursor-pointer">
                            <AiOutlineSearch className="text-container-700" />
                        </span>
                    </Button>
                </form>
            </div>

            <div className="flex flex-col vertical-scrollbar">
                {notes.map(note => (
                    <Note key={note.id} {...note} />
                ))}
            </div>
        </div>
    )
}
