import Button from "./Button"

describe("Button", () => {
    it("Renders with text", () => {
        cy.mount(<Button onClick={() => null}>Hello World</Button>)

        cy.getByTestId("button").should("contain.text", "Hello World")
    })

    it("onClick function runs ", () => {
        const onClickFunc = cy.stub().as("handleClick")

        cy.mount(<Button onClick={onClickFunc}>my button</Button>)
        cy.getByTestId("button").click()

        cy.get("@handleClick").should("have.been.calledOnce")
    })
})
