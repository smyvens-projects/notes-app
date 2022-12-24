import { ChangeEvent, useEffect, useRef } from "react"
import { IconType } from "react-icons/lib"

interface InputProps {
    onChange: (input: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    type?: "email" | "password" | "text"
    icon?: {
        name: IconType
        onClick?: () => void
    }
    focusOnLoad?: true
}

export default function Input({
    placeholder,
    type = "text",
    onChange,
    icon,
    focusOnLoad,
}: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (focusOnLoad) {
            inputRef.current?.focus()
        }
    }, [focusOnLoad])

    return (
        <div className="relative w-full">
            <input
                placeholder={placeholder}
                type={type}
                onChange={onChange}
                className={`${
                    icon?.name ? "pr-10" : "pr-6"
                } w-full outline outline-1 outline-gray-300 border-none rounded-md py-2 pl-6 text-gray-500 focus:bg-slate-200`}
                ref={inputRef}
                data-test-id="input"
            />
            {icon && (
                <span className="flex items-center justify-center h-full absolute top-0 right-0 mr-3">
                    <icon.name
                        size={20}
                        className={`text-slate-500 ${icon.onClick && "cursor-pointer"}`}
                        onClick={icon.onClick}
                        data-test-id="icon"
                    />
                </span>
            )}
        </div>
    )
}
