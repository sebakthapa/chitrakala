"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ArtDetails from "@/components/ArtDetail";
import { BsBack, BsBackspaceFill } from "react-icons/bs";
import Link from "next/link";
import { BiSolidLeftArrow, BiSolidLeftArrowCircle } from "react-icons/bi";
const Individual = () => {
    const { artId: productId } = useParams()
    const router = useRouter();


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
        <>
         <div className="text-center ">
                <button onClick={() => router.back()} passHref>
                    <span className="text-[#1f2937] absolute left-0  m-5"><BiSolidLeftArrowCircle   fontSize={"2rem"}/></span>
                </button>
            </div>

            <div className="flex flex-col sm:flex-row  justify-center items-center h-1/2 ">
                <ArtDetails artdata={artData} />
            </div>

            

   


        </>
    )
}

export default Individual