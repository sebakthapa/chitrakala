import { useDispatch } from 'react-redux';
import './globals.css';
import ReduxProvider from '@/components/ReduxProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import SessionProvider from '../../context/SessionProvider';


export const metadata = {
  title: 'Chitrakala - Art Marketplace & Gallery',
  description: 'Art marketplace and showcase.',
}

export default function RootLayout({ children, ...props }) {

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <SessionProvider>
            <ToastContainer position="bottom-right" />

            <Navbar />
            <div className='flex flex-wrap w-full min-h-screen gap-1 justify-center items-center '>
              {children}
              {/* <Notification /> */}

            </div>
            <Footer />
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
