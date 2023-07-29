import React from 'react'
import Navbar from './Navbar';
import { BsBagXFill, BsFacebook, BsInstagram, BsPen, BsPenFill, BsPencilFill, BsPinterest } from "react-icons/bs";

function Landing() {
    return (
        <>
            <Navbar />

            <div className='flex flex-col items-center bg-gradient-to-l  from-red-500 to-orange-500 '>

                <div className='w-[40%]  gap-8 p-3 flex justify-center items-center border-2 bg-[#ffffff] padding '>
                    <li>Hot</li>
                    <li>Trending</li>
                    <li>Home</li>
                    <li>Creator</li>
                    <li>About</li>
                    <div className='flex gap-3'>

                        <li><BsPinterest/></li>
                        <li><BsFacebook/></li>
                        <li><BsInstagram/></li>
                    </div>
                
                </div>
               <div>
                
               </div>
            </div>
        </>
    )
}

export default Landing