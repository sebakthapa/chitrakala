"use client";
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js",
);

const firebaseConfig = {
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
const app = firebase.initializeApp(firebaseConfig);
const messaging = typeof window != undefined && firebase.messaging();
typeof window != undefined &&
  messaging.onBackgroundMessage((payload) => {
    // console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "./brand/mdLogo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
