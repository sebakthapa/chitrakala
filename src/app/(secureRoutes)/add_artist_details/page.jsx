"use client"
import { app } from '@/lib/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';
import Image from 'next/image';
import { useEffect, useState } from 'react'
import axios from 'axios';
import Exhibition from '@/components/Exhibition';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';



const Page = () => {
    const user = useSelector(state => state.user)

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(user?.photo || null);

    const [title, setTitle] = useState(user?.displayName || "");
    const [description, setDescription] = useState(user?.bio || "");
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const [loading, setLoading] = useState(false);
    const [dragging, setDragging] = useState(false);


    const handleCategoryChange = (e) => {
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
        e.preventDefault();
        if (!user?.uid) {
            toast("Please login to add details")
        };
        if (image) {
            try {
                setLoading(true);
                const storage = getStorage(app);
                var today = new Date();
                const storageRef = ref(storage, `gallery/${today}.png`);
                await uploadBytes(storageRef, image);

                // Get the download URL of the uploaded image
                const downloadURL = await getDownloadURL(storageRef);
                console.log('Image uploaded:', downloadURL);


                const data = {
                    seller: user.uid,
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


    const handleDragOver = (e) => {
        e.preventDefault();
        console.log("yes")
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
        console.log('Dropped files:', files);

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

    useEffect(() => {
        toast("Fill these details to become an artist on Chitrakala.", { autoClose: 10000 });

    }, [])


    useEffect(() => {
        if (user) {
            setTitle(user?.displayName || "");
            setDescription(user?.bio || "");
        }
    }, [user])


    return (
        <>

            <div className="container my-12 w-full max-w-[600px] flex justify-center items-center mx-auto ">

                <form action="#" className="flex flex-col gap-8 justify-center w-full  px-3 ">
                    <div className="title flex flex-col">
                        <h1 className=' font-extrabold text-3xl'>Personal Details</h1>
                        <h6 className='gap-2 opacity-75'>Fill these details to become artist on Chitrakala.</h6>
                    </div>


                    <div className="title input_field_container">
                        <Input
                            // register={register}
                            // error={errors["username/email/phone"]}
                            // clearErrors={clearErrors}  
                            required
                            type="text"
                            label="Title"
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

                    <div className="image input_field_container ">
                        <label className='text-gray-600' htmlFor="uploadimage">Your Image<span className='text-red-500'>*</span></label>
                        <input required id="uploadimage" className='p-5 hidden border-gray-300 hover:border-gray-400 transition border-2 rounded-md' name="profilePhoto" type="file" label={"Upload Image"} onChange={handleFileChange} />
                        <div
                            className={`rounded relative flex items-center justify-center border-dashed border-2 border-gray-500 w-full h-auto min-h-[300px] p-1 transition   ${dragging && " scale-95 border-blue-500 border-4"}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}>
                            {
                                imageUrl && (
                                    <button title='Clear Image' onClick={() => { setImage(null); setImageUrl('') }} className="clearImage absolute bg-red-500 rounded-full p-1 -top-2 -right-2 text-gray-200 hover:scale-105 transition active:scale-95">
                                        <RxCross2 className='text-gray-100 font-extrabold w-6 h-6 ' />
                                    </button>
                                )
                            }

                            {
                                imageUrl ? <Image className='h-auto max-h-[500px] w-full object-contain' src={imageUrl} alt="Selected" width="300" height="300" /> : (
                                    <div className='text-xl p-4 flex flex-col justify-center items-center h-full w-full'>
                                        <span className='pointer-events-none text-red-50'><AiOutlineCloudUpload className='w-20 h-20 pointer-events-none' /></span>
                                        {
                                            dragging ?
                                                <p className='text-center  pointer-events-none'>Release to add</p>
                                                :
                                                <p className='text-center '>
                                                    <span className=''>Drag and drop your image or </span>  <span className='text-blue-500 cursor-pointer' onClick={() => document.querySelector("#uploadimage").click()}> browse</span>
                                                </p>}
                                    </div>
                                )}
                        </div>
                    </div>






                    <div className="flex flex-col xs:flex-row xs:items-center gap-5 justify-start   items-start ">

                        <div className=" w-full  input_field_container flex flex-row   justify-between items-center">
                            <div className="flex w-full flex-col gap-3 ">

                                <label htmlFor="post-category" className='text-gray-500 -mb-2' >Category</label>
                                <select
                                    id='post-category'
                                    className="py-2 px-5 mb-1   w-full border-gray-300 hover:border-gray-400 transition cursor-pointer border-2 rounded "
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



                        <div className="input_field_container w-full ">
                            <Input
                                type="number"
                                placeholder="Price"
                                value={price}
                                label={"Price"}
                                setValue={setPrice}
                                onChange={handlePriceChange}
                                className=" border-gray-400 border-2 rounded-md p-2  w-full "
                            />
                        </div>
                    </div>
                    <div className="btns gap-5 flex" >
                        <button
                            disabled={loading || (user?.uid ? true : false)}
                            title={`${user?.uid ? "" : "Login or Signup to Upload"}`}
                            className={`bg-green-700 text-gray-100 rounded py-2 px-5 transition duration-300  ${user?.uid ? "hover:bg-green-800" : " cursor-not-allowed opacity-60 hover:bg-green-700"}`}
                            onClick={handleFileUpload}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button
                            title="Skip now and continue as viewer"
                            className={`bg-red-600 text-gray-50 rounded py-2 px-5 transition duration-300  hover:bg-red-500`}
                            onClick={() => { router.back() }}
                        >
                            Skip now
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Page