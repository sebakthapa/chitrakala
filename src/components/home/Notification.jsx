import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import ContentLoader from "react-content-loader";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotification,
  deleteNotification,
  clearAllNotification,
} from "@/redux/features/notificationSlice";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

export default function Notification({ userId }) {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`/api/notifications?userId=${userId}`);
      const { data, message } = await response.json();

      if (response.ok) {
        // console.log(data.notifications)
        dispatch(addNotification(data.notifications));
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications();
  }, []);

  const handleDelete = async (notificationId) => {
    try {
      dispatch(deleteNotification(notificationId));
      const response = await axios.delete(`/api/notifications`, {
        data: { userId, notificationId },
      });
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    }
  };

  const handleClearAll = async () => {
    dispatch(clearAllNotification());
    try {
      const response = await axios.delete(`/api/notifications/clearAll`, {
        data: { userId },
      });

      if (response.ok) {
        toast("Notification deleted");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error.message);
    }
  };

  return (
    <>
      <Popover className="sm:relative">
        {({ open }) => (
          <>
            <Popover.Button
              type="button"
              title="Notifications"
              className="relative p-2 rounded-full border-none text-gray-400 hover:text-white"
            >
              <FaRegBell className="w-5 h-5 xs:w-6 xs:h-6" fill="#1f2937" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="bg-gray-50 p-4 ">
                    {loading ? (
                      // Loading state
                      <>
                        <NotificationLoadingSkeleton />
                        <NotificationLoadingSkeleton />
                      </>
                    ) : notifications.length === 0 ? (
                      // Check for an empty array when not loading
                      <p className="text-gray-500">
                        No notifications to display.
                      </p>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          className="flex justify-between"
                          key={notification._id}
                        >
                          <Link
                            href={notification?.redirect}
                            className="-m-3 mb-5 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                              <Image
                                src={notification?.image}
                                alt="image"
                                width={500}
                                height={500}
                              />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {notification.body}
                              </p>
                              <span className="text-sm text-gray-500  float-right absolute ">
                                {moment(notification.createdAt).calendar()}
                              </span>
                            </div>
                          </Link>
                          <span
                            onClick={() => handleDelete(notification._id)}
                            title="Clear this notification 😲"
                            className="text-red-500 hover:text-red-50 hover:bg-red-500 w-fit h-min rounded-full text-lg"
                          >
                            {" "}
                            <RxCross2 />{" "}
                          </span>
                        </div>
                      ))
                    )}
                    {notifications.length > 0 && (
                      <span
                        onClick={handleClearAll}
                        title="Clear All notification 😆"
                        className="text-red-500 cursor-pointer hover:underline w-fit h-min rounded-full text-xs"
                      >
                        {" "}
                        Clear All{" "}
                      </span>
                    )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
}

const NotificationLoadingSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={100}
      viewBox="0 0 400 100"
      title="🖌️ Loading Notifications... 🔔"
      interval={0.4}
      backgroundColor="#eee"
      foregroundColor="#f9f9f9"
      gradientDirection="top-down"
    >
      <circle cx="39" cy="29" r="29" />
      <rect x="76" y="8" rx="2" ry="2" width="209" height="15" />
      <rect x="76" y="32" rx="2" ry="2" width="209" height="15" />
    </ContentLoader>
  );
};
