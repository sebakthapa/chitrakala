"use client";
import { useEffect,useState } from "react";
import { useParams } from "next/navigation";
import ArtDetails from "@/components/ArtDetail";
const Page = () => {
    const {artId:productId} = useParams()


  const [artData, setArtData] = useState("");

  async function fetchData() {
    try {
      const res = await fetch(`/api/products/${productId}`);

      if (res.status == 200) {
        const data = await res.json();
        setArtData(data);
      }
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-center">
      <ArtDetails artdata={artData} />
    </div>
  );
};

export default Page;
