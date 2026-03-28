// Safe check for browser
const isBrowser = () => typeof window !== "undefined";

const parseValue = (value) => {
    if (value === null) return null;

    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};

export const getSession = (key, defaultValue = null) => {
    if (!isBrowser()) return defaultValue;
    try {
        const value = sessionStorage.getItem(key);
        return value !== null ? parseValue(value) : defaultValue;
    } catch (err) {
        console.error("Session get error:", err);
        return defaultValue;
    }
};

// export const setSession = (key, value) => {
//     if (!isBrowser()) return;

//     try {
//         const valueToStore =
//             typeof value === "object" ? JSON.stringify(value) : value;
//         sessionStorage.setItem(key, valueToStore);
//     } catch (err) {
//         console.error("Session set error:", err);
//     }
// };

export const setSession = (key, value) => {
    if (typeof window === "undefined") return;

    try {
        const valueToStore =
            value !== null && typeof value === "object"
                ? JSON.stringify(value)
                : value;

        sessionStorage.setItem(key, valueToStore);
    } catch (err) {
        console.error("Session set error:", err);
    }
};
