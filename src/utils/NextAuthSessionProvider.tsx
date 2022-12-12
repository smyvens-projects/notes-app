"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

interface NextAuthSessionProviderProps {
    children: ReactNode
    session: Session | null
}
export default function NextAuthSessionProvider({
    children,
    session,
}: NextAuthSessionProviderProps) {
    return (
        <SessionProvider session={session} basePath="/projects/notes/api/auth">
            {children}
        </SessionProvider>
    )
}
