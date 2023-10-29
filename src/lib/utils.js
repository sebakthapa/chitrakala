export const IS_CLIENT = () => {
        return typeof window !== "undefined";
}

export function getLocalUser() {
    const localData = localStorage.getItem("user");
    return localData ? JSON.parse(localData) : null;
  }