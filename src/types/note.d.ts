export declare namespace Note {
    type Required = {
        id: string
        title: string
        date_created: Date
        last_modified: string
    }

    type Optional = Partial<{
        content: string
        is_favorite: boolean
        tags: string[]
    }>

    type Data = Required & Optional
}

export declare type GetNote = (id?: string) => Promise<Note.Data | Note.Data[]>

export declare type CreateNote = (
    note: Partial<Note.Data> & {
        title: string
        id?: never
        date_created?: never
        last_modified?: never
    }
) => Promise<Note.Data>

export declare type UpdateNote = (
    id: string,
    note: Partial<Note.Data> & { id?: never; date_created?: never }
) => Promise<Note.Data>

export declare type DeleteNote = (id: string) => Promise<Note.Data>
