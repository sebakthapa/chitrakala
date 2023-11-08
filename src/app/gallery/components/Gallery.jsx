"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ArtCard from "@/components/ArtCard";
import { addGalleryData } from "@/redux/features/gallerySlice";
import { useSearchParams } from "next/navigation";

const Gallery = () => {
    const searchParams = useSearchParams()
    const username = searchParams.get('username') ;
    const limit = searchParams.get('limit') ;
    const filter = searchParams.get('filter');
    const category = searchParams.get('category');
    let query = ""
 
    if(username){query+=`&username=${username}`;}
    if(filter){query+=`&filter=${filter}`;}
    if(category){query+=`&category=${category}`;}
    if(limit){query+=`&limit=${limit}`;}



    
    const dispatch = useDispatch();
    const [wholeGalleryData,setWholeGalleryData] = useState()
    const galleryData = useSelector(state => state.gallery)

    const user = useSelector((state) => state.user);


    async function fetchData() {
        try {
            console.log(query)
            const res = await axios.get(`/api/products?${query}`);
            const res1 = await axios.get(`/api/products?limit=20`);
            if (res.status == 200) {
                dispatch(addGalleryData(res1.data));
            }
            if (res1.status == 200) {
                setWholeGalleryData(res.data);
            }
        }
        catch (error) {
            throw error
        }
    }
    useEffect(() => {

        fetchData();
    }, []);
    return (
        <>
            <div className="myScroll pb-10  flex overflow-x-auto">

                {
                    wholeGalleryData?.length > 0 && wholeGalleryData?.map((item, index) => <ArtCard key={index} item={item} />

                    )}
            </div>
            <div className=" myScroll pb-10  flex overflow-x-auto">

                {
                    galleryData?.length > 0 && galleryData?.map((item, index) => <ArtCard key={index} item={item} />

                    )}
            </div>


        </>
    )
}

export default Gallery