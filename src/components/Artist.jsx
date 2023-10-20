"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
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
        <button className='border text-[#556f5f] border-[#556f5f] hover:bg-[#556f5f] hover:text-white py-2 px-6 rounded-full'>Filter</button>
    </div>
    <main className='bg-[#gagaga] m-5 flex flex-wrap  gap-7 '>
    {users.map(user => (

    
      <section className='bg-slate-300 w-full p-5 flex justify-between rounded-lg'>
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
            <div>{ user.dob}</div>
    
          </div>
        </aside>

        <div className='flex justify-center items-center'>
        <button className='border text-[#556f5f] border-[#556f5f] hover:bg-[#556f5f] hover:text-white py-2 px-6 rounded-full'>Checkout</button>
                        
        </div>

      </section>

))}
</main>
    </>
  )
}

export default Artist