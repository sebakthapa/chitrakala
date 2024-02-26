import { categories, discoverTypes } from "../../../../../utils/utils";
import Gallery from "../../../../components/arts/Gallery";

export const generateStaticParams = async () => {
  const cats = categories.map(({ type: categoryType }) => {
    return { category: categoryType };
  });
  console.log(cats);
  return cats;
};

const Page = ({ params: { category, slug } }) => {
  const sortBy = slug == "popular" ? "likesD" : slug == "recent" ? "newD" : "";
  return (
    <>
      {categories.map(({ type }) => {
        type == category && console.log(type, category);
        return (
          type == category && (
            <Gallery
              url={`/api/products?category=${category}&sort=${sortBy}`}
            />
          )
        );
      })}
    </>
  );
};

export default Page;
