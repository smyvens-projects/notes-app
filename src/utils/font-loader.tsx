import localFont from "@next/font/local"

export const gilroy = localFont({
    src: [
        {
            path: "../../public/fonts/Gilroy/Thin.ttf",
            weight: "100",
        },
        {
            path: "../../public/fonts/Gilroy/ExtraLight.ttf",
            weight: "200",
        },
        {
            path: "../../public/fonts/Gilroy/Light.ttf",
            weight: "300",
        },
        {
            path: "../../public/fonts/Gilroy/Regular.ttf",
            weight: "400",
        },
        {
            path: "../../public/fonts/Gilroy/Medium.ttf",
            weight: "500",
        },
        {
            path: "../../public/fonts/Gilroy/SemiBold.ttf",
            weight: "600",
        },
        {
            path: "../../public/fonts/Gilroy/Bold.ttf",
            weight: "700",
        },
        {
            path: "../../public/fonts/Gilroy/ExtraBold.ttf",
            weight: "800",
        },
        {
            path: "../../public/fonts/Gilroy/Black.ttf",
            weight: "900",
        },
    ],
    variable: "--font-gilroy",
})

export const loudrinaShadow = localFont({
    src: "../../public/fonts/Londrina_Shadow/Regular.ttf",
    variable: "--font-loudrina-shadow",
})
