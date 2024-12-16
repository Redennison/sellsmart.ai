import '@/styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SellSmart.ai - Get the Best Value for Your Car',
  description: 'SellSmart.ai uses advanced AI to analyze market trends, vehicle condition, and optimal timing to help you get the best price for your car.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

