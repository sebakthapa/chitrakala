"use client"
import React from 'react'
import { app } from '@/lib/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes,deleteObject } from 'firebase/storage';
import Image from 'next/image';
import { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Exhibition = () => {
    const router = useRouter();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [datetime, setDateTime] = useState('');
    const [loading, setLoading] = useState(false);
  
  
  

    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    }
  
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    }
  
    const handleLocationChange = (e) => {
      setLocation(e.target.value);
    }

    const handleDateTime = (e) => {
      setDateTime(e.target.value);
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
      if (image) {
        try {
  
          
          setLoading(true);
          e.preventDefault();
          const storage = getStorage(app);
          var today = new Date();
          const storageRef = ref(storage, `exhibition/${today}.png`);
          await uploadBytes(storageRef, image);
  
          // Get the download URL of the uploaded image
          const downloadURL = await getDownloadURL(storageRef);
          console.log('Image uploaded:', downloadURL);
  
  
          const data = {
            title: title,
            description: description,
            location: location,
            datetime : datetime,
            photo:downloadURL
            
          };
  
          const res = await axios.post("/api/exhibition", data);
          if (res.status == 200) {
            console.log(" Uploadeed");
            router.push('/exhibition') 

          }
          else {
            console.error("Failed................................")
            await deleteObject(storageRef);
          }
  
          setLoading(false);
          // You can now save the downloadURL to your database or use it in your application as needed
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    };
  
    return (
      <>
            <h1 className='text-center font-extrabold text-2xl '>Exhibition</h1>
        <div className="container m-10 flex justify-center items-center ">
          <form action="#" className="flex flex-col gap-2 justify-center">
  
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
              className=" border-gray-400 border-2 rounded-md p-2  "
            />
  
            <textarea
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Description"
              className=" border-gray-400 border-2 rounded-md p-2  "
            />
  
  
  
  
            <input className='p-5 border-gray-400 border-2 rounded-md' type="file" onChange={handleFileChange} />
            {imageUrl && <Image src={imageUrl} alt="Selected" width="100" height="100" />}
  
  
            <input
              type="datetime-local"
              placeholder="Date of Start"
              value={datetime}
              onChange={handleDateTime}
              className=" border-gray-400 border-2 rounded-md p-2  "
            />
  
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={handleLocationChange}
              className=" border-gray-400 border-2 rounded-md p-2  "
            />


  
            <button
              disabled={loading}
              className="bg-green-900 text-gray-100 rounded py-2 px-4 transition duration-300 hover:bg-green-700"
              onClick={handleFileUpload}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
  
  
  
          </form>
        </div>
        </>
        )}

export default Exhibition