import { createContext, ReactNode, useContext } from "react"
import { Note } from "~/types/note"

interface Props {
    children: ReactNode
    note: Note.Data
}

const NoteContext = createContext<Note.Data>({} as Note.Data)

export function NoteProvider({ children, note }: Props) {
    return <NoteContext.Provider value={note}>{children}</NoteContext.Provider>
}

export const useNote = () => useContext(NoteContext)
