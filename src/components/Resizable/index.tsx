"use client"

import ResizableHeight, { ResizableHeightProps } from "./ResizableHeight"
import ResizableWidth, { ResizableWidthProps } from "./ResizableWidth"

type ResizablePanelProps = ResizableWidthProps | ResizableHeightProps

export default function ResizablePanel(props: ResizablePanelProps) {
    const { side } = props

    if (side === "left" || side === "right") {
        return <ResizableWidth {...props} />
    }

    if (side === "top" || side === "bottom") {
        return <ResizableHeight {...props} />
    }

    return null
}
