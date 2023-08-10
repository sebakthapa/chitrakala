import { useDispatch } from 'react-redux';
import './globals.css';
import ReduxProvider from '@/components/ReduxProvider';


export const metadata = {
  title: 'Chitrakala',
  description: 'Art marketplace and showcase.',
}

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          <div className='flex flex-wrap w-full h-[20rem] gap-1 justify-center items-center '>
            <div>Footer</div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  )
}
