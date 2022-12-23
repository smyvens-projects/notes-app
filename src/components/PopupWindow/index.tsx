import { Property } from "csstype"
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"

type Location = `${number}px`
type Trigger = (HTMLElement | null) | (HTMLElement | null)[]

interface PopupWindowProps {
    children: ReactNode
    triggers: {
        open: Trigger
        close?: Trigger
    }
    location: {
        top: Location
        left: Location
    }
    onChange?: (isOpen: boolean) => void
    // styles
    backgroundColor?: Property.BackgroundColor
    borderColor?: Property.BorderColor
    pageTint?: Property.BackgroundColor
}

export default function PopupWindow({
    children,
    triggers,
    location: givenLocation,
    onChange,
    borderColor,
    backgroundColor = "white",
    pageTint = "#66000000",
}: PopupWindowProps) {
    const [isOpen, setOpen] = useState(false)
    const popupWrapperRef = useRef<HTMLDivElement>(null)

    const changePopupState = () => {
        setOpen(val => {
            return !val
        })
        if (onChange) {
            onChange(!isOpen)
        }
    }

    // add/remove click event listeners for triggers
    const handleTriggers = (trigger: Trigger | undefined, onClick: (event: MouseEvent) => void) => {
        if (!trigger) return undefined

        // convert a single trigger to an array
        const triggerArray = Array.isArray(trigger) ? trigger : [trigger]

        // add one event listener for each trigger
        triggerArray.forEach(trig => {
            trig?.addEventListener("click", onClick)
        })

        return () => {
            // whenever the popup is closed, remove the event listener from the screen
            triggerArray.forEach(trig => {
                trig?.removeEventListener("click", onClick)
            })
        }
    }

    // click event listeners that open the popup window
    useEffect(() => {
        return handleTriggers(triggers.open, changePopupState)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggers.open])

    // click event listeners that open the popup window
    useEffect(() => {
        return handleTriggers(triggers.close, changePopupState)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggers.close])

    // **************************************************

    /**
     *
     * @param given the location that was pass to this component as part of the props
     * @param popupDimension The current width or height of the popup. ps: popup dimension
     * @param screenRestriction the total width or height of the screen. ps: document.documentElement.*
     */
    const ensurePopupIsAlwaysOnScreen = (
        given: Location,
        popupDimension: number,
        screenRestriction: number
    ): Location => {
        const padding = 10

        // convert location to number
        const location =
            +given.replace("px", "") < screenRestriction * 2
                ? +given.replace("px", "")
                : screenRestriction

        // check if the popup is partially or totally outside the window
        if (location + popupDimension > screenRestriction) {
            const overflow = (location + popupDimension) % screenRestriction
            const newLocation = location - overflow - padding

            // make sure that the popup is not off the screen on the opposite direction
            return `${newLocation > 0 ? newLocation : 0}px`
        }

        return `${location}px`
    }

    const [popupLocation, setPopupLocation] = useState(givenLocation)
    const popupRef = useCallback(
        (popup: HTMLDivElement) => {
            if (!popup) return

            setPopupLocation({
                left: ensurePopupIsAlwaysOnScreen(
                    givenLocation.left,
                    popup.clientWidth,
                    document.documentElement.clientWidth
                ),
                top: ensurePopupIsAlwaysOnScreen(
                    givenLocation.top,
                    popup.clientHeight,
                    document.documentElement.clientHeight
                ),
            })
        },
        [givenLocation]
    )

    return isOpen ? (
        <div
            className="fixed w-full h-screen z-50"
            onClick={element => element.target === popupWrapperRef.current && changePopupState()}
            style={{ backgroundColor: pageTint }}
            ref={popupWrapperRef}
            data-test-id="popup-window-wrapper"
        >
            <div
                className="fixed p-1 rounded-md shadow-around border border-container-300"
                style={{ ...popupLocation, backgroundColor, borderColor }}
                ref={popupRef}
                data-test-id="popup-window"
            >
                {children}
            </div>
        </div>
    ) : null
}
