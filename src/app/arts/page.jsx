import Products from "@/models/useraccounts/products";
import Gallery from "./components/Gallery";
import dbConnect from "@/lib/dbConnect";

export const metadata = {
  title: "Gallery - Chitrakala",
  description: "Art marketplace and showcase.",
};

console.log("haha")
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
