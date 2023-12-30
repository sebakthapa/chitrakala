import Gallery from "./components/Gallery";

export const metadata = {
  title: "Gallery - Chitrakala",
  description: "Art marketplace and showcase.",
};

const Page = async ({ searchParams }) => {
  return (
    <>
      <main className="py-4">
        <div className="px-4">
          <Gallery />
        </div>
      </main>
    </>
  );
};

export default Page;
