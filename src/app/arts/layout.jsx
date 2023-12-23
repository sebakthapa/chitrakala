"use client"
import { usePathname } from "next/navigation"
import GalleryHeader from "./components/GalleryHeader"

const Layout = ({ children }) => {
    const pathname = usePathname();
    const route = pathname.split("/").at(-1)
    console.log(route)
    return (
        <>
            {
                (route === "recent" || route === "following" || route === "popular" ) && <GalleryHeader />
            }
            
            {children}
        </>
    )
}

export default Layout
