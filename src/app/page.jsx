import React from "react";
import MiniCarousel from "@/components/home/MiniCarousel";
import Landing from "@/components/home/Landing";
import OpenedExhibition from "@/components/home/OpenedExhibition";
import RatedArtists from "@/components/home/RatedArtists";
import Contact from "@/components/home/Contact";
import Categories from "@/components/home/Categories";
export const metadata = {
  title: "Home - Chitrakala",
  description: "Art marketplace and showcase.",
};
const Page = () => {
  return (
    <>
      <Landing />

      <section className="categoriesSection  sm:m-5 my-5  ">
        <h1 className="mainHead  font-serif p-10  mb-5 bg-white ">
          Explore by Category
          {/* <span className="font-semibold font-sans text-5xl animate_blink">_</span> */}
          <p className=" text-sm xxs:text-base  sm:text-[1.08rem]  leading-relaxed text-gray-700 antialiased py-5">
            Browse through our curated collection of artworks categorized under
            various themes. <br /> From abstract expressionism to surrealist
            dreamscapes,
          </p>
        </h1>
        <div className="bg-white pb-10">
          <Categories />
        </div>
      </section>

      <section className="featureProducts sm:mx-5  lg:flex justify-between items-center bg-white overflow-hidden ">
        <h1 className="mainHead h-full w-full  font-serif p-10  mb-5 bg-white ">
          Featured Products
          {/* <span className="font-semibold font-sans text-5xl animate_blink">_</span> */}
          <p className=" text-sm xxs:text-base  sm:text-[1.08rem]  leading-relaxed text-gray-700 antialiased py-5">
            Check out our featured products.
          </p>
        </h1>

        <div className="w-full  flex justify-center bg-white">
          <MiniCarousel />
        </div>
      </section>

      <section className="exhibitionArtist sm:m-5 my-5 bg-white lg:flex justify-between text-center  ">
        <div className="sm:mx-5 flex flex-col flex-1">
          <h1 className="mainHead text-left   font-serif m-5 bg-white ">
            Opened Exhibitions
            <p className=" text-sm xxs:text-base  sm:text-[1.08rem]  leading-relaxed text-gray-700 antialiased py-5">
              Check out our current exhibitions.
            </p>
          </h1>
          <OpenedExhibition />
        </div>

        <div className="sm:mx-5 flex flex-col flex-1  ">
          <h1 className="mainHead text-left   font-serif m-5 bg-white ">
            Rated Artists
            <p className=" text-sm xxs:text-base  sm:text-[1.08rem]  leading-relaxed text-gray-700 antialiased py-5">
              Check out top artists and their artworks .
            </p>
          </h1>
          <RatedArtists />
        </div>
      </section>
    </>
  );
};

export default Page;
