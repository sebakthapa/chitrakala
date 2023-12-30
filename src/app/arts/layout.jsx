"use client"
import { usePathname } from "next/navigation"
import GalleryHeader from "./components/GalleryHeader"

const Layout = ({ children }) => {
    const pathname = usePathname()  
    return (
        <>

            {children}
        </>
    )
}

export default Layout
