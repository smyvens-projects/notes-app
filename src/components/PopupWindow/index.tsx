"use client"

import {
    MouseEventHandler,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react"
import { Property } from "csstype"

type Cord = `${number}px`

interface PopupWindowProps {
    children: ReactNode
    location: {
        left: Cord
        top: Cord
    }
    trigger: RefObject<Element | null>
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
    const [adjustedLocation, setAdjustedLocation] = useState(location)

    // ensure that the popup is always on the screen, even if the cords provided are off the screen
    const calculateNewLocation = (given: Cord, current: number, max: number): Cord => {
        const padding = 10
        // console.log(+given.replace("px", ""))
        const givenLocation = +given.replace("px", "") < max * 2 ? +given.replace("px", "") : max

        if (givenLocation + current > max) {
            const overflow = (givenLocation + current) % max
            const newLocation = givenLocation - overflow - padding

            // make sure that the popup is not off the screen on the opposite direction
            return `${newLocation > 0 ? newLocation : 0}px`
        }

        return `${givenLocation}px`
    }

    const popupRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (!node) return

            setAdjustedLocation({
                left: calculateNewLocation(
                    location.left,
                    node.clientWidth,
                    document.documentElement.clientWidth
                ),
                top: calculateNewLocation(
                    location.top,
                    node.clientHeight,
                    document.documentElement.clientHeight
                ),
            })
        },
        [location]
    )

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
            data-test-id="popup-window-wrapper"
            onClick={handleClose}
            ref={wrapperRef}
            style={{ backgroundColor: pageTint }}
        >
            <div
                style={{ ...adjustedLocation, backgroundColor, borderColor }}
                data-test-id="popup-window"
                ref={popupRef}
                className="fixed p-1 rounded-md shadow-around border border-container-300"
            >
                {children}
            </div>
        </div>
    ) : null
}
