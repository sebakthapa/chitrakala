import React from "react";
import MiniCarousel from "@/components/MiniCarousel";
import Landing from "@/components/Home/Landing";
import CategoryCard from "@/components/Home/CategoryCard";
export const metadata = {
  title: "Home - Chitrakala",
  description: "Art marketplace and showcase.",
};
const Page = () => {

  const images = [
    "https://img.freepik.com/premium-photo/spectacular-abstract-city-orange-teal-digital-art-3d-illustration_31965-49704.jpg",
    "https://images.nightcafe.studio/jobs/cNxmQICjMo8xdPi31Zjt/cNxmQICjMo8xdPi31Zjt_6.9444x.jpg?tr=w-9999,c-at_max",
    "https://cdn11.bigcommerce.com/s-x49po/images/stencil/1500x1500/products/43339/58776/1571390056201_6D1F1BD8-CA91-4B86-AD0F-249681E867B0__71341.1571633277.jpg?c=2",
    "https://i.pinimg.com/736x/60/d3/6f/60d36f7dec5f9a2818a08b964def0190.jpg",
  ];
   

  return (
    <>
      <Landing />
   

      <section className=" bg-slate-100 categoriesSection  md:my-36 md:px-5 md:pb-36">
        <h1 className="font-semibold font-poppins text-3xl p-10 text-center mb-5">Explore by Category<span className="font-semibold font-sans text-5xl animate_blink">_</span></h1>
    <CategoryCard/>
      </section>




   

      <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
      <div className="w-full">
             <MiniCarousel images={images} />

          </div>
      </div>
    </>
  );
};

export default Page;
