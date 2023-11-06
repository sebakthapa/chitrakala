"use client"
import React, { useEffect, useState } from 'react'
import Input from './Input/Input';
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { app } from '@/lib/firebase';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import UploadImage from './Input/UploadImage';
import { addUserData } from '@/redux/features/userSlice';



const UpdateDetails = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const searchParams = useSearchParams();
    const { data: session } = useSession()
    const user = useSelector(state => state.user)

    const { register, handleSubmit, watch, clearErrors, setError, setValue, formState: { errors } } = useForm();


    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.user?.email || "");
    const [username, setUsername] = useState(user?.user?.username || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [phone, setPhone] = useState(user?.user?.phone || "");
    const [dob, setDob] = useState("");
    //address states
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [dragging, setDragging] = useState(false);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(user?.photo || null);
    const [dataModified, setDataModified] = useState(false);


    let uploadedImage = null;


    const handleFormSubmit = async (data) => {
        setIsSubmitting(true);
        uploadedImage = null;

        if (!session?.user.id) {
            toast.error("Login to update details.");
            router.push(searchParams.get("returnurl") ? searchParams.get("returnurl") : "/");
            return;
        }
        if (!user?.user._id) {
            toast.error("wait a few seconds or reload and try again.");
            router.push(searchParams.get("returnurl") ? searchParams.get("returnurl") : "/");
            return;
        }

        try {
            let userRes, userDetailsRes;

            const userData = {};

            if (username != user?.user.username) userData.username = username;
            if (email != user?.user.email) userData.email = email;
            if (phone != user?.user.phone) userData.phone = phone;

            if (Object.keys(userData).length > 0) {
                userRes = await axios.patch(`/api/users/${session?.user.id}`, userData);
                if (userRes?.status == 200) {
                }
            } else {
            }

            const userDetailsData = {}
            if (bio != user?.bio) userDetailsData.bio = bio;
            if (name != user?.name) userDetailsData.name = name;
            if (dob != user?.dob) userDetailsData.dob = dob;
            if (country != user?.address?.country) userDetailsData.address = { ...userDetailsData.address, country };
            if (state != user?.address?.state) userDetailsData.address = { ...userDetailsData.address, state };
            if (city != user?.address?.city) userDetailsData.address = { ...userDetailsData.address, city };
            if (street != user?.address?.street) userDetailsData.address = { ...userDetailsData.address, street };

            // userDetailsData



            if (imageUrl != user?.image) {
                const imageData = await handleFileUpload();
                if (imageData) {
                    uploadedImage = imageData?.storageRef;
                    userDetailsData.image = imageData.downloadURL;
                } else {
                    toast("unable to upload image at the moment.")
                }
            } else {
            }

            if (Object.keys(userDetailsData).length == 0 && Object.keys(userData).length == 0) {
                toast("No changes made to update!")
                router.push(searchParams.get("returnurl") ? searchParams.get("returnurl") :  "/");
                return;
            } 

            if (Object.keys(userDetailsData).length > 0) {
                userDetailsRes = await axios.patch(`/api/userdetails/${session?.user.id}`, userDetailsData);
                if (userDetailsRes?.status == 200) {
                }
                else {
                    await deleteObject(storageRef);
                }
            } else {
            }

            if (!userRes || userRes?.status == 200) {
                if (!userDetailsRes || userDetailsRes?.status == 200) {
                    const newUserDetails = {}
                    dispatch(addUserData({...userDetailsRes?.data, user: {...userRes?.data}}))
                    router.push(searchParams.get("returnurl") ? searchParams.get("returnurl") : "/");
                    toast("Details updated successfully")
                }
            }




        } catch (error) {
            uploadedImage && await deleteObject(uploadedImage);
            uploadedImage = null;
            if (error?.response?.data?.field) {
                const { field, message } = error?.response?.data;
                if (field == "multiple") {
                    toast.error(`Unable to proceed! ${message}`);
                } else {
                    setError(field, { message })
                }
            } else {
                throw error;
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleFileUpload = async () => {
        if (!session?.user.id) {
            toast("Please login to add details")
            return;
        };
        if (image) {
            try {
                const storage = getStorage(app);
                var today = new Date();
                const storageRef = ref(storage, `gallery/${today}.png`);
                await uploadBytes(storageRef, image);

                // Get the download URL of the uploaded image
                const downloadURL = await getDownloadURL(storageRef);
                return { downloadURL, storageRef };

                // You can now save the downloadURL to your database or use it in your application as needed
            } catch (error) {
                setLoading(false);

            }
        }
    };

    const handleSkip = () => {
        const returnUrl = searchParams.get("returnUrl")
        console.log(returnUrl)
        returnUrl ? router.push(returnUrl) : router.push("/")
    }

    useEffect(() => {
        if (user?.user?._id && !dataModified) {
            const { name, user: userData, bio, image,dob, address:{country, state, city, street} } = user;
            const { email, phone, username } = userData;
            setName(name || "")
            setBio(bio || "")
            setImageUrl(image || null)
            setEmail(email || "")
            setPhone(phone || "")
            setUsername(username || "")
            console.log(dob)
            setDob(dob || "");
            setCity(city || "")
            setCountry(country || "")
            setState(state || "")
            setStreet(street || "")
        }
    }, [user])

    return (
        <form action="" onSubmit={handleSubmit(handleFormSubmit)} className=''>
            <div className="input_field_container flex flex-col gap-20">
                <div className="input_row flex-col xs:flex-row items-center xs:gap-10  h-fit border-">

                    <div className='shrink-0 xs:scale-[0.85] -my-7 '>
                        <UploadImage
                            key={"profileImage"}
                            label={"your photo"}
                            type={"profile"}
                            placeholder={"About you (in short)..."}
                            setImage={setImage}
                            setImageUrl={setImageUrl}
                            imageUrl={imageUrl}
                            setDragging={setDragging}
                        />
                    </div>


                    <div className='flex flex-col xs:py-2 h-full xs:items-between gap-5 xs:gap-10 xs:mb-12 w-full'>
                        <Input
                            key={"fullname"}
                            label={"full name"}
                            type={"text"}
                            value={name}
                            setValue={setName}
                            register={register}
                            validation={{
                                maxLength: { value: 30, message: "Can't exceed 30 characters" },
                                minLength: { value: 3, message: "Min 3 characters required" },
                            }}
                            error={errors?.fullname}
                        />

                        <Input
                            key={"username"}
                            label={"username"}
                            type={"text"}
                            value={username}
                            setValue={setUsername}
                            register={register}
                            validation={{
                                maxLength: { value: 30, message: "Enter less than 30 characters" },
                                minLength: { value: 5, message: "Minimum 5 characters required" },
                                pattern: {
                                    value: /^[a-zA-Z][a-zA-Z0-9._]*$/,
                                    message: "Only letters, numbers, underscores, and periods."
                                },
                            }}
                            error={errors?.username}
                            clearErrors={clearErrors}
                        />
                    </div>
                </div>



                {/* <Input
                    label={"email"}
                    type={"email"}
                    value={email}
                    setValue={setEmail}
                    register={register}
                    validation={{
                        maxLength: { value: 50, message: "Enter less than 50 characters" },
                        pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Enter a valid Email" },
                    }}
                    error={errors?.email}
                    clearErrors={clearErrors}
                /> */}

                <Input
                    key={"phone"}
                    register={register}
                    validation={{
                        pattern: {
                            maxLength: { value: 10, message: "Enter 10 digit phone number." },
                            minLength: { value: 10, message: "Enter 10 digit phone number." },
                            value: /^\d{10}$/,
                            message: "Enter 10 digits phone number."
                        },
                    }}
                    error={errors?.phone}
                    clearErrors={clearErrors}
                    type="tel"
                    label="phone"
                    value={phone}
                    setValue={setPhone}
                    classLists=""

                />

                <Input
                    label={"bio"}
                    type={"textarea"}
                    placeholder={"About you (in short)..."}
                    value={bio}
                    setValue={setBio}
                />

                <Input
                    label={"date of birth"}
                    type={"date"}
                    value={dob}
                    setValue={setDob}
                />



                <div className="addressDetail capitalize">
                    <label className=''>Address</label>
                    <div className="inputs grid grid-cols-1 xxs:grid-cols-2 gap-5">
                        <Input
                            type="text"
                            placeholder="Country"
                            value={country}
                            setValue={setCountry}
                            classLists={"capitalize"}
                        />
                        <Input
                            type="text"
                            placeholder="State"
                            value={state}
                            setValue={setState}
                            classLists={"capitalize"}

                        />
                        <Input
                            type="text"
                            placeholder="City"
                            value={city}
                            setValue={setCity}
                            classLists={"capitalize"}

                        />
                        <Input
                            type="text"
                            placeholder="Street"
                            value={street}
                            setValue={setStreet}
                            classLists={"capitalize"}

                        />
                    </div>

                </div>

            </div>
            <div className="buttons flex gap-7 mt-5">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className={`${isSubmitting || (errors?.email?.message || errors?.phone?.message || errors?.username?.message) && "pointer-events-none"} bg-[#0276FF] text-white hover:bg-[#1C84FF] w-fit mt-5`}
                    type="submit" >
                    {
                        isSubmitting ? (
                            "Submitting..."
                        ) : (
                            "Submit"
                        )
                    }
                </motion.button>
                <motion.button
                    onClick={handleSkip}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className={`${isSubmitting || (errors?.email?.message || errors?.phone?.message || errors?.username?.message) && "pointer-events-none"} bg-red-600 rounded text-white hover:bg-red-500 w-fit mt-5`}
                    title="Skip for now? You an always update your details later."
                >
                    Skip Now
                </motion.button>
            </div>


        </form>
    )
}

export default UpdateDetails
