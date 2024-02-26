import IndividualArtist from "@/components/Artist/IndividualArtist";
import React from "react";
export const metadata = {
  title: "Profile setup - Chitrakala",
  description: "Art marketplace and showcase.",
};
const Page = () => {
  return (
    <>
      <div className="">
        <IndividualArtist />
      </div>
    </>
  );
};

export default Page;
