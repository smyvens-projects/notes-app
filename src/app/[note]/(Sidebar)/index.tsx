"use client"

import { NoteProvider } from "~/hooks/useNote"
import { Note as NoteType } from "~/types/note"
import Note from "./(Note)"
import Header from "./Header"

interface SidebarProps {
    notes: NoteType.Data[]
}

export default function Sidebar({ notes }: SidebarProps) {
    return (
        <span className="flex flex-col w-full h-full bg-container-100">
            <Header />

            <div className="flex flex-col overflow-y-scroll h-full">
                {notes.map(note => (
                    <NoteProvider note={note} key={note.id}>
                        <Note />
                    </NoteProvider>
                ))}
            </div>
        </span>
    )
}
