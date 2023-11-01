"use client"
import React, { useState } from 'react'
import { BsFillCaretRightFill, BsFillCaretLeftFill } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';

const Carousel = () => {
  const images = [
    "https://w0.peakpx.com/wallpaper/409/718/HD-wallpaper-pencil-drawing-lionel-messi-football-player-sketch-art.jpg",
    "https://artist.com/photos/arts/extra-big/autumn-walk-1800329209.jpg",
    "https://i.etsystatic.com/5312870/r/il/300ef0/1185533356/il_570xN.1185533356_i5n8.jpg"
  ];

  const [index, setIndex] = useState(0);
  const changePic = () => {
    setIndex((oldIndex) => (oldIndex === images.length - 1 ? 0 : oldIndex + 1))
  }


  return (
    <>


      <div className="relative flex w-full max-w-full  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
        <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white ">
         <div className='cover flex justify-center  h-[30rem]'>
            <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, }}
              exit={{ opacity: 0 }}
              />
          </AnimatePresence>
              </div>
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
          <button type="button" className=" flex absolute top-0 left-0  justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev onClick={()=>changePic(-1)}>
          
          <span className=' bg-black p-2 rounded-full'  > <BsFillCaretLeftFill fill='white'/> </span>
            
        </button>
        <button type="button" onClick={()=>changePic(1)} className=" flex absolute top-0 right-0 z justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>
 
        <span  className=' bg-black p-2 rounded-full' > <BsFillCaretRightFill fill='white' /> </span>

           
        </button>


        </div>
        <div className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
              Wooden House, Florida
            </h5>
            <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="-mt-0.5 h-5 w-5 text-yellow-700"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              5.0
            </p>
          </div>
          <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
            Enter a freshly updated and thoughtfully furnished peaceful home
            surrounded by ancient trees, stone walls, and open meadows.
          </p>
          <div className="group mt-8 inline-flex flex-wrap items-center gap-3">

            <span
              data-tooltip-target="more"
              className="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
            >

              #tag
            </span>

          </div>
        </div>
        <div className="p-6 pt-3 flex justify-center">
          <button
            className=" w-full block md:w-40 select-none rounded-lg bg-pink-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-light="true"
          >
            Checkout
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

export default Carousel