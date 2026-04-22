import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            text: ["display-xs", "display-sm", "display-md", "display-lg", "display-xl", "display-2xl"],
        },
    },
});

/**
 * Обертка над функцией twMerge.
 * Используется для объединения классов внутри объектов стилей.
 */
export const cx = twMerge;

/**
 * Ничего не делает, кроме как помогает сортировать классы внутри объектов стилей —
 * по умолчанию Tailwind IntelliSense это не поддерживает.
 */
export function sortCx<T extends Record<string, string | number | Record<string, string | number | Record<string, string | number>>>>(classes: T): T {
    return classes;
}
