"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "framer-motion";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      y: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    y: 0
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      y: 0
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const MiniCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/products?filter=likesD');
      const data = await response.json();
      // const imagesArray = ;
      const descriptionsArray = data.map((item) => item.description || ''); // Adjust the field name accordingly
      setImages(data);
      setDescriptions(descriptionsArray);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const tempImage = ["/landing/digital.jpg", "/landing/oil.jpg"]

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };



  return (
    <>
      <div className="relative  flex justify-center items-center flex-col p-5">
        <h1 className="font-semibold font-poppins text-3xl p-5 text-center mt-5 mb-8">Featured Product</h1>
        {
          (motion && images?.length > 0 && descriptions?.length > 0) ? (
            <div className=" w-screen max-w-[800px] overflow-hidden  relative  h-screen max-h-[400px] xs:max-h-[600px]">
              <div className="absolute  top-1/2 -translate-y-1/2 p-3 h-fit rounded-full  bg-[rgba(0,0,0,.4)]  bottom-0 left-0 flex justify-center items-center  cursor-pointer z-50" onClick={() => paginate(-1)}>
                <BiSolidLeftArrow fill="#fefefe" />
              </div>
              <AnimatePresence >
                <motion.div
                  className="imageContainer absolute h-full w-full "
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: .7 },
                  }}

                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                >

                  <Image
                    loading="lazy"
                    className="h-full w-full object-cover pointer-events-none"
                    src={images[imageIndex]?.photo}
                    alt="Artwork image"
                    height={500}
                    width={1000}
                  />
                  <div className="overlay absolute  bottom-0 left-0 h-[20%] w-full  bg-gradient-to-t from-[rgba(0,0,0,.8)] to-transparent">

                    <div className="text-center absolute    w-full py-3 px-2  bottom-0 left-0 mt-5 text-gray-200 font-medium font-sans  text-lg">
                      <p className="text-base font-normal pb-2"> {images[imageIndex].description}  </p>
                    </div>
                  </div>
                </motion.div>

              </AnimatePresence>

              <div className="absolute z-50  bg-[rgba(0,0,0,.4)] h-fit  top-1/2 -translate-y-1/2 p-3 rounded-full  bottom-0 right-0 flex justify-center items-center  cursor-pointer" onClick={() => paginate(1)}>
                <BiSolidRightArrow fill="#fefefe" />
              </div>
            </div>
          ) : (
            <div className="w-screen max-w-[800px] overflow-hidden  relative  h-screen max-h-[400px] xs:max-h-[600px]">
              <Skeleton height={400} width={300} containerClassName="m-5 shiny_effect flex-1 flex gap-2" count={4} />
            </div>
          )
        }

      </div >
    </>
  );
};

export default MiniCarousel;
