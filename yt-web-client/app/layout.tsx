import styles from './globals.module.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './navbar/navbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vod review saves lives',
  description: 'perfect practice makes perfect',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={styles.background} >
        <NavBar />
          { children  } 
      </body>
    </html>
  )
}
