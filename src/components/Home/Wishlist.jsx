import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import {BsBookmarks} from 'react-icons/bs'

export default function Wishlist({userId}) {
  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
         
                         <Popover.Button
                          type="button"
                          title='Wishlists'
                          className="relative  p-2 rounded-full border-none  text-gray-400 hover:text-white "
                        >
                          <BsBookmarks className='w-5 h-5 xs:w-6 xs:h-6' fill='#1f2937' />
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
                  <div
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          <img src="/brand/logo.svg" alt="" srcset="" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            this is name
                          </p>
                          <p className="text-sm text-gray-500">
                            this is wishlist
                          </p>
                        </div>
                      </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}
