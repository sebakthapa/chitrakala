import Gallery from "./components/Gallery";

export const metadata = {
  title: "Gallery - Chitrakala",
  description: "Art marketplace and showcase.",
};

const Page = ({searchParams}) => {
  return (
    <>
      <h1 className="  capitalize my-4 text-center text-2xl text-gray-900 font-bold md:text-4xl">
        {searchParams?.category ?(
          `${searchParams.category}`
        ):`Trending`}
      </h1>
      

      <main className="py-4">
        <div className="px-4">
          <Gallery />
        </div>
      </main>
    </>
  );
};

export default Page;
