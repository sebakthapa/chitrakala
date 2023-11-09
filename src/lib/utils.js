import { signOut } from "next-auth/react";

export const IS_CLIENT = () => {
    return typeof window !== "undefined";
}

export function getLocalUser() {
    const localData = localStorage.getItem("user");
    return localData ? JSON.parse(localData) : null;
}


export const showNavigationMenu = (pathname) => {
    const isAuthPage = pathname.split("/").includes("auth") || pathname.split("/").includes("profile-setup");
    return isAuthPage
}

export const typingEffect = (string, setState, option) => {
    let count = 0;
    const wordInterval = setInterval(() => {
        if (string[count]) {
            setState((prev) => prev + string[count])
            count++;
        } else {
            clearInterval(wordInterval);
            return;
        }

    }, option?.speed || 500)
}


