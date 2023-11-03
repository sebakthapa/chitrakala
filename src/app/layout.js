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
      <body className=''>
        <ReduxProvider>
          <SessionProvider>
            <ToastContainer position="bottom-right" />

            <Navbar />
            < div className='max-w-[2000px] m-auto min-h-screen'>
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
