import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { TfiMoreAlt } from "react-icons/tfi"
import { useNote } from "~/hooks/useNote"
import Menu from "./Menu"

export default function Note() {
    const { id, title, last_modified: lastModified } = useNote()

    const pathname = usePathname()
    const [isActive] = useState(pathname?.split(/\//).at(-1) === id)

    const [openMenuBtn, setOpenMenuBtn] = useState<HTMLElement | null>(null)

    return (
        <div
            className={`${
                isActive ? "bg-white border-y-container-300" : ""
            } flex items-center justify-between p-3 border-y hover:bg-container-400`}
        >
            <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/${id}`}>
                <span className="text-left">
                    <h1 className="font-medium font-gilroy">{title}</h1>
                    <h3 className="font-light font-gilroy text-sm">
                        {lastModified && new Date(Date.parse(lastModified)).toLocaleTimeString()}
                    </h3>
                </span>
            </Link>

            <span className="cursor-pointer" ref={setOpenMenuBtn}>
                <TfiMoreAlt />
            </span>

            <Menu openMenuBtn={openMenuBtn} />
        </div>
    )
}
