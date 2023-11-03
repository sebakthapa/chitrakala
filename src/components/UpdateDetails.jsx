"use client"
import React, { useEffect, useState } from 'react'
import Input from './Input/Input';
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { app } from '@/lib/firebase';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';



const UpdateDetails = () => {
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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [dragging, setDragging] = useState(false);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(user?.photo || null);
    const [dataModified, setDataModified] = useState(false);


    let uploadedImage = null;

    console.log(errors)

    const handleFormSubmit = async () => {
        setIsSubmitting(true);
        uploadedImage = null;

        if (!session?.user.id) {
            toast.error("Wait few seconds and try again!");
            return;
        }

        try {
            const userData = {
            }
            if (username != user?.user.username) userData.username = username;
            if (email != user?.user.email) userData.email = email;
            if (phone != user?.user.phone) userData.phone = phone;


            if (Object.keys(userData).length > 0) {
                const userRes = await axios.patch(`/api/users/${session?.user.id}`, userData);
                if (userRes.status == 200) {
                    console.log("User Data Updated");
                }
                else {
                    console.error("Failed User update")
                }
            }

            const userDetailsData = {
                bio,
                name,
            }

            if (imageUrl != user?.image) {
                const imageData = await handleFileUpload();
                uploadedImage = imageData.storageRef;
                userDetailsData.image = imageData.downloadURL;
            }

            const userDetailsRes = await axios.patch(`/api/userdetails/${session?.user.id}`, userDetailsData);
            if (userDetailsRes.status == 200) {
                console.log("User Details Data Updated");
            }
            else {
                await deleteObject(storageRef);
                console.error("Failed User Details update")
            }
            router.push(searchParams.get("returnurl") || "/");
            toast("Details updated successfully")

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
        if (!user?.id) {
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
                console.log('Image uploaded:', downloadURL);
                return { downloadURL, storageRef };

                // You can now save the downloadURL to your database or use it in your application as needed
            } catch (error) {
                setLoading(false);

                console.error('Error uploading image:', error);
            }
        }
    };

    useEffect(() => {
        if (user?.user?._id && !dataModified) {
            const { name, user: userData, bio, image, } = user;
            const { email, phone, username } = userData;
            setName(name || "")
            setBio(bio || "")
            setImageUrl(image || null)
            setEmail(email || "")
            setPhone(phone || "")
            setUsername(username || "")
        }
    }, [user])

    return (
        <form action="" onSubmit={handleSubmit(handleFormSubmit)} className=''>
            <div className="input_field_container  flex flex-col gap-20">
                <div className="input_row gap-4">
                    <Input
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
                    label={"Your photo"}
                    type={"image"}
                    placeholder={"About you (in short)..."}
                    value={bio}
                    setImage={setImage}
                    setImageUrl={setImageUrl}
                    imageUrl={imageUrl}
                    setDragging={setDragging}
                />

            </div>
            <div className="buttons flex gap-7">
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
                    onClick={() => router.push(searchParams.get("returnUrl") || "/")}
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
