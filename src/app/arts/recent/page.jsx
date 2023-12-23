"use client"
import { useDispatch, useSelector } from "react-redux"
import Gallery from "../components/Gallery"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { addNewArts } from "@/redux/features/gallerySlice/newSlice"


const Page = () => {
    const newArts = useSelector((store) => store.newArts);
    const dispatch = useDispatch();
    const { data, isLoading, isLoadingNewPage, hasMore } = useInfiniteScroll({ url: "/api/products?sort=newD" });

    dispatch(addNewArts(data))
  return (
      <div>
          <Gallery hasMore={hasMore} isLoadingNewPage={isLoadingNewPage} isLoading={isLoading} galleryData={newArts} />
    </div>
  )
}

export default Page
