"use client"
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ArtCard from "@/components/ArtCard";
import { addGalleryData } from "@/redux/features/gallerySlice";
import { useSearchParams } from "next/navigation";
import { BsFilterCircleFill } from "react-icons/bs";

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
    const [wholeData, setWholeData] = useState([]);
    const [filterData, setFilterData] = useState(filter || "newD");

    async function fetchData() {
        try {
            const res = await axios.get(`/api/products?${query}`);
            const res1 = await axios.get(`/api/products`);
            if (res.status === 200) {
                dispatch(addGalleryData(res.data));
            }
            if (res1.status === 200) {
                setWholeData(res1.data);
            }
        }
        catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const sortedData = useMemo(() => {
        let dataToSort = [...wholeData];

        if (filterData === "newD") {
            dataToSort = dataToSort.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        else if (filterData === "likesD") {
            dataToSort = dataToSort.sort((a, b) => b.likes.length - a.likes.length);
        }
        else if (filterData === "priceD") {
            dataToSort = dataToSort.sort((a, b) => b.price - a.price);
        }

        return dataToSort;
    }, [filterData, wholeData]);

    return (
        <>
            <div className="myScroll pb-10 flex overflow-x-auto">
                {galleryData?.map((item, index) => <ArtCard key={index} item={item} />)}
            </div>
            <h2 className="mb-4 text-center text-2xl text-gray-900 font-bold md:text-4xl">Explore</h2>


            <label htmlFor="filter" className="text-gray-400 font-bold text-xs">Sort</label>
            <div id="filter" className=" flex items-center gap-3">
          
                <select onChange={(e) => { setFilterData(e.target.value) }} id="status" className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm " value={filterData}>
                    <option className=" text-gray-700 block px-4 py-2 text-sm " value="newD">Added Newest</option>
                    <option className="text-gray-700 block px-4 py-2 text-sm " value={"likesD"}>Likes</option>
                    <option className="text-gray-700 block px-4 py-2 text-sm " value={"priceD"}>Price</option>
                </select>
            </div>

            <div className="myScroll pb-10 flex overflow-x-auto">
                {sortedData?.map((item, index) => <ArtCard key={index} item={item} />)}
            </div>
        </>
    )
}

export default Gallery;
