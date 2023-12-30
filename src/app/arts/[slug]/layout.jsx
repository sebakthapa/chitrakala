import GalleryHeader from "../components/GalleryHeader"

export const dynamicParams = false // true | false,

const layout = ({ children, params }) => {
    return (
        <>
            <GalleryHeader slug={params.slug} />
            {children}
        </>
    )
}

export default layout
