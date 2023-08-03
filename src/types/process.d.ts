declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: string;
        PORT: number;
        NEXT_PUBLIC_API_SERVER_URL: string;
        NEXT_PUBLIC_SOC_SERVER_URL: string;
        NEXT_PUBLIC_API_URL: string;
        NEXT_PUBLIC_WEB_URL: string;
    }
}
