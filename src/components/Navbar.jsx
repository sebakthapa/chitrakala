"use client"
import Link from 'next/link';
import React from 'react'
import { BsArrowRightShort, BsArrowsAngleExpand, BsBackspace, BsBagXFill, BsFacebook, BsInstagram, BsPinterest } from "react-icons/bs";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RiLogoutCircleRLine } from "react-icons/ri"
import { logout } from '@/redux/features/userSlice';

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  console.log(user)
  return (
    <nav className='border-[1px] lg:border-none border-b-[#556f5f] z-1 flex overflow-hidden flex-col gap-[1.5rem] min-h-[200px] h-[100px] bg-[#e5eee9] text-[#232323] p-5' >
      <div className=" flex justify-between brand">
        <span className='saman text-xl text-[#556f5f] font-semibold'>CHITRAKALA</span>



        {
          user?.uid ? (
            <motion.button onClick={() => dispatch(logout())} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 200, damping: 10 }} className='text-gray-100 bg-red-600 border-2 border-red-600 rounded py-[0.4rem] px-5 '>
                Log Out
                {/* <RiLogoutCircleRLine className='text-gray-100' /> */}
            </motion.button>
          ) : (
            <div className="handlers text-[#556f5f] pt-0  flex gap-5 text-base ">
              {/* <li><BsFacebook /></li>
            <li><BsPinterest /></li>
            <li><BsInstagram /></li>
            <li><BsBagXFill /></li>
            <li><BsArrowRightShort /></li> */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className=' border-2 border-gray-500 rounded'>
                <Link className='inline-block text-gray-600 py-[0.4rem] px-5 ' href="/auth/l">Log In</Link>
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 200, damping: 10 }} className='bg-gray-900 border-2 border-gray-900 rounded'>
                <Link className='inline-block text-gray-200 py-[0.4rem] px-5 ' href="/auth/s">Sign Up</Link>
              </motion.button>

            </div>
          )

        }


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