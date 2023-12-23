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
                route === "arts" && <GalleryHeader />
            }
            
            {children}
        </>
    )
}

export default Layout
