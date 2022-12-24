"use client"

import { Property } from "csstype"
import { MutableRefObject, ReactNode, useEffect, useRef, useState } from "react"
import assert from "assert"

interface ResizableProps {
    children: ReactNode
    side: "right"
    width?: Property.Width
    minWidth?: Property.MinWidth
    maxWidth?: Property.MaxWidth
}

export default function Resizable({ side, width, minWidth, maxWidth, children }: ResizableProps) {
    assert(side)

    const content: MutableRefObject<HTMLDivElement | null> = useRef(null)
    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!isDragging || !content.current) {
                return
            }

            const newLocation = event.clientX - content.current.offsetLeft

            if (
                newLocation > content.current.offsetLeft && // is not smaller than it self
                newLocation < document.documentElement.offsetWidth - 2 // is not bigger than the screen
            ) {
                content.current.style.width = `${newLocation}px`
            }
            document.documentElement.style.userSelect = "none"
        }

        const handleMouseUp = () => {
            setIsDragging(false)
            document.documentElement.style.userSelect = "auto"
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }
    }, [isDragging])

    return (
        <div className="flex">
            <div
                className="h-full"
                style={{ width, minWidth, maxWidth }}
                ref={content}
                data-test-id="content"
            >
                {children}
            </div>
            <div
                className="w-1 border-container-300 border-l-2 cursor-col-resize "
                onMouseDown={() => setIsDragging(true)}
                data-test-id="resize-handle"
            />
        </div>
    )
}
