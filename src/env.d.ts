declare namespace NodeJS {
    interface ProcessEnv {
        /** Базовый URL API (подставляется при сборке из `.env` через Webpack). */
        readonly API_BASE_URL: string;
    }
}
