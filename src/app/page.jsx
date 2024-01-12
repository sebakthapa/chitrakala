import React from "react";
import MiniCarousel from "@/components/MiniCarousel";
import Landing from "@/components/Home/Landing";
import CategoryCard from "@/components/Home/CategoryCard";
export const metadata = {
  title: "Home - Chitrakala",
  description: "Art marketplace and showcase.",
};
const Page = () => {




  return (
    <>
      <Landing />


      <section className="  sm:m-5 my-5 categoriesSection ">
        <h1 className="mainHead  font-serif p-10  mb-5 bg-white ">Explore by Category
        {/* <span className="font-semibold font-sans text-5xl animate_blink">_</span> */}
        <p
         className=" text-sm xxs:text-base  sm:text-[1.08rem]  leading-relaxed text-gray-700 antialiased py-5"
        >
          Browse through our curated collection of artworks categorized under various themes. <br /> From abstract expressionism to surrealist dreamscapes,
        </p>
        </h1>
        <div className="bg-white pb-10">

        <CategoryCard />
        </div>
      </section>

      <section className="sm:mx-5  lg:flex justify-between items-center bg-white overflow-hidden ">
      <h1 className="mainHead h-full w-full  font-serif p-10  mb-5 bg-white ">Featured Products
        {/* <span className="font-semibold font-sans text-5xl animate_blink">_</span> */}
        <p
         className=" text-sm xxs:text-base  sm:text-[1.08rem]  leading-relaxed text-gray-700 antialiased py-5"
        >
          Check out our featured products.
        </p>
        </h1>

    
        <div className="w-full  flex justify-center bg-white">
          <MiniCarousel />

        </div>
      
      </section>

   
    </>
  );
};

export default Page;
