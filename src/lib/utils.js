export const IS_CLIENT = () => {
    if (typeof window !== "undefined") {
        return true;
    }
    return false;
}

export function getLocalUser() {
    const localData = localStorage.getItem("user");
    return localData ? JSON.parse(localData) : null;
  }