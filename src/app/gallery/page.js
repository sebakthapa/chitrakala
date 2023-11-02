"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Carousel from "@/components/Carousel";
import { useDispatch, useSelector } from "react-redux";
import ArtCard from "@/components/ArtCard";
import { addGalleryData } from "@/redux/features/gallerySlice";


const Page = () => {
  const dispatch = useDispatch();
  const galleryData = useSelector(state => state.gallery)

  const user = useSelector((state) => state.user);


  async function fetchData() {
    try {
      const res = await axios.get("/api/products");
      // const items = await Promise.all(res.data.map(item => {
      //   const liked = checkLiked(item.likes, userId);
      //   const likesCount = item.likes.length;
      //   return { ...item, liked, likesCount };
      // }))

      if (res.status == 200) {
        dispatch(addGalleryData(res.data));
      }

    } catch (error) {
      throw error
    }

  }
  useEffect(() => {

    // console.log("GALLERY USEEFFECT RAN")

    fetchData();
  }, []);


  return (
    <>
      <div className="flex justify-center">
        <Carousel />
      </div>
      <h1 className="text-center font-extrabold text-2xl pt-10 pb-10">
        Gallery
      </h1>

      <main className="py-4">
        <div className="px-4">
          <div className="block md:flex  md:-mx-2">

            {
              galleryData?.length > 0 && galleryData?.map((item, index) => {

                return <ArtCard key={index} item={item} />
              }
              )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;