import { MouseEvent, ReactNode } from "react"

// all the props that the button have no matter
interface ButtonProps {
    children: ReactNode
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
    fullWidth?: true
    outline?: true
    background?: {
        default?: `bg-${string}`
        hover?: `hover:${string}`
        active?: `active:${string}`
    }
}

export default function Button({ children, onClick, fullWidth, background, outline }: ButtonProps) {
    return (
        <button
            data-test-id="button"
            type={onClick ? "button" : "submit"}
            onClick={onClick}
            className={`${fullWidth ? "w-full " : ""}${
                outline ? "outline outline-slate-300 outline-1 " : ""
            }${background?.hover || "hover:bg-container-200"} ${
                background?.active || "active:bg-container-300"
            } ${background?.default || ""} px-2 py-1 rounded-md`}
        >
            {children}
        </button>
    )
}
