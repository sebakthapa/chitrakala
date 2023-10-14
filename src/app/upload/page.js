"use client"
import { app } from '@/lib/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes,deleteObject } from 'firebase/storage';
import Image from 'next/image';
import { useState  } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import Exhibition from '@/components/Exhibition';
import { useRouter } from 'next/navigation';
const Page = () => {

  const uid = useSelector(store=>store.user).uid;
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);



  const handleCategoryChange = (e) => {
    console.log(uid)
    setCategory(e.target.value);
  }
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  }
  const router = useRouter();




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
        const storageRef = ref(storage, `gallery/${today}.png`);
        await uploadBytes(storageRef, image);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);
        console.log('Image uploaded:', downloadURL);

        const data = {
          seller: uid,
          name: title,
          price: price,
          description: description,
          category: category,
          photo: downloadURL
        };

        const res = await axios.post("/api/products", data);
        if (res.status == 200) {
          console.log(" Uploadeed");
          router.push('/gallery') 


        }
        else {
          console.error("Failed................................")
        setLoading(false);

          await deleteObject(storageRef);

        }

        setLoading(false);
        // You can now save the downloadURL to your database or use it in your application as needed
      } catch (error) {
        setLoading(false);

        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <>
      <div className="container m-10 flex justify-center items-center ">

        <form action="#" className="flex flex-col gap-2 justify-center">
      <h1 className='text-center font-extrabold text-2xl '>Post Your Work</h1>

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


          <div className="flex justify-between">

            <select
              className="p-5 border-gray-400 border-2 rounded-md "
              value={category}
              onChange={handleCategoryChange}
              required
            >
              <option  disabled value="" >Category</option>
              <option value="oil">Oil</option>
              <option  value="water">Water</option>
              <option value="sketch">Sketch</option>
              <option value="digital">Digital</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={handlePriceChange}
              className=" border-gray-400 border-2 rounded-md p-2  "
            />
          </div>

          <button
            disabled={loading}
            className="bg-green-900 text-gray-100 rounded py-2 px-4 transition duration-300 hover:bg-green-700"
            onClick={handleFileUpload}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>



        </form>
      </div>

      <Exhibition/>

    </>
  )
}

export default Page