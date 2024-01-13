"use client"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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
  storageBucket: "gs://chitrakala-4f296.appspot.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const storeImage = async (path) => {
  try {
    const storage = getStorage(app);
    const storageRef = ref(storage, path)

  } catch (error) {
    console.log("ERROR uploading Image \n" + error)
  }
}

export default storeImage


export const sendEmailVerificationLink = async () => {
  const addUser = async () => {
    const { uid, displayName, photoURL, emailVerified, } = auth.currentUser;
    const data = {
      uid,
      displayName,
      photoURL,
      emailVerified
    }
    try {
      await addDoc(collection(db, "users"), data);
    } catch (err) {
      console.log("ERROR SAVING USER TO FIRESTORE\n")
      console.log(err)
    }
  }
  try {
    await sendEmailVerificationLink(auth.currentUser);
    console.log("Verification link sent");
    const emailVerificationInterval = setInterval(() => {
      auth?.currentUser?.reload()
        .then(ok => {
          if (auth?.currentUser) {
            if (auth.currentUser.emailVerified) {
              // addUser()
              location.reload();
              clearInterval(emailVerificationInterval);
            }

          } else {
            clearInterval(emailVerificationInterval)

          }
        })
    }, 1000)
  }
  catch (err) {
    console.log(err);
    alert(getErrMsg(err.message));
  }
}

export const messaging = getMessaging(app);




export function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission()
    .then((permission) => {
      console.log("insider req")
      if (permission === 'granted') {
        console.log('Notification permission granted.');

        getToken(
          messaging,
          { vapidKey: 'BFmqko324doub33JHrjbYqOc30pGsN8dJqKZjmysr9ZGojgD0yu-8VQ-w-lsL3qeWuCTk_Bw4WjR34HBPf8AYgo' }
        )
          .then((currentToken) => {
            if (currentToken) {
              console.log("Token Generated",currentToken)
              // Send the token to your server and update the UI if necessary
              // ...
            } else {
              // Show permission request UI
              console.log('No registration token available. Request permission to generate one.');
              // ...
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
          });
      }
    })

}

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});


