import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { TfiMoreAlt } from "react-icons/tfi"
import Button from "~/components/Button"
import { PartialNote } from "~/types"

export default function Note({ id, title, last_modified }: PartialNote) {
    const pathname = usePathname()
    const router = useRouter()
    const [isActive, setActive] = useState(false)

    useEffect(() => {
        if (!pathname) {
            return
        }
        const noteId = pathname.split(/\//).at(-1)
        setActive(noteId === id)
    }, [id, pathname])

    return (
        <div className="flex items-center justify-between py-2">
            <Button onClick={() => router.push(`/projects/notes/${id}`)}>
                <span className="text-left w-full">
                    <h1 className="font-gilroy font-bold">{title}</h1>
                    <h3 className="font-gilroy font-light text-sm">
                        {"Last modified: "}
                        <span>{last_modified}</span>
                    </h3>
                </span>
            </Button>
            <TfiMoreAlt />
        </div>
    )
}
