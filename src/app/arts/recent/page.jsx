"use client"
import { useDispatch, useSelector } from "react-redux"
import Gallery from "../components/Gallery"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { addNewArts } from "@/redux/features/gallerySlice/newSlice"
import { useEffect } from "react"
import { pageSize } from "@/lib/utils"


const Page = () => {
  const dispatch = useDispatch();
  const newArts = useSelector((store) => store.newArts);
  console.log(newArts)
  const { data, isLoading, isLoadingNewPage, hasMore } = useInfiniteScroll({ url: "/api/products?sort=newD", hasData:newArts?.length > 0, nextPage: Math.ceil(newArts?.length / pageSize) });
  
  useEffect(() => {
    if (data?.length > 0) {
      dispatch(addNewArts(data));
    }
  }, [data, dispatch]);

  return (
    <div>
      <Gallery hasMore={hasMore} isLoadingNewPage={isLoadingNewPage} isLoading={isLoading} galleryData={newArts} />
    </div>
  )
}

export default Page
