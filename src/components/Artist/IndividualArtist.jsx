"use client";
import ArtistCard from "@/components/ArtistCard";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ArtCard from "@/components/ArtCard";
import Link from "next/link";
import { BiSolidLeftArrowCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const IndividualArtist = () => {
  const router = useRouter();
  const { artistid: userId } = useParams();
  const { data: session } = useSession();
  let option = false;
  if (userId === session?.user?.id) {
    option = true;
  }

  const user = useSelector((state) => state.user);

  const [userData, setUserData] = useState("");

  let likes = 0;
  if (userData) {
    userData.map((item, index) => {
      likes = likes + item.likes.length;
    });
  }

  async function fetchData() {
    try {
      const res = await fetch(`/api/products/user/${userId}`);

      if (res.status == 200) {
        const data = await res.json();
        setUserData(data);
      }
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    if (userId == user?.user.id) {
      setUserData(user);
    } else {
      fetchData();
    }
  }, [user]);

  return (
    <>
      <div className="text-center  ">
        <span
          onClick={() => {
            router.back();
          }}
          passHref
        >
          <span className="text-[#1f2937] absolute left-5 cursor-pointer m-5">
            <BiSolidLeftArrowCircle fontSize={"2rem"} />
          </span>
        </span>
      </div>

      <ArtistCard artwork={userData?.length} likes={likes} />

      <div className="gallery bg-white sm:m-5 mt-0  mx-auto  p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8  ">
        {userData?.length > 0 &&
          userData?.map((item, index) => {
            return <ArtCard option={option} key={index} item={item} />;
          })}
      </div>
    </>
  );
};

export default IndividualArtist;
