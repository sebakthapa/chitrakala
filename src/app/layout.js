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
      </body>
    </html>
  )
}
