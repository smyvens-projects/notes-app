import Resizable from "."

const randInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const SCREEN_SIZE = 500

let content: string, defaultWidth: number, resizeWidth: number, minWidth: number, maxWidth: number

beforeEach(() => {
    cy.viewport(500, 500)
    content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, quasi?"
})

it("renders all the contents passed into it", () => {
    cy.mount(<Resizable side="right">{content}</Resizable>)

    cy.contains(content).should("be.visible")
})

it("renders a handle to resize div on the correct side")

it("is able to be resized", () => {
    resizeWidth = randInt(0, SCREEN_SIZE - 10)

    cy.mount(<Resizable side="right">{content}</Resizable>)

    // resize to a random size
    cy.getByTestId("resize-handle")
        .trigger("mousedown")
        .trigger("mousemove", { clientX: resizeWidth })
        .trigger("mouseup")

    // check that the it was actually resized
    cy.getByTestId("content").should("have.css", "width", `${resizeWidth}px`)
})

it("renders with default width prop", () => {
    defaultWidth = randInt(0, SCREEN_SIZE - 10)
    resizeWidth = randInt(0, SCREEN_SIZE - 10)

    cy.mount(
        <Resizable side="right" width={`${defaultWidth}px`}>
            {content}
        </Resizable>
    )

    // check that the default width is being used
    cy.getByTestId("content").should("have.css", "width", `${defaultWidth}px`)

    // resize to a random size
    cy.getByTestId("resize-handle")
        .trigger("mousedown")
        .trigger("mousemove", { clientX: resizeWidth })
        .trigger("mouseup")

    // check that it can resize to another after dragged
    cy.getByTestId("content")
        .should("not.have.css", "width", `${defaultWidth}px`)
        .should("have.css", "width", `${resizeWidth}px`)
})

it("does not go smaller than min width", () => {
    minWidth = randInt(0, SCREEN_SIZE / 3)
    resizeWidth = randInt(0, minWidth)

    cy.mount(
        <Resizable side="right" minWidth={`${minWidth}px`}>
            {content}
        </Resizable>
    )

    // resize to a random size
    cy.getByTestId("resize-handle")
        .trigger("mousedown")
        .trigger("mousemove", { clientX: resizeWidth })
        .trigger("mouseup")

    // check that the size is not below min width
    cy.getByTestId("content")
        .should("not.have.css", "width", `${resizeWidth}px`)
        .should("have.css", "width", `${minWidth}px`)
})

it("does not go bigger than max width", () => {
    maxWidth = randInt(0, SCREEN_SIZE / 2)
    resizeWidth = randInt(maxWidth, SCREEN_SIZE)

    cy.mount(
        <Resizable side="right" maxWidth={`${maxWidth}px`}>
            {content}
        </Resizable>
    )

    // resize to a random size
    cy.getByTestId("resize-handle")
        .trigger("mousedown")
        .trigger("mousemove", { clientX: resizeWidth })
        .trigger("mouseup")

    // check that the size is not above max width
    cy.getByTestId("content")
        .should("not.have.css", "width", `${resizeWidth}px`)
        .should("have.css", "width", `${maxWidth}px`)
})

it("starts from provided width and (does not violate min and max width)", () => {
    minWidth = randInt(0, SCREEN_SIZE / 3)
    maxWidth = randInt(minWidth * 1.5, SCREEN_SIZE / 1.5)

    cy.mount(
        <Resizable side="right" minWidth={`${minWidth}px`} maxWidth={`${maxWidth}px`}>
            {content}
        </Resizable>
    )

    // *********

    // check that it resize properly in between min and max
    resizeWidth = randInt(minWidth, maxWidth)

    cy.getByTestId("resize-handle")
        .trigger("mousedown")
        .trigger("mousemove", { clientX: resizeWidth })
        .trigger("mouseup")

    cy.getByTestId("content").should("have.css", "width", `${resizeWidth}px`)

    // *********

    // check that it doesn't go below min width
    resizeWidth = randInt(0, minWidth)

    cy.getByTestId("resize-handle")
        .trigger("mousedown")
        .trigger("mousemove", { clientX: resizeWidth })
        .trigger("mouseup")

    cy.getByTestId("content")
        .should("not.have.css", "width", `${resizeWidth}px`)
        .should("have.css", "width", `${minWidth}px`)

    // *********

    // check that it doesn't go above max width
    resizeWidth = randInt(maxWidth, SCREEN_SIZE)

    cy.getByTestId("resize-handle")
        .trigger("mousedown")
        .trigger("mousemove", { clientX: resizeWidth })
        .trigger("mouseup")

    cy.getByTestId("content")
        .should("not.have.css", "width", `${resizeWidth}px`)
        .should("have.css", "width", `${maxWidth}px`)
})
