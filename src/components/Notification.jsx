"use client"
import { messaging, requestPermission } from "@/lib/firebase"
import { onMessage } from "firebase/messaging"
import { useEffect } from "react"

const Notification = () => {
  useEffect(() => {
    requestPermission();
  }, [])

  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
  });
  return (
    <div>
      
    </div>
  )
}

export default Notification
