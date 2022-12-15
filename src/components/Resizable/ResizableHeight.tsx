import { MutableRefObject, ReactNode, useEffect, useRef, useState } from "react"

export interface ResizableHeightProps {
    children: ReactNode
    side: "top" | "bottom"
    height: number
    minHeight?: number
    maxHeight?: number
}

export default function ResizableHeight({
    children,
    height,
    side,
    minHeight,
    maxHeight,
}: ResizableHeightProps) {
    const contentWrapper: MutableRefObject<HTMLDivElement | null> = useRef(null)
    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!isDragging) {
                return
            }

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            contentWrapper.current!.style.height = `${event.clientY}px`
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
            <div className="h-full" ref={contentWrapper} style={{ height, minHeight, maxHeight }}>
                {children}
            </div>
            <div
                className={`h-1 border-container-300 cursor-col-resize ${
                    side === "top" ? "border-b" : "border-t"
                }`}
                onMouseDown={() => setIsDragging(true)}
            />
        </div>
    )
}
