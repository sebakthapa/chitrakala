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

  console.log(users)

  return (
    <>
      <main className="py-4">
        <div className="px-4">
          <div className="block md:flex  md:-mx-2">
            {users?.length > 0 && users.map((item, index) => {
              if (item.artWorks.length == 0) return;

              return (<div key={index} className="w-full lg:w-1/4 md:mx-2 mb-4 md:mb-0">
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

                      <div className="flex  bg-slate-300 rounded-full px-5 gap-2 mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block">
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
        </div>
      </main>

    </>
  )
}

export default Artist