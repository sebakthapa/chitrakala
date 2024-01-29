import React from "react";

const Page = () => {
  return (
    <>
      <div className="bg-white sm:m-5 flex flex-col gap-5 md:flex-row">
        <div className="  flex-[1_1_70%]">
          <div>
            <h1 className="mainHead font-serif p-5 mb-5 bg-white w-full">
              Your Orders
              <p className="text-sm xxs:text-base sm:text-[1.08rem] leading-relaxed text-gray-700 antialiased py-5">
                Here are the order of yours
              </p>
            </h1>
            <div className="md:flex justify-between ">
              <ul
                role="list"
                class="p-5  divide-y divide-gray-200 flex-1 w-full"
              >
                <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-3 rtl:space-x-reverse">
                    <div class="flex-shrink-0">
                      <img
                        class="w-8 h-8 rounded-full"
                        src="/default-profile.png"
                        alt="Neil image"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-semibold text-gray-900 truncate ">
                        Neil Sims
                      </p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@flowbite.com
                      </p>
                    </div>
                    <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                      Completed
                    </span>
                  </div>
                </li>
                <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-3 rtl:space-x-reverse">
                    <div class="flex-shrink-0">
                      <img
                        class="w-8 h-8 rounded-full"
                        src="/default-profile.png"
                        alt="Neil image"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-semibold text-gray-900 truncate ">
                        Bonnie Green
                      </p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@flowbite.com
                      </p>
                    </div>
                    <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                      <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                      Rejected
                    </span>
                  </div>
                </li>
                <li class="py-3 sm:py-4">
                  <div class="flex items-center space-x-3 rtl:space-x-reverse">
                    <div class="flex-shrink-0">
                      <img
                        class="w-8 h-8 rounded-full"
                        src="/default-profile.png"
                        alt="Neil image"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-semibold text-gray-900 truncate ">
                        Bonnie Green
                      </p>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@flowbite.com
                      </p>
                    </div>
                    <span class="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      <span class="w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                      pending
                    </span>
                  </div>
                </li>
              </ul>

              <div className="p-5 flex flex-col  flex-1 justify-between items-center ">
                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 -6">
                  <h3 className="text-xl 5 text-gray-800">Shipping</h3>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex justify-center items-center space-x-4">
                      <div className="w-8 h-8">
                        <img
                          className="w-full h-full"
                          alt="logo"
                          src="https://i.ibb.co/L8KSdNQ/image-3.png"
                        />
                      </div>
                      <div className="flex flex-col justify-start items-center">
                        <p className="text-lg leading-6 gray-800">
                          DPD Delivery
                          <br />
                          <span className="font-normal">
                            Delivery with 24 Hours
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold leading-6 ">$8.00</p>
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <button className="hover:bg-black :outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                      View Carrier Details
                    </button>
                  </div>
                </div>
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 -6">
                  <h3 className="text-xl 5 text-gray-800">Summary</h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between w-full">
                      <p className="text-base gray-800">Subtotal</p>
                      <p className="text-base  text-gray-600">$56.00</p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base gray-800">
                        Discount{" "}
                        <span className="bg-gray-200 p-1 text-xs font-medium  text-gray-800">
                          STUDENT
                        </span>
                      </p>
                      <p className="text-base  text-gray-600">-$28.00 (50%)</p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base gray-800">Shipping</p>
                      <p className="text-base  text-gray-600">$8.00</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base 4 text-gray-800">Total</p>
                    <p className="text-base  leading-4 text-gray-600">$36.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5  flex-[1_1_30%] flex flex-col">
          <h1 className="mainHead font-serif p-5 mb-5 bg-white w-full">
            Your Details
            <p className="text-sm xxs:text-base sm:text-[1.08rem] leading-relaxed text-gray-700 antialiased py-5">
              Here are the details of the shiping and billing
            </p>
          </h1>

          <label
            htmlFor="title"
            className="block  text-sm font-bold text-gray-900 "
          >
            Name<span className="text-red-500 ml-0">*</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className=" border-gray-300 bg-transparent border-2 hover:border-gray-400 my-2 rounded-md p-2  "
          />
          <label
            htmlFor="title"
            className="block  text-sm font-bold text-gray-900 "
          >
            Shipping Address<span className="text-red-500 ml-0">*</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className=" border-gray-300 bg-transparent border-2 hover:border-gray-400 my-2 rounded-md p-2  "
          />
          <label
            htmlFor="title"
            className="block  text-sm font-bold text-gray-900 "
          >
            Contact<span className="text-red-500 ml-0">*</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className=" border-gray-300 bg-transparent border-2 hover:border-gray-400 my-2 rounded-md p-2  "
          />
        </div>
      </div>
    </>
  );
};

export default Page;
