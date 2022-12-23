declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_API_ENDPOINT: string
            NEXT_PUBLIC_BASE_PATH: string
        }
    }
}

export {}
