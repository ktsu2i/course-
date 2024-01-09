import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider, currentUser } from '@clerk/nextjs';

import ToasterProvider from '@/components/providers/ToasterProvider';
import Sidebar from '@/components/sidebar/Sidebar';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Course Manager',
  description: 'Created by Kaito Tsutsui',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ToasterProvider />
          <div className="hidden">
            <Navbar />
          </div>
          <Sidebar />
          <main className="pl-64">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
