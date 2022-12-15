import { MutableRefObject, ReactNode, useEffect, useRef, useState } from "react"

/**
 * ! FIXME: left side has reversed controls
 */

export interface ResizableWidthProps {
    children: ReactNode
    side: "left" | "right"
    width: number
    minWidth?: string
    maxWidth?: string
}

export default function ResizableWidth({
    children,
    side,
    width,
    minWidth,
    maxWidth,
}: ResizableWidthProps) {
    const contentWrapper: MutableRefObject<HTMLDivElement | null> = useRef(null)
    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!isDragging) {
                return
            }

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            contentWrapper.current!.style.width = `${event.clientX}px`
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
        <div className={`flex ${side === "left" ? "flex-row-reverse" : ""}`}>
            <div className="h-full" ref={contentWrapper} style={{ width, minWidth, maxWidth }}>
                {children}
            </div>
            <div
                className={`w-1 border-container-300 cursor-col-resize ${
                    side === "left" ? "border-r" : "border-l"
                }`}
                onMouseDown={() => setIsDragging(true)}
            />
        </div>
    )
}
