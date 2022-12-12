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
        basePath: "/projects/notes",
        compiler: {
            reactRemoveProperties: process.env.NODE_ENV === "production",
        },
    }

    return config
}
