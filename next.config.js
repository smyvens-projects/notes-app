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
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
        compiler: {
            reactRemoveProperties: process.env.NODE_ENV === "production",
        },
    }

    return config
}
