import { useDispatch } from 'react-redux';
import './globals.css';
import ReduxProvider from '@/components/ReduxProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import SessionProvider from '../../context/SessionProvider';


export const metadata = {
  title: 'Chitrakala',
  description: 'Art marketplace and showcase.',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <SessionProvider>
            <ToastContainer position="bottom-right"  />

            <Navbar />
            {children}
            <div className='flex flex-wrap w-full h-[20rem] gap-1 justify-center items-center '>
              {/* <Notification /> */}
              <Footer />
            </div>
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
