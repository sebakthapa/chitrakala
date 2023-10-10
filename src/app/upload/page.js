"use client"
import { app } from '@/lib/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import { useState } from 'react'
const Page = () => {

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

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

  const handleFileUpload = async () => {
    if (image) {
      try {
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/Screenshot (48).png`);
        await uploadBytes(storageRef, image);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);
        console.log('Image uploaded:', downloadURL);

        // You can now save the downloadURL to your database or use it in your application as needed
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <>
      <div className="container m-10 flex justify-center items-center ">
        <form action="#" className="flex flex-col gap-2">

          <input
            type="text"
            placeholder="Title"
            className=" border-gray-400 border-2 rounded-md p-2  "
          />

          <textarea
            type="text"
            placeholder="Description"
            className=" border-gray-400 border-2 rounded-md p-2  "
          />



          <div className=' '>
            <input className='p-5 border-gray-400 border-2 rounded-md ' type="file" onChange={handleFileChange} />
            {imageUrl && <Image src={imageUrl} alt="Selected" width="200" height="200" />}
          </div>


          <input
            type="text"
            placeholder="Price"
            className=" border-gray-400 border-2 rounded-md p-2  "
          />

          <button className='bg-green-900 text-gray-100 rounded py-2 px-4 transition duration-300 hover:bg-green-700' onClick={handleFileUpload}>Upload</button>



        </form>
      </div>

    </>
  )
}

export default Page