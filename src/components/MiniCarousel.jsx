"use client"
import React, { useState } from 'react'
import { BsFillCaretRightFill, BsFillCaretLeftFill } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';

const MiniCarousel = ({images}) => {


  const [index, setIndex] = useState(0);
  const changePic = () => {
    setIndex((oldIndex) => (oldIndex === images.length - 1 ? 0 : oldIndex + 1))
  }
  return (
    <>
      <div className="relative border-2 h-[450px] p-2 flex w-full   flex-col rounded-xl  text-gray-700 shadow-sm">
        <div className="relative overflow-hidden rounded-xl  text-white h-full">
          <div className='cover flex justify-center items-center h-full '>
            <AnimatePresence mode="wait">
              <motion.img
                key={images[index]}
                src={images[index]}
                className='rounded-lg object-cover h-full w-'
                loading='lazy'

                initial={{ opacity: 0 }}
                animate={{ opacity: 1, }}
                exit={{ opacity: 0 }}
              />
            </AnimatePresence>
          </div>
          <button type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev onClick={() => changePic(-1)}>

            <span className=' bg-black p-2 rounded-full'  > <BsFillCaretLeftFill fill='white' /> </span>

          </button>
          <button type="button" onClick={() => changePic(1)} className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>

            <span className=' bg-black p-2 rounded-full' > <BsFillCaretRightFill fill='white' /> </span>


          </button>


        </div>

      </div>


      {/* <section className="flex items-center justify-center gap-4 flex-col ">
        
        <AnimatePresence mode="wait">
                <motion.img
                key={images[index]}
                src={images[index]}
                
                initial={{ opacity: 0 }}
                animate={{ opacity: 1,}}
                exit={{ opacity: 0 }}
                />
          </AnimatePresence>

          <div className='flex justify-betweeen '>

                <div  onClick={()=>changePic(-1)}> <BsFillCaretLeftFill/> </div>
                <div>Trending</div>
                <div onClick={()=>changePic(1)} ><BsFillCaretRightFill/></div>
          </div>
        
    </section> */}
    </>
  )
}

export default MiniCarousel