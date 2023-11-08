import React from "react";
import Artist from "./components/Artist";

export const metadata = {
  title: "Artists - Chitrakala",
  description: "Art marketplace and showcase.",
};

const Page = () => {
  return (
    <>
      <h2 className="my-4 text-center text-2xl text-gray-900 font-bold md:text-4xl">
        Artists
      </h2>

      <Artist />
    </>
  );
};

export default Page;
