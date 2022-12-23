import { Property } from "csstype"
import hexRgb from "hex-rgb"
import { createRef, RefObject } from "react"
import PopupWindow from "."

const convertHexToRgb = (color: string) => {
    const { red, green, blue, alpha } = hexRgb(color)

    return alpha === 1
        ? `rgb(${red}, ${green}, ${blue})`
        : `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(3)})`
}

let triggers: {
        open: HTMLButtonElement | null
        close?: HTMLButtonElement | null
    },
    location: { left: `${number}px`; top: `${number}px` },
    backgroundColor: Property.BackgroundColor,
    content: string,
    borderColor: Property.BorderColor,
    pageTint: Property.BackgroundColor

const triggerButton = (type: "open" | "close") => (
    <button
        type="button"
        ref={element => {
            triggers[type] = element
        }}
        className={`${type}-trigger`}
    >
        {type} popup trigger
    </button>
)

const randInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min)
}

describe("Popup window", () => {
    beforeEach(() => {
        location = { left: "0px", top: "0px" }
        triggers = {
            open: null,
            close: null,
        }
        content = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus nostrum "
    })

    it("shows after user clicks on trigger and hides when user click on the screen", () => {
        cy.mount(
            <>
                {triggerButton("open")}
                <PopupWindow triggers={triggers} location={location}>
                    {content}
                </PopupWindow>
            </>
        )

        // double check that the popup is off by default
        cy.getByTestId("popup-window-wrapper").should("not.exist")
        cy.contains(content).should("not.exist")

        // click on the trigger and the popup should show
        cy.get(".open-trigger").click()
        cy.contains(content).should("be.visible")

        // click on the document, and the popup should disappear
        cy.getByTestId("popup-window-wrapper").click()
        cy.contains(content).should("not.exist")
    })

    it.only('shows when user click on any "open popup trigger" when there are multiple')

    it("hides when the user clicks on a close trigger", () => {
        cy.mount(
            <>
                {triggerButton("open")}
                <PopupWindow triggers={triggers} location={location}>
                    {triggerButton("close")}
                    {content}
                </PopupWindow>
            </>
        )

        // open the popup window
        cy.get(".open-trigger").click()

        // close the popup window via the trigger
        cy.get(".close-trigger").click()
        cy.contains(content).should("not.exist")
    })

    it("hides when the user clicks on any close trigger when there are multiple")

    it("renders on the location provided", () => {
        cy.mount(
            <>
                {triggerButton("open")}
                <PopupWindow triggers={triggers} location={location}>
                    {content}
                </PopupWindow>
            </>
        )

        cy.get(".open-trigger").click()

        cy.getByTestId("popup-window").should("have.css", "top", location.top)
        cy.getByTestId("popup-window").should("have.css", "left", location.left)
        cy.contains(content).should("be.visible")
    })

    it("Adjust the location so that it is always visible (unless the content is bigger than the screen)", () => {
        ;[...Array(10)].forEach(() => {
            location = { left: `${randInt(1000, 100000)}px`, top: `${randInt(1000, 100000)}px` }

            cy.mount(
                <>
                    {triggerButton("open")}
                    <PopupWindow triggers={triggers} location={location}>
                        {content}
                    </PopupWindow>
                </>
            )

            cy.get(".open-trigger").click()

            cy.getByTestId("popup-window").should("not.have.css", "top", location.top)
            cy.getByTestId("popup-window").should("not.have.css", "left", location.left)
            cy.contains(content).should("be.visible")
        })
    })

    it("fires callback function with proper state", () => {
        cy.mount(
            <>
                {triggerButton("open")}
                <PopupWindow
                    triggers={triggers}
                    location={location}
                    onChange={cy.stub().as("callback")}
                >
                    {triggerButton("close")}
                    {content}
                </PopupWindow>
            </>
        )

        cy.get(".open-trigger").click()
        cy.get("@callback").should("have.been.calledWithExactly", true)

        cy.get(".close-trigger").click()
        cy.get("@callback").should("have.been.calledWithExactly", false)
    })

    it("renders optional styles when used", () => {
        backgroundColor = "#fff"
        borderColor = "#ff0000"
        pageTint = "#cd00ffc0"

        cy.mount(
            <>
                {triggerButton("open")}
                <PopupWindow
                    triggers={triggers}
                    location={location}
                    backgroundColor={backgroundColor}
                    borderColor={borderColor}
                    pageTint={pageTint}
                >
                    {content}
                </PopupWindow>
            </>
        )

        cy.get(".open-trigger").click()

        // background color of the popup window
        cy.getByTestId("popup-window").should(
            "have.css",
            "border-color",
            convertHexToRgb(borderColor)
        )
        // the color of the borders of the popup window
        cy.getByTestId("popup-window").should(
            "have.css",
            "background-color",
            convertHexToRgb(backgroundColor)
        )

        // check that the page tint is working
        cy.getByTestId("popup-window-wrapper").should(
            "have.css",
            "background-color",
            convertHexToRgb(pageTint)
        )
    })
})
