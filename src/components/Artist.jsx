"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

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

  

    <div className='m-5 '>
        <button className='border text-[#556f5f] border-[#556f5f] hover:bg-[#556f5f] hover:text-white py-2 px-6 rounded-lg'>Filter</button>
    </div>


    <main className="py-4">
        <div className="px-4">
          <div className="block md:flex  md:-mx-2">
            {users.map((item, index) => (
              <div key={index} className="w-full lg:w-1/4 md:mx-2 mb-4 md:mb-0">
                <div className="bg-white rounded-lg overflow-hidden shadow relative">
                  <div className=" h-[30vh] overflow-hidden  ">
                    <motion.img
                      key={index}
                      src="/landing/oil.jpg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
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
                    <span
                      className="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg"
                    >
                      {item.displayName}
                    </span>
                    <div className="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                      {item.bio}
                    </div>
                    <div className="relative mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block">
                      <span
                        className="inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700"
                    
                      >
                     {item.address}
                      </span>
                      <span
                        className="inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700"
                      >
                      {item.dob?.split('T')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
    {/* <main className='bg-[#gagaga] m-5 flex flex-col overflow-hidden  gap-7 '>
    {users.map((user,index) => (

    
      <section key ={index} className='bg-slate-300 w-full p-5 flex justify-between rounded-lg'>
        <aside className='flex gap-5'>
          <div className='bg-red-50 w-[6rem] h-[6rem] flex justify-center items-center border rounded-full'>
            <img
           
            src={user.photo}
            alt="profile"
            />
          </div>
          <div>
            <div>{user.displayName}</div>
            <div>{user.bio}</div>
            <div>{user.address}</div>
            
            <div>{ user.dob?.split('T')[0]}</div>
    
          </div>
        </aside>

        <div className='flex justify-center items-center'>
        <button className='border text-[#556f5f] border-[#556f5f] hover:bg-[#556f5f] hover:text-white py-2 px-6 rounded-full'>Checkout</button>
                        
        </div>

      </section>

))}
</main> */}
    </>
  )
}

export default Artist