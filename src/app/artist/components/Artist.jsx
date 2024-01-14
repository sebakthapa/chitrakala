"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ContentLoader from 'react-content-loader'

const Artist = () => {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState({ error: false, loading: true, message: "" })
  const [filteredusers, setFilteredUsers] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {

    async function fetchUsers() {
      try {
        const res = await fetch('/api/users')
        const data = await res.json()
        setUsers(data)
        setFilteredUsers(data)
        setStatus({ ...status, loading: false })
      }

      catch (error) {
        setStatus({ ...status, error: true, message: `Error! ${error}` })
      }
    }
    fetchUsers()

  }, [])


  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      filterSearchHandle();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [search, users]);


  const handleSearch = (e) => {
    if (!e) {

    }
    setSearch(e.toLowerCase());

  }

  const filterSearchHandle = () => {

    if (search){
      let filteredData = users.filter((item)=> (item?.name?.toLowerCase().includes(search)) || item?.user?.username.toLowerCase().includes(search));
      setFilteredUsers(filteredData)
    }
    else {
      
      setFilteredUsers(users)
    }
  }



  return (
    <>
      <main className=" bg-white m-5 p-10 flex flex-col ">

        <div class="searchBar flex   items-center max-w-md my-5 bg-white rounded-full border border-gray-800 " x-data="{ search: '' }">
          <div class="w-full">
            <input type="search" class="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              placeholder="Search" x-model="search" value={search} onChange={(e) => { handleSearch(e.target.value) }} />
          </div>
          <div>
            <button onClick={filterSearchHandle} type="submit" class="flex items-center  justify-center w-12 h-12 text-gray-800 rounded-r-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>



        <ul className="max-w-md">
          {status.loading ? (
            <>
            <ArtistLoadingSkeleton/>
            <ArtistLoadingSkeleton/>
            </>
          ) : filteredusers?.length > 0 ? (
            filteredusers.map((item, index) => {
              if (item.artWorks.length === 0) return null;

              return (
                <Link
                  href={`/artist/${item?.user?._id}`}

                  key={index}
                  className="pb-3 sm:pb-4 ">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse pb-3 sm:pb-4">
                    <div className="flex-shrink-0">
                      <Image height={400} width={400} className="w-20 h-20 rounded-full" src={item?.image} alt=" image" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate capitalize cursor-pointer hover:underline">
                        {(item?.name)}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400 cursor-pointer hover:underline">
                        @{(item?.user.username)}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {(item?.user.email)}
                      </p>
                    </div>
                    <p href={`/artist/${item?.user?._id}`} className="inline-flex items-center hover:underline text-xs font-semibold text-gray-900 cursor-pointer ">
                      Learn More
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <h1 className='text-red-500'>No matching found</h1>
          )}
        </ul>

      </main>

    </>
  )
}

export default Artist


const ArtistLoadingSkeleton = () => {
  return (
    <ContentLoader
    speed={2}
    width={400}
    height={100}
    viewBox="0 0 400 100"
      title="🖌️ Loading Artist... 🔔"
   
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
