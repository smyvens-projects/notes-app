const customConfig = require("tailwind-config")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["src/**/*.tsx"],
    presets: [customConfig],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                gilroy: ["Gilroy", "sans-serif"],
            },
        },
    },
    plugins: [],
}
