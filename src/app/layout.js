import './globals.css'

export const metadata = {
  title: 'Chitrakala',
  description: 'Art marketplace and showcase.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <div className='flex flex-wrap w-full h-[20rem] gap-1 justify-center items-center '>
                <div>Footer</div>
            </div>
      </body>
    </html>
  )
}
