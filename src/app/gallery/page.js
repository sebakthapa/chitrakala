"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import Carousel from "@/components/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, clearUserData } from "@/redux/features/userSlice";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";


const Page = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [galleryData, setGalleryData] = useState([]);


  async function fetchData() {
    const res = await axios.get("/api/products");

    const items = await Promise.all(res.data.map(item => {
      const liked = checkLiked(item.likes, userId);
      const likesCount = item.likes.length;
      return { ...item, liked, likesCount };
    }))

    setGalleryData(items);
  }

  useEffect(() => {
    fetchData();
  }, []);


  const checkLiked = (likes, userId) => {
    const userHasLiked = likes.includes(userId);
    return userHasLiked;
  };


  const toggleLike = async (productId) => {
    if (session) {
      const res = await axios.patch("/api/products/likes", {
        userId,
        productId,
      });
      setGalleryData((prev) =>
        prev.map((item) =>
          item._id == productId ? { ...item, liked: !item.liked } : item
        )
      );
      console.log("galleryData from toggle like", galleryData)
    } else {
      toast.info("Login to interact with page");
    }
  };


  return (
    <>
      <div className="flex justify-center">
        <Carousel />
      </div>
      <h1 className="text-center font-extrabold text-2xl pt-10 pb-10">
        Gallery
      </h1>

      <main class="py-4">
        <div class="px-4">
          <div class="block md:flex  md:-mx-2">
            {galleryData.map((item, index) => (
              <div key={index} class="w-full lg:w-1/4 md:mx-2 mb-4 md:mb-0">
                <div class="bg-white rounded-lg overflow-hidden shadow relative">
                  <div
                    className=" h-[30vh] overflow-hidden  "
                    onDoubleClick={() => {
                      toggleLike(item._id);
                    }}
                  >
                    <motion.img
                      key={item.category}
                      src={item.photo}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                      }}
                    />

                    <div className="pp flex-initial overflow-hidden border-white border-[2px] top-1 bg-black text-white w-12 text-center h-12 m-1 rounded-full absolute bottom-0">
                      <img
                        src={item.photo || "/a1.png"}
                        width={50}
                        height={50}
                      />
                    </div>

                    <div className="pp flex flex-col overflow-hidden top-1 right-1  p-1 m-1  absolute justify-center items-center ">
                      {item.liked ? <BsHeartFill fill="red" /> : <BsHeart />}

                      <span className="text-sm font-sans ">
                        {item?.likesCount}
                      </span>
                    </div>
                  </div>

                  <div class="p-4 h-auto md:h-40 lg:h-48">
                    <a
                      href="#"
                      class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg"
                    >
                      {item.name}
                    </a>
                    <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                      {item.description}
                    </div>
                    <div class="relative mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block">
                      <a
                        class="inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700"
                        href="#"
                      >
                        #forest
                      </a>
                      <a
                        class="inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700"
                        href="#"
                      >
                        #walk
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
