"use client"
import { app } from '@/lib/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes,deleteObject } from 'firebase/storage';
import Image from 'next/image';
import { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
const Page = () => {


    const store = useSelector(store=>store?.user);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(store?.photo);
    const [username, setUsername] = useState(store?.username);
    const [address, setAddress] = useState(store?.address);
    const [email, setEmail] = useState(store?.email);
    const [phone, setPhone] = useState(store?.phone);
    const [dob, setDob] = useState(store?.dob);
    const [name, setName] = useState(store?.displayName);
    const [bio, setBio] = useState(store?.bio);
    const [loading,setLoading]=useState(false)
  
  
  
  
    const handleUsername = (e) => {
      setUsername(e.target.value);
    }
    const handleEmail = (e) => {
      setEmail(e.target.value);
    }
  
    const handlePhone = (e) => {
      setPhone(e.target.value);
    }
    const handleAddress = (e) => {
      setAddress(e.target.value);
    }
    const handleDob = (e) => {
      setDob(e.target.value);
    }
    const handleName = (e) => {
      setName(e.target.value);
    }
    const handleBio = (e) => {
      setBio(e.target.value);
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
        const storageRef = ref(storage, `gallery/${today}.png`);
        await uploadBytes(storageRef, image);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);
        console.log('Image uploaded:', downloadURL);


        const data = {
          userId: store.uid,
          username: username,
          displayName: name,
          dob:dob,
          bio:bio,
          email : email,
          phone : phone,
          address: address,
          photo: downloadURL
        };

        const res = await axios.patch("/api/userdetails", data);
        if (res.status == 200) {
          console.log(" Uploadeed");
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
      <div className="container m-10 flex justify-center items-center ">
        <form action="#" className="flex flex-col gap-2 justify-center">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleName}
            className=" border-gray-400 border-2 rounded-md p-2  "
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsername}
            className=" border-gray-400 border-2 rounded-md p-2  "
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
            className=" border-gray-400 border-2 rounded-md p-2  "
          />
          <input
            type="number"
            placeholder="Phone"
            value={phone}
            onChange={handlePhone}
            className=" border-gray-400 border-2 rounded-md p-2  "
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={handleAddress}
            className=" border-gray-400 border-2 rounded-md p-2  "
          />
          <input
            type="date"
            placeholder="DOB"
            value={dob}
            onChange={handleDob}
            className=" border-gray-400 border-2 rounded-md p-2  "
          />
          <textarea
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={handleBio}
            className=" border-gray-400 border-2 rounded-md p-2  "
          />




          <input className='p-5 border-gray-400 border-2 rounded-md' type="file" onChange={handleFileChange} />
          {imageUrl && <Image src={imageUrl} alt="Selected" width="100" height="100" />}



          <button
            disabled={loading}
            className="bg-green-900 text-gray-100 rounded py-2 px-4 transition duration-300 hover:bg-green-700"
            onClick={handleFileUpload}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>



        </form>
      </div>

    </>
  )
}

export default Page