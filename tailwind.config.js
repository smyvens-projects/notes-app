const customConfig = require("tailwind-config")
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["src/**/*.tsx"],
    presets: [customConfig],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["var(--font-poppins)", "sans-serif"],
                gilroy: ["var(--font-gilroy)", "sans-serif"],
                "loudrina-shadow": ["var(--font-loudrina-shadow)"],
            },
            boxShadow: {
                around: "rgba(0, 0, 0, 0.25) 0px 5px 30px",
            },
        },
    },
    plugins: [],
}
