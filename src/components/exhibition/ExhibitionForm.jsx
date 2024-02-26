"use client";
import React from "react";
import { app } from "../../configs/firebase.config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Input from "../Input";
import { FileUploader } from "react-drag-drop-files";
import { FaArrowRotateLeft } from "react-icons/fa6";

const fileTypes = ["JPG", "PNG", "GIF"];

const ExhibitionForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [drag, setDrag] = useState(true);
  const [drop, setDrop] = useState(false);
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [location, setLocation] = useState('');
  // const [datetime, setDateTime] = useState('');
  const [loading, setLoading] = useState(false);

  const { title, description, location, openDate, closeDate } = formData;

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  };

  const handleDrop = () => {
    setDrop(true);
  };

  const handleFileChange = (file) => {
    if (file) {
      const selectedFile = file;
      setImage(selectedFile);
      // Display the selected image preview (optional)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);

      // console.log(imageUrl)
    } else {
      setImage(null);
      setImageUrl(null);
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

        const data = {
          title,
          description,
          location,
          openDate,
          closeDate,
          photo: downloadURL,
        };

        const res = await axios.post("/api/exhibition", data);
        if (res.status == 200) {
          toast.success("Updated..");

          router.push("/exhibition");
        } else {
          toast.error("Error occured..");
          console.error("Failed................................");
          await deleteObject(storageRef);
        }

        setLoading(false);
        // You can now save the downloadURL to your database or use it in your application as needed
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <>
      <h1 className="mainHead self-stretch font-serif bg-white sm:m-5 p-5   ">
        Upload Exhibition Details
        {/* <span className="font-semibold font-sans text-5xl animate_blink">_</span> */}
        <p className=" text-sm xxs:text-base  sm:text-[1.08rem]  leading-relaxed text-gray-700 antialiased py-5">
          Upload for exhibition showcase.
        </p>
      </h1>
      <section className=" formContainer self-stretch p-5 flex justify-center  sm:m-5 bg-white  ">
        <form action="#" className=" flex flex-col w-full sm:w-1/2 ">
          <label
            htmlFor="photo"
            className="block  text-sm font-bold text-gray-900 "
          >
            Photo<span className="text-red-500 ml-0">*</span>
          </label>

          <FileUploader
            handleChange={handleFileChange}
            id="photo"
            classes="my-5 "
            name="file"
            types={fileTypes}
            // children = {[DragDrop]}
            onDraggingStateChange={() => setDrag((prev) => !prev)}
            onDrop={handleDrop}
            onSelect={handleDrop}
          >
            {!drop ? (
              <p
                className={`p-5 w-full text-center flex flex-col font-semibold gap-1 border-2 rounded-lg border-dotted ${drag ? `opacity-0` : "opacity-100"}`}
              >
                <span className={`text-2xl text-[rgba(0,0,0,.3)] `}>
                  Drag & drop image here{" "}
                </span>

                <span className="text-base  text-[rgba(0,0,0,.4)]">
                  or &nbsp;
                  <span className="text-blue-600 opacity-90 underline font-bold cursor-pointer hover:no-underline">
                    Browse images
                  </span>
                  &nbsp;on your device
                </span>
              </p>
            ) : (
              <p
                className={`p-5 w-full text-center flex flex-col font-semibold gap-1 border-2 rounded-lg border-dotted `}
              >
                <span className={`text-2xl text-[rgba(0,0,0,.3)] `}>
                  {imageUrl && (
                    <>
                      <div className="flex justify-between items-center m-2">
                        <Image
                          className=" group-hover:text-gray-700 "
                          src={imageUrl}
                          alt="Selected"
                          width="100"
                          height="100"
                        />
                        <button
                          onClick={() => {
                            setImage(null);
                            setImageUrl(null);
                            setDrop(false);
                          }}
                          className="group text-gray-500  h-fit "
                        >
                          <FaArrowRotateLeft />{" "}
                        </button>
                      </div>
                    </>
                  )}
                </span>
              </p>
            )}
          </FileUploader>
          {/* <input
            className='p-5 border-gray-300 bg-transparent border-2 hover:border-gray-400 my-2 rounded-md'
            type="file"
            accept=".jpg,.jpeg,.png"
            name='photo'
            id='photo'
            onChange={handleFileChange}
             /> */}

          <label
            htmlFor="title"
            className="block  text-sm font-bold text-gray-900 "
          >
            Title<span className="text-red-500 ml-0">*</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
            className=" border-gray-300 bg-transparent border-2 hover:border-gray-400 my-2 rounded-md p-2  "
          />

          <label
            htmlFor="description"
            className="block  text-sm font-bold text-gray-900 "
          >
            About Exhibition<span className="text-red-500 ml-0">*</span>
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={handleChange}
            className=" border-gray-300 bg-transparent border-2 hover:border-gray-400 my-2 rounded-md p-2  "
          />

          <label
            htmlFor="openDate"
            className="block  text-sm font-bold text-gray-900 "
          >
            Open Day of Exhibition<span className="text-red-500 ml-0">*</span>
          </label>

          <input
            type="datetime-local"
            name="openDate"
            id="openDate"
            value={openDate}
            onChange={handleChange}
            className=" border-gray-300 bg-transparent border-2 hover:border-gray-400 my-2 rounded-md p-2  "
          />
          <label
            htmlFor="closeDate"
            className="block  text-sm font-bold text-gray-900 "
          >
            Closing Day of Exhibition
            <span className="text-red-500 ml-0">*</span>
          </label>

          <input
            type="datetime-local"
            name="closeDate"
            id="closeDate"
            value={closeDate}
            onChange={handleChange}
            className=" border-gray-300 bg-transparent border-2 hover:border-gray-400 my-2 rounded-md p-2  "
          />

          <label
            htmlFor="location"
            className="block  text-sm font-bold text-gray-900 "
          >
            Location<span className="text-red-500 ml-0">*</span>
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={handleChange}
            className=" border-gray-300 bg-transparent border-2 hover:border-gray-400 my-2 rounded-md p-2  "
          />

          <button
            disabled={loading}
            className="bg-gray-900 my-2 text-gray-100 rounded py-2 px-4 transition duration-300 hover:bg-gray-700"
            onClick={handleFileUpload}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </section>
    </>
  );
};

export default ExhibitionForm;
