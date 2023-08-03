export const IS_CLIENT = () => {
    if (typeof window !== "undefined") {
        return true;
    }
    return false;
}