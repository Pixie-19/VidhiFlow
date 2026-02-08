import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { TamboProviders } from '@/providers/TamboProviders';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VidhiFlow – AI for Indian Judiciary',
  description: 'MCP-native Generative UI platform for the Indian Judiciary',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="min-h-screen font-sans antialiased">
        <TamboProviders>{children}</TamboProviders>
      </body>
    </html>
  );
}
