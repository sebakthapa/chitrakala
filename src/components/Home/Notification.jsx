import { Popover, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { FaRegBell } from 'react-icons/fa';
import ContentLoader from 'react-content-loader';



export default function Notification({ userId }) {
  const [notifications, setNotifications] = useState([]); // Initialize with an empty array

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`/api/notifications?userId=${userId}`);
      const data = await response.json();

      if (response.ok) {
        setNotifications(data.data.notifications);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
    }
  };

  return (
    <>
      <Popover className="relative">
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
                  <div className="bg-gray-50 p-4">
                    {notifications.length === 0 ? (
                      // Check for an empty array to determine the loading state
                      <>
                      <NotificationLoadingSkeleton />
                      <NotificationLoadingSkeleton />
                      </>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification._id} // Add a unique key based on your notification data
                          className="-m-3 mb-5 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                            <img src="/brand/logo.svg" alt="" srcSet="" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500">{notification.body}</p>
                          </div>
                        </div>
                      ))
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