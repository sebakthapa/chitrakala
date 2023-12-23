"use client"
import { useDispatch, useSelector } from "react-redux"
import Gallery from "../components/Gallery"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { addFollowingArts } from "@/redux/features/gallerySlice/followingSlice"
import { useEffect } from "react"
import { pageSize } from "@/lib/utils"


const Page = () => {
  const followingArts = useSelector((store) => store.followingArts);
  const dispatch = useDispatch();
  const { data, isLoading, isLoadingNewPage, hasMore } = useInfiniteScroll({ url: "/api/products?sort=newD", hasData:followingArts?.length > 0, nextPage: Math.ceil(followingArts?.length / pageSize) });


  useEffect(() => {
    if (data?.length > 0) {
      dispatch(addFollowingArts(data))
    }
  }, [data, dispatch]);


  return (
    <div>
      This page will be available once follow feature is implemented.
      {/* <Gallery hasMore={hasMore} isLoadingNewPage={isLoadingNewPage} isLoading={isLoading} galleryData={followingArts} /> */}
    </div>
  )
}

export default Page
