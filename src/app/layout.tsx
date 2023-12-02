import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.scss'
import Image from 'next/image'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'TaskManager',
  description: 'Simple task manager web app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className} style={{ position: 'relative', height: '100dvh' }}>
        <Image
          src={'/main-bg.jpg'}
          alt="main-bg"
          style={{ zIndex: -1 }}
          fill
          priority
        />

        <div className="wrapper">
          {children}
        </div>

      </body>
    </html>
  )
}
