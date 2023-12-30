"use client"
import { categories } from "@/lib/utils";
import Gallery from "../components/Gallery";
import { addPopularArts } from "@/redux/features/gallerySlice/popularSlice";
import { addFollowingArts } from "@/redux/features/gallerySlice/followingSlice";
import { addRecentArts } from "@/redux/features/gallerySlice/recentSlice";
import Individual from "@/app/artist/components/Individual";


export const generateStaticParams = async () => {
  const cats = categories.map(({ type }) => ({
    category: type,
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
      return <Individual />
    
  }
};

export default Page;
