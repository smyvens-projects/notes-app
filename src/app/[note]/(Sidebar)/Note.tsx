import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { TfiMoreAlt } from "react-icons/tfi"
import Button from "~/components/Button"
import { PartialNote } from "~/types"

export default function Note({ id, title, last_modified }: PartialNote) {
    const pathname = usePathname()
    const router = useRouter()
    const [isActive] = useState(pathname?.split(/\//).at(-1) === id)

    return (
        <div
            className={`${
                isActive ? "bg-white border-y-container-300" : ""
            } flex items-center justify-between p-3 border-y hover:bg-container-400`}
        >
            <Button
                fullWidth
                background={{ hover: "hover:", active: "active:translate-y-1" }}
                onClick={() => router.push(`/projects/notes/${id}`)}
            >
                <span className="text-left">
                    <h1 className="font-medium font-gilroy">{title}</h1>
                    <h3 className="font-light font-gilroy text-sm">
                        {last_modified && new Date(Date.parse(last_modified)).toLocaleTimeString()}
                    </h3>
                </span>
            </Button>
            <Button background={{ hover: "hover:", active: "active:" }}>
                <TfiMoreAlt />
            </Button>
        </div>
    )
}
