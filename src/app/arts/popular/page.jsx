"use client"
import { useDispatch, useSelector } from "react-redux"
import Gallery from "../components/Gallery"
import { useEffect } from "react"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { addPopularArts } from "@/redux/features/gallerySlice/popularSlice"


const Page = () => {
    const popularArts = useSelector((store) => store.popularArts);
    const dispatch = useDispatch();
    const { data, isLoading, isLoadingNewPage, hasMore } = useInfiniteScroll({ url: "/api/products?sort=likesD"});


    dispatch(addPopularArts(data))


    return (
        <div>
            <Gallery hasMore={hasMore} isLoadingNewPage={isLoadingNewPage} isLoading={isLoading} galleryData={popularArts} />
        </div>
    )
}

export default Page
