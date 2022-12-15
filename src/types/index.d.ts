export interface Note {
    id: string
    title: string
    content: string
    tags: string[]
    date_created: Date
    last_modified: string
}

export interface PartialNote extends Partial<Note> {
    id: string
    title: string
}
