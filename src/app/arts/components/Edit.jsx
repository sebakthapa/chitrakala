"use client"
import { app } from '@/lib/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';
import Image from 'next/image';
import { useState,useEffect } from 'react'
import axios from 'axios';
import { useSearchParams,useRouter } from 'next/navigation';
import Input from '@/components/Input/Input';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import {  toast } from 'react-toastify';
import {  useSession } from 'next-auth/react';

import React from 'react'
import LoadingComponent from '@/components/LoadingComponent';

const Edit = ({}) => {
    const { data: session } = useSession();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false); 
    const [loadingpage, setLoadingpage] = useState(true); 
    const [dragging, setDragging] = useState(false);
  
    const router = useRouter();
    const searchParams = useSearchParams();
  
    const user = useSelector(state => state.user)
  
    const pid = searchParams.get("pid");
  
    useEffect(() => {
      if (pid ) {
        // Fetch product data using the pid
        const fetchProductData = async () => {
          try {
            const res = await axios.get(`/api/products/${pid}`);
            if (res.status === 200) {
              const productData = res.data;
              if(productData?.artist?.user?._id && session?.user?.id)
              {
                if(productData?.artist?.user?._id !== session?.user?.id)
                {

                   toast.error("Invalid privilege ")
                   router.push(`/arts/${pid}`)
                }
              }
  
              // Set initial state values with fetched data
              setTitle(productData.name || '');
              setDescription(productData.description || '');
              setPrice(productData.price || '');
              setCategory(productData.category || '');
              setImageUrl(productData.photo || '');
            }
          } catch (error) {
          } finally {
            setLoadingpage(false); // Set loading to false once data is fetched or an error occurs
          }
        };
  
        fetchProductData();
      } else {
        setLoadingpage(false); // If pid or session.user.id is not available, set loading to false
      }
    }, [pid, session, router]);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }


    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    }



    const handleFileChange = (e) => {
        if (e.target.files[0]) {

            const selectedFile = e.target.files[0];
            setImage(selectedFile);
            // Display the selected image preview (optional)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
                
            };
            reader.readAsDataURL(selectedFile);


        } else {
            setImage(null)
            setImageUrl(null)
        }
    };



    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!session) {
            toast.error("Please login to upload")
        };
        try {
            setLoading(true);
            const storage = getStorage(app);
            var today = new Date();
            const storageRef = ref(storage, `gallery/${today}.png`);
            let downloadURL = null
            if (image ) {

                await uploadBytes(storageRef, image);
                
                                // Get the download URL of the uploaded image
                                downloadURL = await getDownloadURL(storageRef);
            }


                const data = {
                    artist: user?._id,
                    name: title,
                    price: price,
                    description: description,
                    category: category,
                    photo: downloadURL?downloadURL:imageUrl
                };
                
                const res = await axios.patch("/api/products/"+ pid, data);

                if (res.status == 200) {
                    toast.success("Updated");
                    router.back()


                }
                else {
                    setLoading(false);

                    await deleteObject(storageRef);

                }

                setLoading(false);
                // You can now save the downloadURL to your database or use it in your application as needed
            } catch (error) {
                setLoading(false);

            }
        
    };


    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        const files = e.dataTransfer.files;
        // Handle the dropped files, e.g., upload or process them

        setImageUrl(files[0])
        const selectedFile = files[0];
        setImage(selectedFile);
        // Display the selected image preview (optional)
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(selectedFile);

    };

    return (
        <>
        {
            loadingpage ?(
               <LoadingComponent/>
            ):(

        <div className="container my-12 w-full max-w-[600px] flex justify-center items-center mx-auto ">
            <form action="#" className="flex flex-col gap-8 justify-center w-full ">
                <h1 className='text-center font-extrabold text-3xl'>Edit your Masterpiece</h1>


                <div className="title input_field_container">
                    <Input

                        required
                        type="text"
                        label="title"
                        value={title}
                        setValue={setTitle}
                        classLists=""
                    />
                </div>

                <div className="description input_field_container">

                    <label htmlFor="post-description" className='text-gray-500 -mb-2' >Description</label>
                    <textarea
                        type="text"
                        id='post-description'
                        value={description}
                        onChange={handleDescriptionChange}
                        className=" bg-transparent border-2 border-gray-300 hover:border-gray-400 transition duration-300 rounded py-[0.4rem] pl-3 pr-9 "
                    />
                </div>

                <div className=" image input_field_container ">
                    <label htmlFor="uploadimage" className='text-gray-500 -mb-2' >Your Work</label>

                    <input id="uploadimage" className='p-5 hidden border-gray-300 hover:border-gray-400 transition border-2 rounded-md' type="file" label={"Upload Image"} required onChange={handleFileChange} />
                    <div
                        className='rounded relative flex items-center justify-center border-dashed border-2 border-gray-500 w-full h-auto min-h-[300px] p-1'
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}>
                        {
                            imageUrl && (
                                <button title='Clear Image' onClick={() => { setImage(null); setImageUrl('') }} className="clearImage absolute bg-red-500 rounded-full p-1 -top-2 -right-2 text-gray-200 hover:scale-105 transition active:scale-95">
                                    <RxCross2 className='text-gray-100 font-extrabold w-6 h-6' />
                                </button>
                            )
                        }

                        {
                            imageUrl ? <Image className='h-auto max-h-[500px] w-full object-contain' src={imageUrl} alt="Selected" width="300" height="300" /> : (
                                <div className='text-xl p-4 flex flex-col justify-center items-center h-full w-full'>
                                    <span><AiOutlineCloudUpload className='w-20 h-20' /></span>
                                    <p>
                                        <span>Drag and drop your image or </span>  <span className='text-blue-500 cursor-pointer' onClick={() => document.querySelector("#uploadimage").click()}> browse</span>
                                    </p>
                                </div>
                            )}
                    </div>
                </div>






                <div className="flex justify-between items-center">

                    <div className=" input_field_container flex flex-row justify-between">
                        <div className="flex flex-col gap-3">

                            <label htmlFor="post-category" className='text-gray-500 -mb-2' >Category</label>
                            <select
                                id='post-category'
                                className="py-2 px-5 border-gray-300 hover:border-gray-400 transition cursor-pointer border-2 rounded-sm "
                                value={category}
                                onChange={handleCategoryChange}
                                required
                            >
                                <option disabled value="" >Choose category..</option>
                                <option value="oil">Oil</option>
                                <option value="water">Water</option>
                                <option value="sketch">Sketch</option>
                                <option value="digital">Digital</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>



                    <div className="input_field_container">
                        <Input
                            type="number"
                            placeholder="Price"
                            value={price}
                            label={"Price"}
                            setValue={setPrice}
                            onChange={handlePriceChange}
                            className=" border-gray-400 border-2 rounded-md p-2 "
                        />
                    </div>
                </div>
                <button
                    disabled={loading }
                    title={`${user?.uid ? "" : "Login or Signup to Upload"}`}
                    className={`bg-green-700 text-gray-100 rounded py-2 px-4 transition duration-300  ${session ? "hover:bg-green-800" : " cursor-not-allowed opacity-60 hover:bg-green-700"}`}
                    onClick={handleFileUpload}
                >
                    {loading ? 'Editing...' : 'Edit'}
                </button>
            </form>
       
            </div>
            )
        }
        </>
    )
}

export default Edit