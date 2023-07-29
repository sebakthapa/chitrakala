import React from 'react'
import { BsArrowRightShort, BsArrowsAngleExpand, BsBackspace, BsBagXFill, BsFacebook, BsInstagram, BsPinterest } from "react-icons/bs";

function Navbar() {
  return (
    <nav className='flex overflow-hidden flex-wrap justify-between h-[150px] bg-[#22385c] text-[#fefffc] p-5' >
    <div className="flex-1 brand">
      <span className='saman text-xl text-neutral-300 font-semibold'>CHITRAKALA</span>
    </div>


    <div className=' mt-7  flex flex-1 items-center justify-end h-full flex-col '>
      <div className="saman logo text-6xl font-extrabold text-center"> CHITRAKALA</div>
      <div className='link flex  gap-5 m-3 text-neutral-300'>
        <li>Home</li>
        <li>Product</li>
        <li>About</li>
        <li>Home</li>
        <li>Product</li>
        <li>About</li>
      </div>
    </div>

    <div className=" flex-1 text-neutral-400 flex-col items-end flex justify-start gap-[3rem] ">
      <div className="handlers text-neutral-300 pt-0  flex gap-5 text-[12px] ">
        <li><BsFacebook /></li>
        <li><BsPinterest /></li>
        <li><BsInstagram /></li>
        <li><BsBagXFill/></li>
        <li><BsArrowRightShort/></li>
      </div>

      <div className="">
        <input className='p-2 rounded-sm outline-none' type="text" name="search" id="search" placeholder='Search...' />
      </div>


    </div>

  </nav>
  )
}

export default Navbar