import './globals.css';
import ReduxProvider from '@/components/ReduxProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import SessionProvider from '../../context/SessionProvider';


export const metadata = {
  title: 'Chitrakala - Art Marketplace & Gallery',
  description: 'Art gallery and marketplace.',
}

export default function RootLayout({ children, ...props }) {

  return (
    <html lang="en">
      <body className=''>
        <ReduxProvider>
          <SessionProvider>
            <ToastContainer
              // bodyClassName={() => "text-white"}
              style={{ color: "white" }}
              position="bottom-right"
              autoClose={4000}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition={Zoom}
              limit={4}
            />

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
