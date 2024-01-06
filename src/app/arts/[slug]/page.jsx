"use client"
import Gallery from "../components/Gallery";
import { addPopularArts } from "@/redux/features/gallerySlice/popularSlice";
import { addFollowingArts } from "@/redux/features/gallerySlice/followingSlice";
import { addRecentArts } from "@/redux/features/gallerySlice/recentSlice";
import Individual from "@/app/arts/components/Individual";
import { useSelector } from "react-redux";


export const generateStaticParams = async () => {
  const cats = discoverTypes.map((type) => ({
    sluga: type,
  }))
  return cats;
}


const Page = ({ params: { slug } }) => {
  const user = useSelector((store) => store.user)
  switch (slug) {
    case "popular":
      return <Gallery url={"/api/products?sort=likesD"} reduxName={"popularArts"} dispatch={addPopularArts} />
    case "following":
      return <Gallery dependencies={[user?.user?._id]} url={`/api/products/following/${user?.user?._id}?`} reduxName={"followingArts"} dispatch={addFollowingArts}  />
    case "recent":
      return <Gallery url={"/api/products?sort=newD"} reduxName={"recentArts"} dispatch={addRecentArts} />
    default:
      return <Individual productId={slug} />
  }
};

export default Page;

