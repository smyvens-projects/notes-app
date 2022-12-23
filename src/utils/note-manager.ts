import { Note, GetNote, CreateNote, UpdateNote, DeleteNote } from "~/types/note"
import { randomBytes } from "crypto"

const headers = { "Content-Type": "application/json" }

export const getAllNotes = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/notes/`, {
        method: "GET",
        headers,
    })

    const data: Note.Data[] = await response.json()
    return data
}

export const getNote: GetNote = async id => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/notes/${id || ""}`, {
        method: "GET",
        headers,
    })

    const data: Note.Data = await response.json()
    return data
}

export const createNote: CreateNote = async note => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/notes/`, {
        method: "POST",
        headers,
        body: JSON.stringify({
            ...note,
            id: randomBytes(20).toString("hex"), // FIXME: temporary way of creating ids
            date_created: new Date(),
            last_modified: new Date(),
        }),
    })

    const data: Note.Data = await response.json()
    return data
}

export const updateNote: UpdateNote = async (id, note) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/notes/${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ ...note, last_modified: new Date() }),
    })

    const data: Note.Data = await response.json()
    return data
}

export const deleteNote: DeleteNote = async id => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/notes/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        },
    })

    const data: Note.Data = await response.json()
    return data
}
