declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        CLERK_PUBLISHABLE_KEY: string;
        CLERK_SECRET_KEY: string;
        NEON_DATABASE_URL: string;
    }
}
