import { Property } from "csstype"
import { createRef, RefObject } from "react"
import hexRgb from "hex-rgb"
import PopupWindow from "."

const convertHexToRgb = (color: string) => {
    const { red, green, blue, alpha } = hexRgb(color)

    return alpha === 1
        ? `rgb(${red}, ${green}, ${blue})`
        : `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(3)})`
}

let trigger: RefObject<HTMLButtonElement>,
    location: { left: Property.Left; top: Property.Top },
    backgroundColor: Property.BackgroundColor,
    content: string,
    borderColor: Property.BorderColor,
    pageTint: Property.BackgroundColor

describe("popup window", () => {
    beforeEach(() => {
        trigger = createRef()
        content = "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    })

    it("it renders after user clicks on trigger and hides when user click out", () => {
        cy.mount(
            <>
                <button type="button" ref={trigger} id="trigger">
                    trigger
                </button>
                <PopupWindow
                    trigger={trigger}
                    location={location}
                    backgroundColor={backgroundColor}
                >
                    {content}
                </PopupWindow>
            </>
        )

        // double check that the popup is off by default
        cy.getByTestId("popup-window-wrapper").should("not.exist")
        cy.contains(content).should("not.exist")

        // click on the trigger and the popup should show
        cy.get("#trigger").click()
        cy.contains(content)

        // click on the document, and the popup should disappear
        cy.getByTestId("popup-window-wrapper").click()
        cy.contains(content).should("not.exist")
    })

    it("renders in the correct location", () => {
        location = { left: "50px", top: "100px" }

        cy.mount(
            <>
                <button type="button" ref={trigger} id="trigger">
                    trigger
                </button>
                <PopupWindow
                    trigger={trigger}
                    location={location}
                    backgroundColor={backgroundColor}
                >
                    {content}
                </PopupWindow>
            </>
        )

        cy.get("#trigger").click()

        cy.getByTestId("popup-window").should("have.css", "top", location.top)
        cy.getByTestId("popup-window").should("have.css", "left", location.left)

        // TODO: ensure that it can't go of the screen
    })

    it("renders optional styles when used", () => {
        backgroundColor = "#fff"
        borderColor = "#ff0000"
        pageTint = "#cd00ffc0"

        cy.mount(
            <>
                <button type="button" ref={trigger} id="trigger">
                    trigger
                </button>
                <PopupWindow
                    trigger={trigger}
                    location={location}
                    backgroundColor={backgroundColor}
                    borderColor={borderColor}
                    pageTint={pageTint}
                >
                    {content}
                </PopupWindow>
            </>
        )

        cy.get("#trigger").click()

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
