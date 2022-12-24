import { AiFillStar } from "react-icons/ai"
import Input from "."

const randInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min)
}

let content: string

beforeEach(() => {
    content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, accusantium!"
})

it("onChange event gets fired every time a letter is added or removed", () => {
    cy.mount(<Input onChange={cy.stub().as("handleChange")} />)

    // type something into the input
    cy.getByTestId("input")
        .should("be.visible")
        .should("have.value", "") // it starts by being empty
        .type(content)
        .should("have.value", content) // ensure that whatever was typed is visible

    // check that the onchange event was called for every single character added
    cy.get("@handleChange").should("have.callCount", content.length).invoke("resetHistory")

    // remove some of the content from the input
    content = content.substring(randInt(0, content.length - 1), content.length)
    cy.getByTestId("input").type(content)

    // check that the onChange event was called whenever a character was removed
    cy.get("@handleChange").should("have.callCount", content.length)
})

it("shows placeholder", () => {
    const placeholder = "my placeholder"

    cy.mount(<Input onChange={cy.stub()} placeholder={placeholder} />)

    cy.getByTestId("input").should("have.attr", "placeholder", placeholder)
})

it("renders correct type", () => {
    const types = [undefined, "email", "password", "text"] as const

    types.forEach(type => {
        cy.mount(<Input onChange={cy.stub()} type={type} />)
        cy.getByTestId("input").should("have.attr", "type", type || "text")
    })
})

it("renders icon", () => {
    // render icon without an onclick prop
    cy.mount(<Input onChange={cy.stub()} icon={{ name: AiFillStar }} />)

    // check that icon is visible and does invite to user to click on it
    cy.getByTestId("icon").should("be.visible").should("not.have.css", "cursor", "pointer")

    // render icon while using an onclick prop
    cy.mount(
        <Input
            onChange={cy.stub()}
            icon={{ name: AiFillStar, onClick: cy.stub().as("handleIconClick") }}
        />
    )

    // click on the icon
    cy.getByTestId("icon").should("have.css", "cursor", "pointer").click()

    // check that the onclick function was called
    cy.get("@handleIconClick").should("have.been.calledOnce")
})

it("can automatically focus on load", () => {
    cy.mount(
        <>
            <Input onChange={cy.stub()} focusOnLoad placeholder="focused" />
            <Input onChange={cy.stub()} placeholder="not focused" />
            <Input onChange={cy.stub()} placeholder="not focused" />
        </>
    )

    cy.focused().should("have.attr", "placeholder", "focused")
})
