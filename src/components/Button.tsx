import { MouseEvent, ReactNode } from "react"

interface ButtonProps {
    children: ReactNode
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
    fullWidth?: true
    submit?: true
    outline?: true
    background?: {
        default?: `bg-${string}`
        hover?: `hover:${string}`
        active?: `active:${string}`
    }
}

export default function Button({
    submit,
    children,
    onClick,
    fullWidth,
    background,
    outline,
}: ButtonProps) {
    return (
        <button
            type={submit ? "submit" : "button"}
            onClick={onClick}
            className={`${fullWidth && "w-full"} ${
                outline && "outline outline-slate-300 outline-1"
            } ${background?.default} ${background?.hover || "hover:bg-container-200"} ${
                background?.active || "active:bg-container-300"
            } px-2 py-1 rounded-md`}
        >
            {children}
        </button>
    )
}
