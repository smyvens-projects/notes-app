import { loudrinaShadow, gilroy } from "~/utils/font-loader"
import { ReactNode } from "react"

import "~/styles/globals.css"

interface RootLayoutProps {
    children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <head />
            <body className={`${loudrinaShadow.variable} ${gilroy.variable}`}>{children}</body>
        </html>
    )
}
