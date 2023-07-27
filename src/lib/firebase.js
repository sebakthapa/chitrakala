// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  apiKey: "AIzaSyC1RtqA5ocwrEySXAB4okYd-5PHfeIdUgk",
  authDomain: "chitrakala-4f296.firebaseapp.com",
  projectId: "chitrakala-4f296",
  storageBucket: "chitrakala-4f296.appspot.com",
  messagingSenderId: "134484758915",
  appId: "1:134484758915:web:25d9bdb0196b9f5ce126b6",
  measurementId: "G-NCV0JSF0LW",
  storageBucket:"gs://chitrakala-4f296.appspot.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);



export default async (path) => {
  try {
    const storage = getStorage(app);  
    const storageRef = ref(storage, path)
    
  } catch (error) {
      console.log("ERROR uploading Image \n" + error)
  } 


}