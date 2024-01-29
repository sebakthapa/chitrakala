"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContentLoader from 'react-content-loader';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
const RatedArtists = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                // Fetch data from /api/users
                const response = await fetch('/api/users');
                const data = await response.json();
    
                // Filter users based on conditions (isArtist is true and artworks length is not zero)
                const filteredArtists = data.filter(user => user?.user?.isArtist && user.artWorks.length > 0);
    
                // Set the filtered artists to the state
                setArtists(filteredArtists);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching artists:', error);
                setLoading(false);

            }
        };
    
        fetchArtists();
    }, []);

    return (
        <>
            <div className=' p-5 sm:mx-5'>

            {loading ? (
          <ArtistLoadingSkeleton/>
        ) : artists.length === 0 ? (
          <p>No artist available. You can become </p>
        ) : (
          <>
                {/* Render your running exhibitions here */}
                {artists.map((item, index) => (
                    <Link
                        href={`/artist/${item?.user?._id}`}

                        key={index}
                        className="pb-3 sm:pb-4 ">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse pb-3 sm:pb-4">
                            <div className="flex-shrink-0">
                                <Image height={400} width={400} className="w-20 h-20 rounded-full" src={item?.image} alt=" image" />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
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
                ))}
                <div className="flex items-center justify-end space-x-4 rtl:space-x-reverse pb-3 sm:pb-4">

                    <Link  href={"/artist"} className="inline-flex items-center hover:underline text-xs font-bold text-gray-900 cursor-pointer gap-2">
                        View All <FaArrowUpRightFromSquare/>
                    </Link>
                </div>

                </>
        )}
            </div>
        </>
    );
};

export default RatedArtists;

const ArtistLoadingSkeleton = () => {
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