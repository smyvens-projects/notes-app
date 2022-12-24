import { Property } from "csstype"

import { IconType } from "react-icons"

type Icon = IconType | { Name: IconType; color: Property.Color }

interface MenuRowProps {
    icon: Icon
    children: string
    onClick: () => void
    innerRef?: (element: HTMLDivElement) => void
}

export default function MenuRow({ icon: Icon, children, onClick, innerRef }: MenuRowProps) {
    return (
        <div
            className="flex items-center gap-2 font-gilroy hover:bg-container-200 cursor-pointer pl-2 pr-16 py-2 rounded-md text-slate-500 "
            onClick={onClick}
            ref={innerRef}
        >
            <span>{typeof Icon === "object" ? <Icon.Name color={Icon.color} /> : <Icon />}</span>
            <span className="font-medium">{children}</span>
        </div>
    )
}
