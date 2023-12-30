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


var unitlist = ["", "k", "m", "b", "t"];
export function formatNumberWithLetter(number) {
    let sign = Math.sign(number);
    let unit = 0;

    while (Math.abs(number) >= 1000) {
        unit = unit + 1;
        number = Math.floor(Math.abs(number) / 100) / 10;
    }
    return sign * Math.abs(number) + unitlist[unit];
}


export const categoriesColor = {
        oil: "#D4AB9C",
        water: "#B3E1EB",
        digital: "#9AAAC5",
        sketch: "#DCDCDC",
        more: "#C9B5A5",
}

export const categories = [
    {
      type: "oil",
      description: "A realm where brushstrokes whispers stories",
      image: "/landing/oil.jpg",
      link: `/arts?category=oil`,
    },
    {
      type: "water",
      description: "Washes of liquid color bloom across thirsty paper",
      image: "/landing/water.jpg",
      link: `/arts?category=water`,
    },
    {
      type: "digital",
      description: "Pixels unite to sing a song of light.",
      image: "/landing/digital.jpg",
      link: `/arts?category=digital`,
    },
    {
      type: "sketch",
      description: "Swift strokes hint at forms not yet fully revealed",
      image: "/landing/sketch.jpg",
      link: `/arts?category=sketch`,
    },
    // {
    //   type: "more",
    //   description: "Explore the all the masterpiece artworks.",
    //   image: "https://mueblesitaliano.ph/wp-content/uploads/2019/07/Contemporary-Abstract-Art-with-Ivan-Acuna-1024x794.jpg",
    //   link: `/arts`,
    // },


  ]


export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export const discoverTypes = ["popular", "recent", "following"]

export const pageSize = 12;