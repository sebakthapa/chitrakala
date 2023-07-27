"use client"

import { app } from '@/lib/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react'

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');


  const initialFormData = {
    name: "",
    description: "",
    price: "",
    category: "",
  }
  const [formData, setFormData] = useState(initialFormData);

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
        const storageRef = ref(storage, `$images/{Date.now()}`);
        await uploadBytes(storageRef, image);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);
        console.log('Image uploaded:', downloadURL);
        if (downloadURL) {
          // send to /products 
          const res = await fetch("/api/products", {
            method: "POST",
            body: JSON.stringify({ ...formData, photo: downloadURL }),
          })
          const aha = await res.json();
          console.log(aha)
        }



        // You can now save the downloadURL to your database or use it in your application as needed
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className='p-5 m-5 bg-green-200 flex flex-wrap gap-4 text-gray-700'>
      <input value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} type="text" name="" id="" placeholder='name' />
      <input value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} type="text" name="" id="" placeholder='description' />
      <input value={formData.price} onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))} type="number" name="" id="" placeholder='price' />
      <input value={formData.category} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))} type="text" name="" id="" placeholder='category' />
      <input className='hidden' id='fileupload123' onChange={handleFileChange} type="file" />
      <label htmlFor="fileupload123" className='bg-gray-200 py-1 px-3 hover:bg-gray-300 transition duration-300'>select file</label>
      {imageUrl && <img src={imageUrl} alt="Selected" width="200" />}
      <button className='bg-green-900 text-gray-100 rounded py-2 px-4 transition duration-300 hover:bg-green-700' onClick={handleFileUpload}>Upload</button>
    </div>
  );
}

export default UploadImage
