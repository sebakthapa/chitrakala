import Gallery from "./components/Gallery";

export const metadata = {
  title: "Gallery - Chitrakala",
  description: "Art marketplace and showcase.",
};

const Page = ({searchParams}) => {
  return (
    <>
      <h1 className="text-center capitalize font-extrabold text-2xl pt-10 pb-10">
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
