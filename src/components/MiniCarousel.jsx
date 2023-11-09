"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "framer-motion";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
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
      const imagesArray = data.map((item) => item.photo || '');
      const descriptionsArray = data.map((item) => item.description || ''); // Adjust the field name accordingly
      setImages(imagesArray);
      setDescriptions(descriptionsArray);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <div className="relative md:w-1/2 flex justify-center flex-col">
        <h1 className="font-semibold font-poppins text-3xl p-5 text-center mt-5">Featured Product</h1>
        <div className="p-5 relative h-auto">
          <div className="absolute top-0 bottom-0 left-0 flex justify-center items-center  cursor-pointer" onClick={() => paginate(-1)}>
            <BiSolidLeftArrow fill="#475569" />
          </div>
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={page}
              src={images[imageIndex]}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className=""
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
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
            />
          <div className="text-center ">{descriptions[imageIndex]}</div>
          </AnimatePresence>

          <div className="absolute  top-0 bottom-0 right-0 flex justify-center items-center  cursor-pointer" onClick={() => paginate(1)}>
            <BiSolidRightArrow fill="#475569" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MiniCarousel;
