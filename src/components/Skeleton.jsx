"use client"
import React from 'react'

const Skeleton = ({ type }) => {
  return (
    <>
      {/* card loader  */}

      {type === "card" && (


        <div class="  rounded-md  max-w-sm w-full mx-auto">
          <div class="animate-pulse flex flex-col space-x-4">
            <div class=" bg-gray-500 h-52 w-full m-3"></div>
            <div class="flex-1 space-y-6 py-1">
              <div class="h-2 bg-gray-500 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-gray-500 rounded col-span-2"></div>
                  <div class="h-2 bg-gray-500 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-gray-500 rounded"></div>
              </div>
            </div>
          </div>
        </div>


      )}
      {type === "reel" && (


        <div class="  ">
          <div class="animate-pulse flex  space-x-4">


            <div class=" bg-gray-500 h-52 w-full m-3"></div>
            <div class=" bg-gray-500 h-52 w-full m-3"></div>
            <div class=" bg-gray-500 h-52 w-full m-3"></div>
            <div class=" bg-gray-500 h-52 w-full m-3"></div>
            <div>

              <div class=" bg-gray-500 h-52 w-full m-3"></div>

            </div>
          </div>
        </div>


      )}
      {type === "pp" && (

        <div class="animate-pulse bg-gray-500 h-12 w-12 rounded-full"></div>

      )}


    </>
  )
}

export default Skeleton