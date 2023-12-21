"use client"

import { useEffect, useState } from "react";
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { toast } from "react-toastify";
import { BsCamera, BsFileEarmarkArrowDown, BsFillCameraFill, } from "react-icons/bs";
import { useSelector } from "react-redux";
import { PiCameraLight, PiCameraThin, PiUserCircleLight, PiUserCircleThin, PiUserLight } from "react-icons/pi";
import { BiSolidUser } from "react-icons/bi";


const UploadImage = ({ type, setDragging, setImage, setImageUrl, label, required, id,containerClassName }) => {
    const user = useSelector(state => state.user)

    const [dragging, setDraggingL] = useState(false);
    const [image, setImageL] = useState(null);
    const [imageUrl, setImageUrlL] = useState(user?.image || null);
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
        // console.log("SEFile", selectedFile)
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
            // setImage(null)
            // setImageL(null)
            // setImageUrl(null)
            // setImageUrlL(null)
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
        // console.log('Dropped files:', files);
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

    const openImageChooseWindow = () => {
        document.querySelector("#uploadimage").click();
    }



    return (
        <div
            className={`image input_field_container mb-10
            ${type == "profile" ? "w-fit items-center" : "w-full"}
            ${containerClassName}
            `}
        >
            {
                type == "profile" || (
                    <label className='capitalize text-gray-600 opacity-80 text-sm font-medium -mb-4' htmlFor={"uploadimage"}>
                        {user?.imageUrl ? "Update " : "Add "}
                        {label}
                        {required && <span className='text-red-500'>*</span>}
                    </label>
                )
            }

            <input
                required={required}
                id={"uploadimage"}
                className=' h-0 p-0 border-0 m-0 w-0 border-gray-300 hover:border-gray-400 transition rounded-md'
                type="file"
                label={"Upload Image"}
                onChange={handleFileChange}
            />
            <div
                className={`flex group overflow-hidden  flex-col border-dashed  relative  transition  active:scale-95
                ${imageUrl || (type == "profile" ? "" : "border-4  h-[10rem] min-h-[16rem]")}
                ${type != "profile" && (dragging ? "border-[rgba(0,0,255,.3)]" : "border-[rgba(0,0,0,0.15)]")}  
                ${dragging && "scale-95  border-4"}
                ${type == "profile" ? "border-0 w-[10rem] cursor-pointer rounded-full" : " rounded-xl items-center justify-center"}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => type == "profile" && openImageChooseWindow()}
                title={type == "profile" ? "Click to add." : "Upload suitable Image file"}
            >
                {
                    type == "profile" && (
                        <span className="icon opacity-0 group-hover:opacity-100 transition duration-300 absolute z-40 bottom-0 left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,.4)] w-full py-2">
                            <BsFillCameraFill className="w-8 h-8 mx-auto" fill="#fff"  />
                        </span>
                    )
                }
                <div className="imageContainer relative w-full border-2 border-gray-300 rounded-full">



                    {
                        imageUrl?.length > 0 ?
                            <Image
                                className={`max-h-[500px] w-full  
                            ${type == "profile" ? "w-[10rem] h-[10rem] rounded-full border-0 object-cover " : "rounded-xl w-full h-auto  object-contain max-w-[500px] "}
                            `}
                                src={imageUrl}
                                alt="Your profile image"
                                width="180" height="180"
                            /> :
                            (
                                <>
                                    {
                                        type == "profile" ? (
                                            <div onClick={openImageChooseWindow} className="cursor-pointer  group relative rounded-full overflow-hidden">
                                                <Image
                                                    src={"/default-profile.png"}
                                                    width={180} height={180}
                                                    alt="default dommy profile picture"
                                                    className="w-full h-full  rounded-full  opacity-20"
                                                />

                                            </div>
                                        ) : (
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
                                                                    onClick={openImageChooseWindow}
                                                                >
                                                                    Browse images
                                                                </span>
                                                                &nbsp;on your device
                                                            </span>
                                                        </p>
                                                }
                                            </div>
                                        )
                                    }

                                </>

                            )
                    }
                </div>

            </div>
            {
                imageUrl && (
                    <div className={`imageName flex items-center justify-between gap-2 w-full pb-2  ${type == "profile" ? "" : "border-b-2"}`}>
                        <p className="name w-fit text-gray-500 text-sm">{
                            image?.name.length > 0 ? (
                                <>
                                    {
                                        type == "profile" ? (
                                            <>
                                                {image?.name.split(".")[0].slice(0, 8)}
                                                {"...."}
                                                {image?.name.split(".")[0].slice(-4)}
                                                {" ."}
                                                {image?.name.split(".")[1]}
                                            </>
                                        ) : (
                                            image?.name
                                        )
                                    }

                                </>
                            ) : (
                                "Your Image"
                            )
                        }


                        </p>
                        <button
                            className="w-8 h-8 p rounded-full p-1  flex items-center justify-center hover:bg-stone-200  opacity-60"
                            onClick={() => { setImage(null); setImageUrl(''); setImageL(null); setImageUrlL(''); }}
                        >
                            <RxCross2 className="w-4 h-4" title="Remove this image" />
                        </button>
                    </div>
                )
            }
            {
                type == "profile" && !imageUrl && (
                    <label className='capitalize text-center text-gray-600 opacity-80 text-sm font-medium -mb-4' htmlFor={"uploadimage"}>
                        {user?.imageUrl ? "Update " : "Add "}
                        {label}
                        {required && <span className=''>*</span>}
                    </label>
                )
            }

        </div >
    )
}

export default UploadImage
