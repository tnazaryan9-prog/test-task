import axios from "axios";

/**
 * Общий HTTP-клиент для внешних API (DummyJSON и аналоги).
 * Импортируйте этот экземпляр вместо прямого вызова `axios`, чтобы base URL, заголовки и таймауты оставались единообразными.
 */
export const axiosService = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30_000,
});
