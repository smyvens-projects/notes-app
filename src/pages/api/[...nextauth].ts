import NextAuth from "next-auth"

export default NextAuth({
    providers: [],
    pages: {
        signIn: process.env.NEXT_AUTH_LOGIN_PAGE,
    },
    debug: process.env.NODE_ENV !== "production",
})
