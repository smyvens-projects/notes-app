"use client"

import { MouseEventHandler, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react"
import { Property } from "csstype"

interface PopupWindowProps {
    children: ReactNode
    location: {
        left: Property.Left
        top: Property.Top
    }
    trigger: MutableRefObject<Element | null>
    backgroundColor?: Property.BackgroundColor
    borderColor?: Property.BorderColor
    pageTint?: Property.BackgroundColor
}

export default function PopupWindow({
    location,
    children,
    trigger,
    borderColor,
    backgroundColor = "white",
    pageTint = "#66000000",
}: PopupWindowProps) {
    const [isOpen, setOpen] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const handleClose: MouseEventHandler<HTMLDivElement> = event => {
        event.preventDefault()
        event.stopPropagation()

        if (event.target === wrapperRef.current) {
            setOpen(false)
        }
    }

    const handleOpen = (event: Event) => {
        event.preventDefault()
        event.stopPropagation()
        setOpen(true)
    }

    useEffect(() => {
        const el = trigger.current

        el?.addEventListener("click", handleOpen)
        return () => {
            el?.removeEventListener("click", handleOpen)
        }
    }, [trigger])

    return isOpen ? (
        <div
            className="fixed w-screen h-screen z-50"
            onClick={handleClose}
            ref={wrapperRef}
            style={{ backgroundColor: pageTint }}
        >
            <div
                style={{ ...location, backgroundColor, borderColor }}
                className="fixed p-1 rounded-md shadow-around border border-container-300"
            >
                {children}
            </div>
        </div>
    ) : null
}
