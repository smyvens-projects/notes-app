const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

/**
 * @type {import('next').NextConfig}
 */
module.exports = (phase, { defaultConfig }) => {
    const config = {
        reactStrictMode: true,
        swcMinify: true,
        experimental: {
            appDir: true,
        },
        basePath: "/notes",
    }

    return config
}
