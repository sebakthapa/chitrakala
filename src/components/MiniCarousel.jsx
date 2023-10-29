"use client"
import React, { useState } from 'react'
import { BsFillCaretRightFill, BsFillCaretLeftFill } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';

const MiniCarousel = () => {
  const images = [
    "https://w0.peakpx.com/wallpaper/409/718/HD-wallpaper-pencil-drawing-lionel-messi-football-player-sketch-art.jpg",
    "https://artist.com/photos/arts/extra-big/autumn-walk-1800329209.jpg",
    "https://i.etsystatic.com/5312870/r/il/300ef0/1185533356/il_570xN.1185533356_i5n8.jpg"
  ];
  // console.log(images)

  const [index, setIndex] = useState(0);
  const changePic = () => {
    setIndex((oldIndex) => (oldIndex === images.length - 1 ? 0 : oldIndex + 1))
  }


  return (
    <>


      <div className="relative flex w-full max-w-full  flex-col rounded-xl  text-gray-700 shadow-sm">
        <div className="relative mx-4 mt-4 overflow-hidden rounded-xl  text-white ">
         <div className='cover flex justify-center  h-[30rem] '>
            <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              className='rounded-lg'
              
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, }}
              exit={{ opacity: 0 }}
              />
          </AnimatePresence>
              </div>
          <button type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev onClick={()=>changePic(-1)}>
          
          <span className=' bg-black p-2 rounded-full'  > <BsFillCaretLeftFill fill='white'/> </span>
            
        </button>
        <button type="button" onClick={()=>changePic(1)} className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>
 
        <span  className=' bg-black p-2 rounded-full' > <BsFillCaretRightFill fill='white' /> </span>

           
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