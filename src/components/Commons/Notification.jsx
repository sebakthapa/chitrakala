"use client";
import { app, requestPermission } from "../../configs/firebase.config";
import { IS_CLIENT } from "../../../utils/utils";
import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { Bounce, toast } from "react-toastify";

const registerServiceWorker = async () => {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Registration successful, scope is:", registration.scope);
    });
};

const Notification = () => {
  useEffect(() => {
    IS_CLIENT && requestPermission();
    IS_CLIENT && registerServiceWorker();

    const messaging = IS_CLIENT && getMessaging(app);
    IS_CLIENT &&
      onMessage(messaging, (payload) => {
        // console.log("Message received. vayo hai ", payload);
        toast(payload.notification.title, { transition: Bounce });
      });
  }, []);

  return <div></div>;
};

export default Notification;
