"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArtDetails from "@/components/ArtDetail";

import { BiSolidLeftArrowCircle } from "react-icons/bi";
const IndividualArts = ({ productId }) => {
  // const { artId: productId } = useParams()
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [artData, setArtData] = useState("");

  async function fetchData() {
    try {
      const res = await fetch(`/api/products/${productId}`);

      if (res.status == 200) {
        const data = await res.json();
        setArtData(data);
        setLoading(false);
      }
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="text-center ">
        <button onClick={() => router.back()}>
          <span className="text-[#1f2937] absolute left-0  m-5">
            <BiSolidLeftArrowCircle fontSize={"2rem"} />
          </span>
        </button>
      </div>

      <ArtDetails status={loading} artdata={artData} />
    </>
  );
};

export default IndividualArts;
