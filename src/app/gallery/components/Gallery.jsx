"use client"
import React, { useEffect, useState, useMemo,useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ArtCard from "@/components/ArtCard";
import { addGalleryData } from "@/redux/features/gallerySlice";
import { useSearchParams } from "next/navigation";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Gallery = () => {
    const searchParams = useSearchParams();
    const username = searchParams.get('username');
    const limit = searchParams.get('limit');
    const filter = searchParams.get('filter');
    const category = searchParams.get('category');
    
    let query = "";

    if (username) { query += `&username=${username}`; }
    if (filter) { query += `&filter=${filter}`; } else { query += '&filter=likesD&limit=10'; }
    if (category) { query += `&category=${category}`; }
    if (limit) { query += `&limit=${limit}`; }

    const dispatch = useDispatch();
    const galleryData = useSelector(state => state.gallery);
    const [filterParams, setFilterParams] = useState(filter||"newD");
    const [filteredData, setFilteredData] = useState([]);
    const [sortedData, setSortedData] = useState([]);

    async function fetchData() {
        try {
            const res = await axios.get(`/api/products?${query}`);

            if (res.status === 200) {
                // dispatch(addGalleryData(res.data));
                setFilteredData(res.data)
                
            }
           

        }
        catch (error) {
            throw error;
        }
    }


    useEffect(() => {
        fetchData();
    }, []);




    useEffect(()=>{

      async function fetchSortedData() {
        try {
            const res = await axios.get(`/api/products?filter=${filterParams}`);
            
            if (res.status === 200) {
                // dispatch(addGalleryData(res.data));
                // setSortedData(res.data)
                setSortedData(null)
                setSortedData(res.data)
                
                
            }
        }
        catch (error) {
            throw error;
        }
    }

     fetchSortedData();


    },[filterParams])

    return (
        <>
          {filteredData.length>0 ? (
            <div className="myScroll pb-10 flex overflow-x-auto">
              {filteredData?.map((item, index) => <ArtCard key={index} item={item} />)}
            </div>
          ) : (
            <Skeleton  containerClassName="h-[2rem] w-full" count={3} />
          )}
          <h2 className="mb-4 text-center text-2xl text-gray-900 font-bold md:text-4xl">Explore</h2>
      
          <label htmlFor="filter" className="text-gray-400 font-bold text-xs">Sort</label>
          <div id="filter" className=" flex items-center gap-3">
            <select onChange={(e) => { setFilterParams(e.target.value) }} id="status" className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm " value={filterParams}>
              <option className="text-gray-700 block px-4 py-2 text-sm " value="newD">Added Newest</option>
              <option className="text-gray-700 block px-4 py-2 text-sm " value={"likesD"}>Likes</option>
              <option className="text-gray-700 block px-4 py-2 text-sm " value={"priceD"}>Price</option>
            </select>
          </div>
      
          {sortedData.length>0 ? (
            <div className="myScroll pb-10 flex overflow-x-auto">
                    {sortedData?.map((item,index) => <ArtCard key={index} item={item} />)  }

            </div>
          ) : (
            <Skeleton containerClassName="h-[2rem] w-full" count={3} />
          )}
        </>
      );
      
}

export default Gallery;
