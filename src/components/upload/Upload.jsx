"use client";
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
import Input from "@/components/Input/Input";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

import React from "react";
import { deleteFollowingArts } from "@/redux/features/gallerySlice/followingSlice";
import { deletePopularArts } from "@/redux/features/gallerySlice/popularSlice";
import { deleteRecentArts } from "@/redux/features/gallerySlice/recentSlice";

const Upload = () => {
  const { data: session } = useSession();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [notForSale, setNotForSale] = useState(false);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const user = useSelector((state) => state.user);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
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
      setImage(null);
      setImageUrl(null);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login to upload");
    }
    if (image) {
      try {
        setLoading(true);
        const storage = getStorage(app);
        var today = new Date();
        const storageRef = ref(storage, `gallery/${today}.png`);
        await uploadBytes(storageRef, image);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        const data = {
          artist: user?._id,
          name: title,
          price: price,
          description: description,
          category: category,
          photo: downloadURL,
          height,
          width,
          notForSale,
        };

        const res = await axios.post("/api/products", data);
        if (res.status == 200) {
          router.push("/arts/recent");
          toast.success("Upload success!");
        } else {
          console.error("Failed................................");
          setLoading(false);
          await deleteObject(storageRef);
        }

        // You can now save the downloadURL to your database or use it in your application as needed
      } catch (error) {
        console.error("Error uploading image:", error);
        const res = error?.response;
        // console.log(res);
        if (res?.data?.message) {
          toast.error(res.data.message);
        }
      } finally {
        setLoading(false);
      }
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

    setImageUrl(files[0]);
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
      <form
        action="#"
        onSubmit={handleFileUpload}
        className="flex flex-col gap-8 justify-center w-full bg-white p-10 shadow-md "
      >
        <h1 className="text-center font-extrabold text-3xl mb-4">
          Showcase your Masterpiece
        </h1>

        <div className=" image input_field_container ">
          <label htmlFor="uploadimage" className="text-gray-500 -mb-2">
            Your Work<span className="text-red-500">*</span>
          </label>

          <input
            name="artPhoto"
            id="uploadimage"
            className=" m-0 w-0 h-0 border-gray-300 hover:border-gray-400 transition border-2 rounded-md"
            type="file"
            label={"Upload Image"}
            required
            onChange={handleFileChange}
          />
          <div
            className="rounded -mt-6 relative flex items-center justify-center border-dashed border-2 border-gray-500 w-full h-auto min-h-[300px] p-1"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {imageUrl && (
              <button
                title="Clear Image"
                onClick={() => {
                  setImage(null);
                  setImageUrl("");
                }}
                className="clearImage absolute bg-red-500 rounded-full p-1 -top-2 -right-2 text-gray-200 hover:scale-105 transition active:scale-95"
              >
                <RxCross2 className="text-gray-100 font-extrabold w-6 h-6" />
              </button>
            )}

            {imageUrl ? (
              <Image
                className="h-auto max-h-[500px] w-full object-contain"
                src={imageUrl}
                alt="Selected"
                width="300"
                height="300"
              />
            ) : (
              <div className="text-xl p-4 -mt-5 flex flex-col justify-center items-center h-full w-full">
                <span>
                  <AiOutlineCloudUpload className="w-20 h-20" />
                </span>
                <p>
                  <span>Drag and drop your image or </span>{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() =>
                      document.querySelector("#uploadimage").click()
                    }
                  >
                    {" "}
                    browse
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
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
          <label htmlFor="post-description" className="text-gray-500">
            Description
          </label>
          <textarea
            type="text"
            id="post-description"
            value={description}
            placeholder="Every masterpiece has its background. Tell us about this..."
            onChange={handleDescriptionChange}
            className=" bg-transparent border-2 border-gray-300 hover:border-gray-400 transition duration-300 rounded -mt-3 py-[0.4rem] pl-3 pr-9 placeholder:text-sm placeholder:text-slate-300 "
          />
        </div>

        <div className="flex flex-wrap justify-between items-center gap-5">
          <div className=" input_field_container flex-1 flex flex-row justify-between">
            <div className="flex flex-col gap-3">
              <label htmlFor="post-category" className="text-gray-500">
                Category<span className="text-red-500">*</span>
              </label>
              <select
                id="post-category"
                className="py-2 px-5 text-gray-400 hover:text-gray-600 focus:text-gray-700 -mt-2 border-gray-300 hover:border-gray-400 transition cursor-pointer border-2 rounded "
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <option disabled value="">
                  Choose category..
                </option>
                <option value="oil">Oil</option>
                <option value="water">Water</option>
                <option value="sketch">Sketch</option>
                <option value="digital">Digital</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="input_field_container flex-1">
            <Input
              disabled={notForSale}
              placeholder={notForSale && "Not applicable"}
              title={
                notForSale && "Price not needed for arts marked 'not for sale'."
              }
              type="number"
              value={price}
              label={"Price"}
              setValue={setPrice}
              onChange={handlePriceChange}
              className=" border-gray-400 border-2 rounded-md p-2 "
              required={!notForSale}
            />
          </div>
        </div>
        <div className="input_field_container">
          <label className="-mb-3 " htmlFor="width">{`Size(cms)`}</label>
          <div className="flex flex-wrap items-center -mt-4 gap-4">
            <Input
              type="number"
              placeholder="Width"
              value={width}
              setValue={setWidth}
              className=""
              id="width"
              containerClassName={`flex-1`}
            />
            <Input
              type="number"
              placeholder="Height"
              value={height}
              setValue={setHeight}
              containerClassName={`flex-1`}
            />
          </div>
          <div className="input_field_container">
            <div className="flex items-center gap-4">
              <input
                className="h-4 w-4"
                checked={notForSale}
                type="checkbox"
                label={"Not for Sale"}
                onChange={() => setNotForSale((prev) => !prev)}
              />
              <label htmlFor="">Not for Sale</label>
            </div>
          </div>
        </div>
        <button
          disabled={loading || (session ? false : true)}
          title={`${user?._id ? "" : "Login or Signup to Upload"}`}
          className={`bg-green-700 text-gray-100 rounded py-2 px-4 transition duration-300  ${session ? "hover:bg-green-800" : " cursor-not-allowed opacity-60 hover:bg-green-700"}`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </>
  );
};

export default Upload;
