import { defineConfig } from "cypress"

export default defineConfig({
    projectId: "6kqppz",
    e2e: {
        setupNodeEvents() {
            // implement node event listeners here
        },
    },

    component: {
        devServer: {
            framework: "next",
            bundler: "webpack",
        },
    },
    video: process.env.NODE_ENV === "development",
})
