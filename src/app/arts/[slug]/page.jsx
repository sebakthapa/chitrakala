"use client"
import Gallery from "../components/Gallery";
import { addPopularArts } from "@/redux/features/gallerySlice/popularSlice";
import { addFollowingArts } from "@/redux/features/gallerySlice/followingSlice";
import { addRecentArts } from "@/redux/features/gallerySlice/recentSlice";
import Individual from "@/app/arts/components/Individual";


export const generateStaticParams = async () => {
  const cats = discoverTypes.map((type) => ({
    sluga: type,
  }))
  return cats;
}

const Page = ({ params: { slug } }) => {
  switch (slug) {
    case "popular":
      return <Gallery url={"/api/products?sort=likesD"} reduxName={"popularArts"} dispatch={addPopularArts} />
    case "following":
      return <Gallery url={"/api/products?"} reduxName={"followingArts"} dispatch={addFollowingArts}  />
    case "recent":
      return <Gallery url={"/api/products?sort=newD"} reduxName={"recentArts"} dispatch={addRecentArts} />
    default:
      return <Individual productId={slug} />
    
  }
};

export default Page;
