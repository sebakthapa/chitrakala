import { Popover, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { BsBookmarks } from 'react-icons/bs';
import ContentLoader from 'react-content-loader';
import Link from 'next/link';
import axios from 'axios';
import { addWishList, deleteWishList } from '@/redux/features/wishListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';

export default function Wishlist({ userId }) {
  const dispatch = useDispatch();
  const wishlists = useSelector((state) => state.wishList);
  const [loading, setLoading] = useState(true);

  const fetchWishlists = async () => {
    try {
      const response = await axios.get(`/api/wishlist?userId=${userId}`);
      if (response.status === 200) {
        dispatch(addWishList(response.data));
      }
    } catch (error) {
      console.error('Error fetching wishlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteWishlistItem = async (productId) => {
    toast("start")
    try {
      dispatch(deleteWishList(productId));
      toast("dispached")
      const response = await axios.delete(`/api/wishlist`, {
        data: {
          user: userId,
          productId,
        },
      }
      );

      if (response.status === 200) {
        toast.done("Cleared")
      }
    } catch (error) {
      console.error('Error deleting wishlist item:', error);
      toast.error("error")

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlists();
  }, [userId]); // Fetch wishlists whenever userId changes

  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              type="button"
              title="Wishlists"
              className="relative p-2 rounded-full border-none text-gray-400 hover:text-white"
            >
              <BsBookmarks className="w-5 h-5 xs:w-6 xs:h-6" fill="#1f2937" />
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
                    {loading ? (
                      <WishlistLoadingSkeleton />
                    ) : (
                      wishlists.map((wishlist) => (
                        <div key={wishlist._id} className="mb-5 flex">
                          <Link
                            href={`/wishlist/${wishlist._id}`}
                            className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                              <img src={wishlist.photo} alt="Wishlist Icon" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {wishlist.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {wishlist.description}
                              </p>
                              <p className="text-xs w-fit rounded-lg text-gray-100 px-2 bg-green-900">
                                Rs.{wishlist.price}
                              </p>
                            </div>
                          </Link>
                          <button className='text-red-600  hover:text-red-300' onClick={() => deleteWishlistItem(wishlist._id)}>
                            <MdDelete/>
                          </button>
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

const WishlistLoadingSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={100}
      viewBox="0 0 400 100"
      title="🖌️ Loading Wishlists... 🌟"
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
