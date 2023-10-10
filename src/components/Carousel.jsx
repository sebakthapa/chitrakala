"use client"
import React, { useState } from 'react'
import { BsFillCaretRightFill,BsFillCaretLeftFill } from 'react-icons/bs';
import { AnimatePresence,motion } from 'framer-motion';

const Carousel = () => {
    const images = [
        "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
        "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
        "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png"
      ];
      console.log(images)

      const [index,setIndex] = useState(0);
      const changePic = () =>{
        setIndex((oldIndex)=> (oldIndex === images.length -1 ? 0 : oldIndex + 1))
      }

      
  return (
    <>
    <section className="flex items-center justify-center gap-4 flex-col ">
        
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
        
    </section>
    </>
  )
}

export default Carousel