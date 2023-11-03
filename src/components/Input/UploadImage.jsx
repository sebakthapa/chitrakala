"use client"

import { useEffect, useState } from "react";
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { toast } from "react-toastify";
import {  BsFileEarmarkArrowDown,  } from "react-icons/bs";
import { useSelector } from "react-redux";


const UploadImage = ({ setDragging, setImage, setImageUrl, label, required, id,  }) => {
    const user = useSelector(state => state.user)
    
    const [dragging, setDraggingL] = useState(false);
    const [image, setImageL] = useState(null);
    const [imageUrl, setImageUrlL] = useState( user?.image || null);
    const [dataModified, setDataModified] = useState(false);

    useEffect(() => {
        if (user?.image && !dataModified) {
            setImageUrlL(user?.image || "")
            setImageUrl(user?.image || "")
            setDataModified(true)
        }
    }, [user])

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (!selectedFile?.type?.includes("image")) {
                toast.error("Please insert image of valid format!");
                return;
            }

            setImage(selectedFile);
            setImageL(selectedFile);
            // Display the selected image preview (optional)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
                setImageUrlL(reader.result);
            };
            reader.readAsDataURL(selectedFile);


        } else {
            setImage(null)
            setImageL(null)
            setImageUrl(null)
            setImageUrlL(null)
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
        setDraggingL(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
        setDraggingL(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        setDraggingL(false);

        const files = e.dataTransfer.files;
        // Handle the dropped files, e.g., upload or process them
        console.log('Dropped files:', files);
        if (files.length != 1) {
            toast.error("Please upload a single image!");
            return;
        } else if (!files[0].type.split("/").includes("image")) {
            toast.error("Please upload a valid image!");
            return;
        }

        setImageUrl(files[0])
        setImageUrlL(files[0])
        const selectedFile = files[0];
        setImage(selectedFile);
        setImageL(selectedFile);
        // Display the selected image preview (optional)
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
            setImageUrlL(reader.result);
        };
        reader.readAsDataURL(selectedFile);

    };



    return (
        <div className="image input_field_container ">
            <label className='capitalize  text-gray-600 opacity-80 text-sm font-medium  -mb-4' htmlFor={id}>
                {label}
                
                {required && <span className='text-red-500'>*</span>}
            </label>

            <input
                required={required}
                id={id}
                className=' h-0 p-0 border-0 m-0 border-gray-300 hover:border-gray-400 transition rounded-md'
                type="file"
                label={"Upload Image"}
                onChange={handleFileChange} />
            <div
                className={`rounded-xl
                 flex flex-col relative  items-center justify-center border-dashed ${imageUrl || "border-4"}   ${dragging ? "border-[rgba(0,0,255,.3)]" : "border-[rgba(0,0,0,0.15)]"} w-full h-auto min-h-[250px]  transition  ${dragging && " scale-95  border-4"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >


                {
                    imageUrl?.length > 0 ? <Image className='h-auto max-h-[500px] rounded-xl w-full object-contain' src={imageUrl} alt="Your profile image" width="300" height="300" /> : (
                        <div className={`text-xl p-4 flex flex-col justify-center items-center h-full w-full ${dragging && " animate-pulse"}`}>

                            <span className={`pointer-events-none block mb-3`} >
                                <BsFileEarmarkArrowDown className={`w-12 h-12 pointer-events-none `} fill="rgba(0,0,0,.3)" />
                            </span>

                            {
                                dragging ?
                                    <p className='text-center pointer-events-none text-gray-400    font-semibold'>
                                        Release to add
                                    </p>
                                    :
                                    <p className='text-center flex flex-col font-semibold gap-1'>
                                        <span className='text-2xl text-[rgba(0,0,0,.3)]'>Drag & drop image  here </span>
                                        <span className="text-base  text-[rgba(0,0,0,.4)]">
                                            or &nbsp;
                                            <span
                                                className="text-blue-600 opacity-90 underline font-bold cursor-pointer hover:no-underline"
                                                onClick={() => document.querySelector("#uploadimage").click()}
                                            >
                                                Browse images
                                            </span>
                                            &nbsp;on your device
                                        </span>
                                    </p>
                            }
                        </div>
                    )}
                {
                    imageUrl && (
                        <div className="imageName flex items-center justify-between w-full px-5 pb-4 my-5 border-b-2 ">
                            <p className="name w-fit text-gray-500">{image?.name || "Your image"}</p>
                            <button
                                className="w-10 h-10 p rounded-full p-1  flex items-center justify-center hover:bg-stone-200  opacity-60"
                                onClick={() => { setImage(null); setImageUrl(''); setImageL(null); setImageUrlL(''); }}
                            >
                                <RxCross2 className="w-5 h-5" title="Remove this image" />
                            </button>

                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default UploadImage
