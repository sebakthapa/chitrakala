"use client"
import React, { useState, useEffect, Fragment } from "react";
import { motion } from "framer-motion";
import { BsCalendar } from "react-icons/bs";
import { BiSolidMap } from "react-icons/bi";
import { Dialog, Transition } from '@headlessui/react';
import Image from "next/image";
import moment from "moment";
const Exhibition = () => {
  const [exhibition, setExhibition] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for controlling dialog for each item
  const [isOpen, setIsOpen] = useState([]);

  function closeModal(index) {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = false;
    setIsOpen(newIsOpen);
  }

  function openModal(index) {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = true;
    setIsOpen(newIsOpen);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/exhibition');
      const data = await response.json();
      setExhibition(data);
      setLoading(false);
      // Initialize isOpen state based on the number of items in the exhibition array
      setIsOpen(new Array(data.length).fill(false));
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="mainHead font-serif p-5 mb-5 bg-white w-full">Exhibition
        <p className="text-sm xxs:text-base sm:text-[1.08rem] leading-relaxed text-gray-700 antialiased py-5">
          Explore a captivating journey through artistry and innovation at our exhibition showcase.
        </p>
      </h1>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        exhibition.length > 0 ? (
          <div className="block sm:flex md:-mx-2">
            {exhibition.map((item, index) => (
              <div key={index} className=" w-full sm:max-w-[400px] flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => openModal(index)}
                  className="sm:mx-5 flex flex-col"
                >
                  <div className="w-full ">

                    <Image className=" object-cover" src={item?.photo} width={300} height={200} />
                  </div>

                  <div className="flex justify-between w-full font-bold text-sm ">
                    <span >
                      <p className=" line-clamp-1">
                        {item?.title}

                      </p>

                    </span>

                    <span className={getStatusClassName(item?.openDate, item?.closeDate)}>
                      {getStatusText(item?.openDate, item?.closeDate)}
                    </span>
                  </div>

                </button>

                <Transition appear show={isOpen[index]} as={Fragment} key={index}>
                  <Dialog as="div" className="relative z-10" onClose={() => closeModal(index)}>
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
                            <div className="w-full ">

                              <Image className=" object-cover w-full" src={item?.photo} width={300} height={200} />
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
                               <BiSolidMap/> {item?.location}
                              </p>
                            </div>
                            <div className="mt-2 flex justify-between">
                              <p className="text-sm text-gray-500">
                                {moment(item?.openDate).calendar()}-{moment(item?.closeDate).calendar()}
                              </p>
                              <p>
                              <span className={getStatusClassName(item?.openDate, item?.closeDate)}>
                      {getStatusText(item?.openDate, item?.closeDate)}
                    </span>
                              </p>
                            </div>

                            <div className="mt-4">
                              <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={() => { closeModal(index) }}
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
          </div>
        ) : (
          <div className="container">Oops, Nothing to show.</div>
        )
      )}
    </>
  );
};

export default Exhibition;

const getStatusText = (openDatetime, closeDatetime) => {
  const now = moment();
  const openDate = moment(openDatetime);
  const closeDate = moment(closeDatetime);

  if (closeDate.isBefore(now, 'time')) {
    return 'Closed';
  } else if (openDate.isSameOrBefore(now, 'time') && closeDate.isSameOrAfter(now, 'time')) {
    return 'Opened';
  } else {
    return 'Coming';
  }
};

// Helper function to get the dynamic className based on open and close datetime
const getStatusClassName = (openDatetime, closeDatetime) => {
  const now = moment();
  const openDate = moment(openDatetime);
  const closeDate = moment(closeDatetime);

  if (closeDate.isBefore(now, 'time')) {
    return 'text-red-800 text-xs rounded-full p-1';
  } else if (openDate.isSameOrBefore(now, 'time') && closeDate.isSameOrAfter(now, 'time')) {
    return 'text-green-800 text-xs rounded-full p-1';
  } else {
    return 'text-blue-800 text-xs rounded-full p-1';
  }
};