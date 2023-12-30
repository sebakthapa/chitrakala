import { categories, discoverTypes } from "@/lib/utils";
import Gallery from "../../components/Gallery";

export const generateStaticParams = async () => {
  const cats = discoverTypes.map((type) => ({
    slug: type,
  }))
  return cats;
}



const Page = ({ params: { category, slug } }) => {
  const sortBy = slug == "popular" ? "likesD" : slug == "recent" ? "newD" : ""
  return (
    <>
      {
        categories.map(({ type }) => {
          type == category && console.log(type, category)
          return type == category && <Gallery url={`/api/products?category=${category}&sort=${sortBy}`} />
        })
      }
      
    </>
  )
};

export default Page;



