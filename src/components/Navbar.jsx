import React from 'react'
import { BsArrowRightShort, BsArrowsAngleExpand, BsBackspace, BsBagXFill, BsFacebook, BsInstagram, BsPinterest } from "react-icons/bs";

function Navbar() {
  return (
    <nav className='border-[1px] lg:border-none border-b-[#556f5f] z-1 flex overflow-hidden flex-col gap-[1.5rem] min-h-[200px] h-[100px] bg-[#e5eee9] text-[#232323] p-5' >
      <div className=" flex justify-between brand">
        <span className='saman text-xl text-[#556f5f] font-semibold'>CHITRAKALA</span>
       
        <div className="handlers text-[#556f5f] pt-0  flex gap-5 text-base ">
          <li><BsFacebook /></li>
          <li><BsPinterest /></li>
          <li><BsInstagram /></li>
          <li><BsBagXFill /></li>
          <li><BsArrowRightShort /></li>
        </div>

      </div>


      <div className='  flex  items-center justify-center h-full flex-col '>
        <div className="saman logo text-6xl font-extrabold text-center"> CHITRAKALA</div>
        <div className='link flex  gap-5 m-3 text-neutral-300'>
          <li>Home</li>
          <li>Product</li>
          <li>About</li>
          <li>Artist</li>

        </div>
      </div>
<div className='flex justify-end'>

      <input className='min-w-[100px] p-1 rounded-sm outline-none' type="text" name="search" id="search" placeholder='Search...' />
</div>
 
    </nav>
  )
}

export default Navbar