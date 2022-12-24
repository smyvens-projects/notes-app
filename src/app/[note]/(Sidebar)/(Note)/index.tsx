import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { TfiMoreAlt } from "react-icons/tfi"
import { useNote } from "~/hooks/useNote"
import ContextMenu from "./Menu"

export default function Note() {
    const { id, title, last_modified: lastModified } = useNote()

    const pathname = usePathname()
    const [isActive] = useState(pathname?.split(/\//).at(-1) === id)

    const [openMenuBtn, setOpenMenuBtn] = useState<HTMLElement | null>(null)

    return (
        <div
            className={`${
                isActive ? "bg-white border-y-container-300" : "border-y-container-100"
            } flex items-center justify-between p-3 border-y hover:bg-container-400 text-slate-600 hover:text-slate-700`}
        >
            <Link href={`${process.env.NEXT_PUBLIC_BASE_PATH}/${id}`}>
                <span className="text-left">
                    <h1 className="font-medium font-gilroy text-lg overflow-y-scroll whitespace-nowrap w-56 ">
                        {title}
                    </h1>
                    <h3 className="font-light font-gilroy text-sm">
                        <span>Last edited: </span>
                        <span>
                            {lastModified &&
                                new Date(Date.parse(lastModified)).toLocaleTimeString()}
                        </span>
                    </h3>
                </span>
            </Link>

            <span className="cursor-pointer mr-1" ref={setOpenMenuBtn}>
                <TfiMoreAlt />
            </span>

            <ContextMenu openMenuBtn={openMenuBtn} />
        </div>
    )
}
