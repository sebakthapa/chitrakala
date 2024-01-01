"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { AiOutlineMail, AiFillPhone } from 'react-icons/ai'

const Artist = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data)
    }
    fetchUsers()
  }, [])


  return (
    <>
      <main className=" bg-white m-5 p-10">
        
      <div class="searchBar flex  items-center max-w-md my-5 bg-white rounded-full border border-gray-800 " x-data="{ search: '' }">
        <div class="w-full">
            <input type="search" class="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
                placeholder="Search" x-model="search"/>
        </div>
        <div>
            <button type="submit" class="flex items-center  justify-center w-12 h-12 text-gray-800 rounded-r-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </button>
        </div>
      </div>

        
          <div className="block md:flex  md:-mx-2">
            {users?.length > 0 && users.map((item, index) => {
              if (item.artWorks.length == 0) return;

              return (
                
              <div key={index} className="w-full min-w-[300px] bg-white rounded-lg  darkk:bg-gray-800 darkk:border-gray-700">
                <Link href="/artists/[id]" as={`/artist/${item?.user?._id}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow relative">
                    <div className=" h-[30vh] overflow-hidden  ">
                      <motion.img
                        key={index}
                        src={item?.artWorks[0]?.photo}

                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 10,
                        }}
                      />

                      <div className="pp flex-initial overflow-hidden border-white border-[2px] top-1 bg-black text-white w-12 text-center h-12 m-1 rounded-full absolute bottom-0">
                        <Image alt='default avatar' src={item.image || "/avatar.png"} width={50} height={50} />
                      </div>
                    </div>

                    <div className="p-4 h-auto md:h-40 lg:h-48">
                      <div className="text-gray-600  text-xl leading-relaxed block md:text-xs lg:text-sm">
                        @{item.user.username}
                      </div>
                      <span
                        className="block capitalize text-gray-700 hover:underline font-semibold mb-2 text-lg md:text-base lg:text-lg"
                      >
                        {item.name.toLowerCase()}
                      </span>
                      <div className=" truncate text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                        {item.bio}
                      </div>

                      <div className="flex flex-col  gap-2 mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block">
                        <span
                          className="flex   items-center gap-2 mr-2   py-1 px-2 rounded-full text-xs lowercase text-gray-700"

                        >
                          <AiOutlineMail /> {item.user.email}
                        </span>
                        <span
                          className="flex items-center gap-2  py-1 px-2 rounded-full text-xs lowercase text-gray-700"
                        >
                          {/* {item.dob?.split('T')[0]} */}
                          <AiFillPhone /> {item.user?.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              )

            })}
          </div>
      
      </main>

    </>
  )
}

export default Artist


{/* <div className="w-full min-w-[300px] bg-white rounded-lg  darkk:bg-gray-800 darkk:border-gray-700">
<Link href={`/arts/${artData?._id}`} className="block w-full aspect-[5/4] relative group">
    <Image height={400} width={400} className=" rounded-lg object-cover w-full h-full" src={artData?.photo} alt="art image" />
    <div className="texts  flex items-end pb-4 px-3 justify-between absolute w-full bottom-0 left-0 h-[100px] from-transparent to-[rgba(0,0,0,.6)] from-0% bg-gradient-to-b text-gray-100 font-medium opacity-0 group-hover:opacity-100 rounded-lg transition duration-300">
        <p ref={artNameRef} className="title w-full flex-1 line-clamp-1">{artData?.name} &nbsp;</p>

        <span className="text-sm w-fit font-semibold text-gray-100 darkk:text-white">
            {
                artData?.price ? `Rs ${formatNumberWithLetter(artData?.price)}` : <span className=" bg-lime-600  p-1 px-2 rounded-full text-xs">Showcase</span>
            }
            {artData.category}

        </span>


    </div>
</Link>
<div className="px-1 pb-5 my-2.5">
    <div className="head flex justify-between items-center">
        <Link href={`/artist/%${artData?.artist?._id}`} className="flex items-center gap-3 w-full flex-1">
            <Image title={artData?.artist?.name} width={30} height={30} alt="artist image" src={artData?.artist?.image} className="rounded-full aspect-square object-cover" />
            <h6 ref={artistNameRef} className="font-medium  w-full flex-1 h-fulltracking-tight text-gray-700 darkk:text-white capitalize">
                {artData?.artist?.name.toLowerCase()}
                &nbsp;
            </h6>
        </Link>

        <div className="flex items-center">
            <div
                className="flex items-center  rtl:space-x-reverse cursor-pointer "
                onClick={() => {
                    toggleLike(artData?._id);
                }}>
                {
                    !checkLiked(artData?.likes, user?._id) ? <BsHeart fontSize={"1.2rem"} fill="gray" /> :
                        <motion.span
                            className="block"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.3,
                                ease: [0, 0.71, 0.2, 1.01],
                                scale: {
                                    type: "spring",
                                    damping: 5,
                                    stiffness: 100,
                                    restDelta: 0.001
                                }
                            }}
                        >
                            <BsHeartFill fontSize={"1.2rem"} fill="#ed495b" />
                        </motion.span>}

            </div>
            <span className="text-[.9rem] text-gray-600  font-semibold  darkk:bg-blue-200 darkk:text-blue-800 mx-2 select-none">

                {formatNumberWithLetter(artData?.likes?.length) || 0}
            </span>
        </div>
    </div>
</div>
</div > */}
