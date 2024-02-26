import React from "react";
import Exhibition from "../../components/exhibition/Exhibition";

export const metadata = {
  title: "Exhibition - Chitrakala",
  description: "Art marketplace and showcase.",
};

const Page = () => {
  return (
    <>
      <main class="py-4">
        <div class="px-4">
          <Exhibition />
        </div>
      </main>
    </>
  );
};

export default Page;
