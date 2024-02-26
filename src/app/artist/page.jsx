import React from "react";
import Artist from "../../components/artist/Artist";

export const metadata = {
  title: "Artists - Chitrakala",
  description: "Art marketplace and showcase.",
};

const Page = () => {
  return (
    <>
      <h1 className="mainHead  font-serif p-5  m-5 bg-white ">
        Artist
        {/* <span className="font-semibold font-sans text-5xl animate_blink">_</span> */}
        <p className=" text-sm xxs:text-base  sm:text-[1.08rem]  leading-relaxed text-gray-700 antialiased py-5">
          Here you can find the artists who have contributed to our platform.{" "}
          <br /> Each artist has their own profile page where they present
          themselves, share their work,
        </p>
      </h1>

      <Artist />
    </>
  );
};

export default Page;
