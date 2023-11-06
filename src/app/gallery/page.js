"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ArtCard from "@/components/ArtCard";
import { addGalleryData } from "@/redux/features/gallerySlice";


const Page = () => {
  const dispatch = useDispatch();
  const galleryData = useSelector(state => state.gallery)



  async function fetchData() {
    try {
      const res = await axios.get("/api/products");
      const galleryData = res.data;
      if (res.status == 200) {
        dispatch(addGalleryData(galleryData));
        return galleryData
      }

    } catch (error) {
      throw error
    }

  }
  useEffect(() => {

    fetchData();
  }, []);




  return (
    <>
  
      <h1 className="text-center font-extrabold text-2xl pt-10 pb-10">
        Gallery
      </h1>

      <main className="py-4">
        <div className="px-4">
          <div className="myScroll pb-10  flex overflow-x-auto">

            {
              galleryData?.length > 0 && galleryData?.map((item, index) =>  <ArtCard key={index} item={item} />
              
              )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
