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
        <Button
            onClick={() => router.push(`/projects/notes/${id}`)}
            background={{ default: isActive && "bg-white", hover: "hover:bg-container-400" }}
            noExtraStyles
        >
            <span
                className={`${
                    isActive ? "border-y-container-300" : ""
                } flex items-center justify-between text-left p-3 border-y`}
            >
                <span className="text-container-700">
                    <h1 className="font-semibold font-gilroy">{title}</h1>
                    <h3 className="font-light font-gilroy text-sm">
                        {last_modified && new Date(Date.parse(last_modified)).toLocaleTimeString()}
                    </h3>
                </span>
                <TfiMoreAlt />
            </span>
        </Button>
    )
}
