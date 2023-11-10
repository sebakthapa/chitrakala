"use client";
import { motion } from "framer-motion";
import UpdateDetails from "@/components/UpdateDetails";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import LoadingComponent from "@/components/LoadingComponent";
import ArtCard from "@/components/ArtCard";
import Skeleton from "react-loading-skeleton";


const Page = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, status: sessionStatus } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/products/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (sessionStatus !== "authenticated" ) {
    return <><LoadingComponent/></>; // Render a loading indicator here
  }

  return (
    <>
      <div className="w-full aa max-w-[600px] border- m-auto mt- font-serif border- p-2 xs:p-5 mt-10  rounded-lg">
        <motion.div
          className="mainInformation "
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <UpdateDetails
            title="Your Profile"
            subtitle="Update your profile and upload on Chitrakala."
          />
        </motion.div>
      </div>

      
      {loading ? (
                <div className="myScroll pb-10 flex overflow-x-auto">
                    <Skeleton height={400} width={300} containerClassName="m-5 shiny_effect flex-1 flex gap-2" count={4} />
                </div>
            ) : (
                <div className="myScroll pb-10 flex overflow-x-auto">
                    {userData?.map((item, index) => (
                        <ArtCard key={index} option={true} item={item} />
                    ))}
                </div>
            )}
    </>
  );
};

export default Page;