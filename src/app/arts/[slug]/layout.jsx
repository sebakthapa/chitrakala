import GalleryHeader from "../components/GalleryHeader"


const layout = ({ children, params }) => {
    return (
        <>
            <GalleryHeader slug={params.slug} />
            {children}
        </>
    )
}

export default layout
