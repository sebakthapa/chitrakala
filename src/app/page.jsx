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


      <section className=" bg-slate-100 categoriesSection  md:py-36 md:px-5 md:pb-36">
        <h1 className="font-semibold font-poppins text-3xl p-10 text-center mb-5">Explore by Category<span className="font-semibold font-sans text-5xl animate_blink">_</span></h1>
        <CategoryCard />
      </section>



      <div className=" font-sans h-screen w-full flex flex-row justify-center items-center mt-20">
        <div className="w-full flex justify-center">
          <MiniCarousel />

        </div>
      </div>
    </>
  );
};

export default Page;
