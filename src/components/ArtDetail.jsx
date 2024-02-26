"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import ArtCard from "./ArtCard";
import { formatNumberWithLetter } from "../../utils/utils";
import { BsAppIndicator } from "react-icons/bs";
import LoadingComponent from "./LoadingComponent";
const ArtDetail = ({ artdata, status }) => {
  const [relatedartData, setRelatedArtData] = useState();
  const [loading, setLoading] = useState(true);

  const [artistArtData, setArtistArtData] = useState();

  const fetchArtistArtData = async (userId) => {
    try {
      if (userId) {
        const res = await fetch(`/api/products/user/${userId}`);
        if (res.status === 200) {
          const data = await res.json();
          setArtistArtData(data);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  async function fetchData() {
    try {
      const res = await fetch(`/api/products?limit=5`);

      if (res.status == 200) {
        const { data } = await res.json();
        setRelatedArtData(data);
      }
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    const fetchDataAndLoading = async () => {
      try {
        // Using Promise.all to await both fetch operations
        await Promise.all([
          fetchData(),
          fetchArtistArtData(artdata?.artist?.user?._id),
        ]);
      } finally {
        // Setting loading to false when both fetch operations are completed
        setLoading(false);
      }
    };

    fetchDataAndLoading();
  }, [artdata]);

  if (loading || status) {
    return <LoadingComponent />;
  }

  return (
    <>
      <div className="flex flex-wrap mt-10">
        <div className="w-full md:w-[70%] p-4">
          {/* Content for the first div */}
          <section className=" flex flex-col justify-between  bg-white max-h-[150vh] md:h-[150vh]  ">
            <h5 className="mb-2 p-5 text-2xl font-bold tracking-tight text-gray-900 ">
              {artdata?.name}
            </h5>
            <div className="items-stretch flex-1 overflow-hidden flex item justify-center">
              <Image
                className="w-full  h-full object-cover cursor-pointer"
                src={artdata?.photo}
                height={1080}
                width={1080}
                alt=""
                onClick={() => window.open(artdata?.photo, "_blank")}
                title="Click to open in a new tab"
              />
            </div>
            <div className="  flex flex-col w-full justify-between p-4 leading-normal">
              <p className="mb-3 font-normal text-gray-700 ">
                {artdata?.description}
              </p>

              <ul role="list" className="divide-y divide-gray-200 ">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <Link
                      href="/artist/[artistId]"
                      as={`/artist/${artdata?.artist?.user?._id}`}
                      className="flex-shrink-0"
                    >
                      <AnimatePresence mode="wait">
                        <motion.img
                          className="w-10 h-10 rounded-full border-2 border-gray-300"
                          src={artdata?.artist?.image}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      </AnimatePresence>
                    </Link>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate ">
                        {artdata?.artist?.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate ">
                        @{artdata?.artist?.user?.username}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                      <span className="text-sm w-fit font-semibold text-gray-800 darkk:text-white">
                        {artdata?.price ? (
                          `Rs ${formatNumberWithLetter(artdata?.price)}`
                        ) : (
                          <span className=" bg-lime-600  p-1 px-2 rounded-full text-xs">
                            Showcase
                          </span>
                        )}
                        {/* {artData.category} */}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="text-xs  text-gray-500 flex justify-between">
                <div className="flex gap-5">
                  <div>
                    <span>Likes: </span>
                    <span>{artdata?.likes?.length} </span>
                  </div>
                  <div>
                    <span>Category: </span>
                    <span className=" capitalize ">{artdata?.category} </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs flex items-center gap-2 text-gray-400">
                    <BsAppIndicator />{" "}
                    {artdata?.createdAt && moment(artdata?.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="w-full md:w-[30%] p-4 flex-shrink-0">
          {/* Content for the second div */}
          <section className="flex-grow   overflow-scroll  p-5  flex flex-col   bg-white md:h-[150vh]  ">
            <h1 className="subHead  font-serif  bg-white ">
              Related arts
              <p className=" text-sm xxs:text-base  sm:text-[1.08rem]  leading-relaxed text-gray-700 antialiased py-5">
                Discover similar artworks from artists you like.
              </p>
            </h1>
            <div className="  myScroll gap-5 overflow-scroll  w-full flex md:block ">
              {relatedartData?.length > 0 &&
                relatedartData?.map((item, index) => {
                  return <ArtCard key={index} item={item} />;
                })}
            </div>
          </section>
        </div>

        <div className="w-full p-4">
          {/* Content for the second row */}
          <section className="my-10 p-5 flex flex-col bg-white sm:w-full">
            <h1 className="subHead font-serif bg-white py-5">
              More from {artdata?.artist?.name}
            </h1>
            <div className="myScroll gap-5 overflow-x-scroll overflow-y-auto w-full flex ">
              {artistArtData?.length > 0 &&
                artistArtData?.map((item, index) => (
                  <ArtCard key={index} item={item} />
                ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ArtDetail;
