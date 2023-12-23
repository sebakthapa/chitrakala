"use client"
import { useDispatch, useSelector } from "react-redux"
import Gallery from "../components/Gallery"
import { useEffect } from "react"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { addPopularArts, sortPopularArts } from "@/redux/features/gallerySlice/popularSlice"
import { pageSize } from "@/lib/utils"


const Page = () => {
    const popularArts = useSelector((store) => store.popularArts);
    const dispatch = useDispatch();
    const { data, isLoading, isLoadingNewPage, hasMore } = useInfiniteScroll({ url: "/api/products?sort=likesD", hasData:popularArts?.length > 0, nextPage: Math.ceil(popularArts?.length / pageSize) });


    useEffect(() => {
        if (data?.length > 0) {
            dispatch(addPopularArts(data))
        }
    }, [data, dispatch]);

    useEffect(() => {
        dispatch(sortPopularArts())
    }, [])

    return (
        <div>
            <Gallery hasMore={hasMore} isLoadingNewPage={isLoadingNewPage} isLoading={isLoading} galleryData={popularArts} />
        </div>
    )
}

export default Page
