import { MouseEvent, ReactNode } from "react"

// all the props that the button have no matter
interface ButtonProps {
    children: ReactNode
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
    fullWidth?: true
    outline?: true
    background?: {
        default?: `bg-${string}` | false
        hover?: `hover:${string}` | false
        active?: `active:${string}` | false
    }
    noExtraStyles?: true
}

export default function Button({
    children,
    onClick,
    fullWidth,
    background,
    outline,
    noExtraStyles,
}: ButtonProps) {
    return (
        <button
            data-test-id="button"
            type={onClick ? "button" : "submit"}
            onClick={onClick}
            className={`${fullWidth ? "w-full " : ""}${
                outline ? "outline outline-slate-300 outline-1 " : ""
            }${background?.hover || "hover:bg-container-200"} ${
                background?.active || "active:bg-container-300"
            } ${background?.default || ""} ${noExtraStyles ? "" : "px-2 py-1 rounded-md"}`}
        >
            {children}
        </button>
    )
}
