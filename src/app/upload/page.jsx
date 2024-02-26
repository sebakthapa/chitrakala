import Upload from "../../components/upload/Upload";
export const metadata = {
  title: "Upload - Chitrakala",
  description: "Art marketplace and showcase.",
};

const Page = () => {
  return (
    <>
      <div className="container  my-12 w-full max-w-[600px] flex justify-center items-center mx-auto ">
        <Upload />
      </div>
    </>
  );
};

export default Page;
