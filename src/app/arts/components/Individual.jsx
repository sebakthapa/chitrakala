"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArtDetails from "@/components/ArtDetail";

import { BiSolidLeftArrowCircle } from "react-icons/bi";
const Individual = ({productId}) => {
    // const { artId: productId } = useParams()
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
        console.log(artData)
    }, []);
    return (
        <>
         <div className="text-center ">
                <button onClick={() => router.back()} passHref>
                    <span className="text-[#1f2937] absolute left-0  m-5"><BiSolidLeftArrowCircle   fontSize={"2rem"}/></span>
                </button>
            </div>

            <div className="flex flex-col sm:flex-row  justify-center h-min overflow-hidden">
                <ArtDetails artdata={artData} />
            </div>

            

   


        </>
    )
}

export default Individual