import Image from 'next/image'
import React from 'react'

const TopCreator = () => {
  return (
                      <div class="flex flex-col justify-center items-center h-[100vh]">
            <div
                class="relative flex max-w-[500px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800  dark:shadow-none"
            >
                <div
                class="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 pb-[20px] pt-4 shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none"
                >
                <h4 class="text-lg font-bold text-navy-700 ">
                    Top Creators
                </h4>
                <button
                    class="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5  dark:hover:bg-white/10 dark:active:bg-white/20"
                >
                    See all
                </button>
                </div>
                <div class="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
                <table role="table" class="w-full min-w-[500px] overflow-x-scroll">
                    <thead>
                    <tr role="row">
                        <th
                        colspan="1"
                        role="columnheader"
                        title="Toggle SortBy"
                        >
                        <div
                            class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs"
                        >
                            Name
                        </div>
                        </th>
                        <th
                        colspan="1"
                        role="columnheader"
                        title="Toggle SortBy"
                        >
                        <div
                            class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs"
                        >
                            Artworks
                        </div>
                        </th>
                        <th
                        colspan="1"
                        role="columnheader"
                        title="Toggle SortBy"
                        >
                        <div
                            class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs"
                        >
                            Rating
                        </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody role="rowgroup" class="px-4">
                    <tr role="row">
                        <td class="py-3 text-sm" role="cell">
                        <div class="flex items-center gap-2">
                            <div class="h-[30px] w-[30px] rounded-full">
                            <Image
                                src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2244&amp;q=80"
                                class="h-full w-full rounded-full"
                                alt="random image"
                            />
                            </div>
                            <p
                            class="text-sm font-medium text-navy-700 "
                            >
                            @maddison_c21
                            </p>
                        </div>
                        </td>
                        <td class="py-3 text-sm" role="cell">
                        <p class="text-md font-medium text-gray-600 ">
                            9821
                        </p>
                        </td>
                        <td class="py-3 text-sm" role="cell">
                        <div class="mx-2 flex font-bold">
                            <div
                            class="h-2 w-16 rounded-full bg-gray-200 dark:bg-navy-700"
                            >
                            <div
                                class="flex h-full items-center justify-center rounded-md bg-brand-500 dark:bg-brand-400"
                            ></div>
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr role="row">
                        <td class="py-3 text-sm" role="cell">
                        <div class="flex items-center gap-2">
                            <div class="h-[30px] w-[30px] rounded-full">
                            <Image
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1780&amp;q=80"
                                class="h-full w-full rounded-full"
                                alt="rand image"
                            />
                            </div>
                            <p
                            class="text-sm font-medium text-navy-700 "
                            >
                            @karl.will02
                            </p>
                        </div>
                        </td>
                        <td class="py-3 text-sm" role="cell">
                        <p class="text-md font-medium text-gray-600 ">
                            7032
                        </p>
                        </td>
                        <td class="py-3 text-sm" role="cell">
                        <div class="mx-2 flex font-bold">
                            <div
                            class="h-2 w-16 rounded-full bg-gray-200 dark:bg-navy-700"
                            >
                            <div
                                class="flex h-full items-center justify-center rounded-md bg-brand-500 dark:bg-brand-400"
                            ></div>
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr role="row">
                        <td class="py-3 text-sm" role="cell">
                        <div class="flex items-center gap-2">
                            <div class="h-[30px] w-[30px] rounded-full">
                            <Image
                                src="https://images.unsplash.com/photo-1573766064535-6d5d4e62bf9d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1315&amp;q=80"
                                class="h-full w-full rounded-full"
                                alt="rand image"
                            />
                            </div>
                            <p
                            class="text-sm font-medium text-navy-700 "
                            >
                            @andreea.1z
                            </p>
                        </div>
                        </td>
                        <td class="py-3 text-sm" role="cell">
                        <p class="text-md font-medium text-gray-600 ">
                            5204
                        </p>
                        </td>
                        <td class="py-3 text-sm" role="cell">
                        <div class="mx-2 flex font-bold">
                            <div
                            class="h-2 w-16 rounded-full bg-gray-200 dark:bg-navy-700"
                            >
                            <div
                                class="flex h-full items-center justify-center rounded-md bg-brand-500 dark:bg-brand-400"
                            ></div>
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr role="row">
                        <td class="py-3 text-sm" role="cell">
                        <div class="flex items-center gap-2">
                            <div class="h-[30px] w-[30px] rounded-full">
                            <Image
                                src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1780&amp;q=80"
                                class="h-full w-full rounded-full"
                                alt="random image"
                            />
                            </div>
                            <p
                            class="text-sm font-medium text-navy-700 "
                            >
                            @abraham47.y
                            </p>
                        </div>
                        </td>
                        <td class="py-3 text-sm" role="cell">
                        <p class="text-md font-medium text-gray-600 ">
                            4309
                        </p>
                        </td>
                        <td class="py-3 text-sm" role="cell">
                        <div class="mx-2 flex font-bold">
                            <div
                            class="h-2 w-16 rounded-full bg-gray-200 dark:bg-navy-700"
                            >
                            <div
                                class="flex h-full items-center justify-center rounded-md bg-brand-500 dark:bg-brand-400"
                            ></div>
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr role="row">
                        <td class="py-3 text-sm" role="cell">
                        <div class="flex items-center gap-2">
                            <div class="h-[30px] w-[30px] rounded-full">
                            <Image
                                src="https://i.ibb.co/7p0d1Cd/Frame-24.png"
                                class="h-full w-full rounded-full"
                                alt="image"
                            />
                            </div>
                            <p
                            class="text-sm font-medium text-navy-700 "
                            >
                            @simmmple.web
                            </p>
                        </div>
                        </td>
                        <td class="py-3 text-sm" role="cell">
                        <p class="text-md font-medium text-gray-600 ">
                            3871
                        </p>
                        </td>
                        <td class="py-3 text-sm" role="cell">
                        <div class="mx-2 flex font-bold">
                            <div
                            class="h-2 w-16 rounded-full bg-gray-200 dark:bg-navy-700"
                            >
                            <div
                                class="flex h-full items-center justify-center rounded-md bg-brand-500 dark:bg-brand-400"
                            ></div>
                            </div>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
            <p class="font-normal text-navy-700 mt-20 mx-auto w-max">Profile Card component from <a href="https://horizon-ui.com?ref=tailwindcomponents.com" target="_blank" class="text-brand-500 font-bold">Horizon UI Tailwind React</a></p>  
        </div>

  )
}

export default TopCreator