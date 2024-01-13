"use client"
import Gallery from "../components/Gallery";
import { addPopularArts } from "@/redux/features/gallerySlice/popularSlice";
import { addFollowingArts } from "@/redux/features/gallerySlice/followingSlice";
import { addRecentArts } from "@/redux/features/gallerySlice/recentSlice";
import Individual from "@/app/arts/components/Individual";
import { useSelector } from "react-redux";
import Link from "next/link";


export const generateStaticParams = async () => {
  const cats = discoverTypes.map((type) => ({
    sluga: type,
  }))
  return cats;
}


const Page = ({ params: { slug } }) => {
  const user = useSelector((store) => store.user)
  const following = useSelector(store => store.followingArtists)
  switch (slug) {
    case "popular":
      return <Gallery url={"/api/products?sort=likesD"} reduxName={"popularArts"} dispatch={addPopularArts} />
    case "following":
      return (
        <>
          {
            (following?.length == 0) ? (
              <div className="text-center p-5 text-gray-600 w-full ">
                <h1 className="mainHead  font-serif p-10  mb-5 bg-white "> {"🎨 Oops!"}
                  {/* <span className="font-semibold font-sans text-5xl animate_blink">_</span> */}
                  <p className=" text-sm xxs:text-base  sm:text-[1.08rem]  leading-relaxed text-gray-700 antialiased py-5">
                    {"You haven't followed any artists yet. 🤔."}
                    <br />
                    <span className="text-sm ">{"Start your art journey by exploring and following talented creators! 🚀"}</span>
                    <br />
                    <Link href="/arts/popular" className="tex-sm text-blue-500 mt-2 block underline hover:no-underline">Explore popular Arts</Link>

                  </p>
                </h1>

              </div>
            ) : (
              <Gallery dependencies={[user?._id]} url={`/api/products/following/${user?._id}?`} reduxName={"followingArts"} dispatch={addFollowingArts} />
            )
          }

        </>
      )
    case "recent":
      return <Gallery url={"/api/products?sort=newD"} reduxName={"recentArts"} dispatch={addRecentArts} />
    default:
      return <Individual productId={slug} />
  }
};

export default Page;

