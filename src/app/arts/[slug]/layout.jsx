import GalleryHeader from "../../../components/arts/GalleryHeader";

const layout = ({ children, params: { slug } }) => {
  const showHeader =
    slug == "popular" || slug == "recent" || slug == "following";
  return (
    <>
      {showHeader && <GalleryHeader slug={slug} />}

      {children}
    </>
  );
};

export default layout;
