"use client";
import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BiSolidMap } from "react-icons/bi";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import ContentLoader from "react-content-loader";

const LatestExhibition = () => {
  const [exhibitions, setExhibitions] = useState([]);
  let [isOpen, setIsOpen] = useState([]);
  const [loading, setLoading] = useState(true);

  const closeModal = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = false;
    setIsOpen(newIsOpen);
  };

  const openModal = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = true;
    setIsOpen(newIsOpen);
  };
  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        // Fetch data from /api/exhibition
        const response = await fetch("/api/exhibition");
        const data = await response.json();

        // Filter exhibitions to show only the running ones
        const currentDate = new Date();
        const runningExhibitions = data.filter((exhibition) => {
          // console.log(new Date(exhibition.openDate), currentDate, new Date(exhibition.closeDate))
          return (
            new Date(exhibition.openDate) <= currentDate &&
            new Date(exhibition.closeDate) >= currentDate
          );
        });

        setExhibitions(runningExhibitions);
        setIsOpen(new Array(data.length).fill(false));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exhibitions:", error);
        setLoading(false);
      }
    };

    fetchExhibitions();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  return (
    <>
      <div className="sm:mx-5 p-5">
        {loading ? (
          <ExhibitionLoadingSkeleton />
        ) : exhibitions.length === 0 ? (
          <p>No exhibitions available</p>
        ) : (
          <>
            {/* Render your running exhibitions here */}
            {exhibitions.map((item, index) => (
              <div key={index} className="pb-3 sm:pb-4 ">
                <div
                  onClick={() => {
                    openModal(index);
                  }}
                  className="flex items-center space-x-4 rtl:space-x-reverse pb-3 sm:pb-4"
                >
                  <div className="flex-shrink-0">
                    <Image
                      height={400}
                      width={400}
                      className="w-20 h-20 rounded-full object-contain bg-slate-300"
                      src={item?.photo}
                      alt=" image"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium text-gray-900 truncate capitalize cursor-pointer hover:underline">
                      {item?.title}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2 dark:text-gray-400 cursor-pointer hover:underline">
                      {item?.description}
                    </p>
                  </div>
                  <p className="inline-flex items-center hover:underline text-xs font-semibold text-gray-900 cursor-pointer ">
                    Learn More
                  </p>
                </div>

                <Transition
                  appear
                  show={isOpen[index]}
                  as={Fragment}
                  key={index}
                >
                  <Dialog
                    as="div"
                    className="relative z-[1000]"
                    onClose={() => closeModal(index)}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <div className="w-full  ">
                              <Image
                                className=" object-cover w-full"
                                src={item?.photo}
                                width={300}
                                height={200}
                              />
                            </div>

                            <Dialog.Title
                              as="h3"
                              className="text-lg my-2 font-medium leading-6 text-gray-900"
                            >
                              {item?.title}
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                {item?.description}
                              </p>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500 flex items-center">
                                <BiSolidMap /> {item?.location}
                              </p>
                            </div>
                            <div className="mt-2 flex justify-between">
                              <p className="text-sm text-gray-500">
                                {moment(item?.openDate).calendar()}-
                                {moment().calendar()}
                              </p>
                              <p>
                                <span
                                  className={getStatusClassName(
                                    item?.openDate,
                                    item?.closeDate,
                                  )}
                                >
                                  {getStatusText(
                                    item?.openDate,
                                    item?.closeDate,
                                  )}
                                </span>
                              </p>
                            </div>

                            <div className="mt-4">
                              <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={() => {
                                  closeModal(index);
                                }}
                              >
                                Thanks!
                              </button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </div>
            ))}
            <div className="flex items-center justify-end space-x-4 rtl:space-x-reverse pb-3 sm:pb-4">
              <Link
                href="/exhibition"
                className="inline-flex items-center hover:underline text-xs font-bold text-gray-900 cursor-pointer gap-2 "
              >
                View All <FaArrowUpRightFromSquare />
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LatestExhibition;

const getStatusText = (openDatetime, closeDatetime) => {
  const now = moment();
  const openDate = moment(openDatetime);
  const closeDate = moment(closeDatetime);

  if (closeDate.isBefore(now, "time")) {
    return "Closed";
  } else if (
    openDate.isSameOrBefore(now, "time") &&
    closeDate.isSameOrAfter(now, "time")
  ) {
    return "Opened";
  } else {
    return "Coming";
  }
};

// Helper function to get the dynamic className based on open and close datetime
const getStatusClassName = (openDatetime, closeDatetime) => {
  const now = moment();
  const openDate = moment(openDatetime);
  const closeDate = moment(closeDatetime);

  if (closeDate.isBefore(now, "time")) {
    return "text-red-800 text-xs rounded-full p-1";
  } else if (
    openDate.isSameOrBefore(now, "time") &&
    closeDate.isSameOrAfter(now, "time")
  ) {
    return "text-green-800 text-xs rounded-full p-1";
  } else {
    return "text-blue-800 text-xs rounded-full p-1";
  }
};

const ExhibitionLoadingSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={100}
      viewBox="0 0 400 100"
      title="🖌️ Loading Notifications... 🔔"
      interval={0.4}
      backgroundColor="#eee"
      foregroundColor="#f9f9f9"
      gradientDirection="top-down"
    >
      <circle cx="39" cy="29" r="29" />
      <rect x="76" y="8" rx="2" ry="2" width="209" height="15" />
      <rect x="76" y="32" rx="2" ry="2" width="209" height="15" />
    </ContentLoader>
  );
};
