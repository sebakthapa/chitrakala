"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "framer-motion";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import Image from "next/image";
import ContentLoader from "react-content-loader";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      y: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    y: 0,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      y: 0,
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
  const [isLoading, setIsLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/products?sort=likesD");
      const { data } = await response.json();
      const descriptionsArray = data.map((item) => item.description || "");
      setImages(data);
      setDescriptions(descriptionsArray);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setIsLoading(false);
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
    <div className="overflow-hidden w-full flex justify-center items-center flex-col">
      {isLoading ? ( // Render loader only while loading
        <CarouselLoader />
      ) : (
        <div className="w-screen sm:max-w-[50rem] relative h-screen max-h-[400px] xs:max-h-[600px]">
          <div
            className="absolute top-1/2 -translate-y-1/2 p-3 h-fit rounded-full bg-[rgba(0,0,0,.4)] bottom-0 ml-10 flex justify-center items-center cursor-pointer z-50"
            onClick={() => paginate(-1)}
          >
            <BiSolidLeftArrow fill="#fefefe" />
          </div>
          <AnimatePresence>
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
                opacity: { duration: 0.7 },
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
                className="h-full max-w-full object-cover pointer-events-none"
                src={images[imageIndex]?.photo}
                alt="Artwork image"
                height={2000}
                width={2000}
              />
              <div className="overlay absolute bottom-0 left-0 h-[20%] w-full bg-gradient-to-t from-[rgba(0,0,0,.8)] to-transparent">
                <div className="text-center absolute left-[25%] w-1/2 py-3 px-2 bottom-0 mt-5 text-gray-200 font-medium font-sans text-lg">
                  <p className="text-base font-normal pb-2">
                    {" "}
                    {images[imageIndex]?.name}{" "}
                  </p>
                  <p className="text-xs w-full font-extralight pb-2 truncate">
                    {" "}
                    {images[imageIndex]?.description}{" "}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div
            className="absolute z-50 bg-[rgba(0,0,0,.4)] h-fit mr-10 top-1/2 -translate-y-1/2 p-3 rounded-full bottom-0 right-0 flex justify-center items-center cursor-pointer"
            onClick={() => paginate(1)}
          >
            <BiSolidRightArrow fill="#fefefe" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCarousel;

const CarouselLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={460}
      titel={"Image is loading 📷..."}
      viewBox="0 0 400 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="24" cy="438" r="15" />
      <rect x="51" y="425" rx="2" ry="2" width="140" height="10" />
      <rect x="51" y="441" rx="2" ry="2" width="140" height="10" />
      <rect x="3" y="8" rx="2" ry="2" width="400" height="400" />
    </ContentLoader>
  );
};
