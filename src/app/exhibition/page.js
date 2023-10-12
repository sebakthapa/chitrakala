"use client"
import React,{ useState,useEffect } from "react";
import Carousel from "@/components/Carousel";
import { motion } from "framer-motion";
import Image from "next/image";
const page = () => {
  const [exhibition,setExhibition] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/exhibition');
      const data = await response.json();
      setExhibition(data); 
    }
    fetchData();
  }, []);


  return (
    <>
      <div className="bg-[#f4f4f4] flex  m-5 justify-center items-center overflow-hidden ">
        <div className="w-screen sm:w-1/2 m-10">
          <Carousel />
        </div>
      </div>

      <div className="cardProduct flex">
                <div className="cards flex flex-wrap bg-[#f4f4f4] m-5">
              {exhibition.map(( item,index )=>(

                    <div key={index}  className="card m-5  relative max-w-[20rem] max-h-[25rem] overflow-hidden  shadow-lg">
                        <div className="cover overflow-hidden h-[15rem]   ">

                            <motion.img
                                key={index}
                                src={item.photo}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            />


                        </div>
                        <div className="desc pt-5 h-[10rem]  bg-white overflow-hidden flex flex-col justify-center items-center">
                            <h4 className="font-bold text-xs  flex">{item.location}  {item.datetime.split('T')[0]} </h4>
                            <h1 className=" font-bold text-2xl p-2 break-all text-center hover:underline transition-all">{item.title}<br/></h1>
                            <h4 className="p-2 font-bold text-gray-600 text-sm text-center" >{item.description}</h4>
                        </div>
                    </div>
                    
              ))}
            

                </div>
            </div>

    
    </>
  );
};

export default page;
