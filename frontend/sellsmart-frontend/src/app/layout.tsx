import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from '@/components/navbar/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SellSmartAI - Get the Best Value for Your Car',
  description: 'SellSmartAI uses advanced AI to analyze market trends, vehicle condition, and optimal timing to help you get the best price for your car.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <div id="app-container">
            <Navbar />
            <main>{children}</main>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
