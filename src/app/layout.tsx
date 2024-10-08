import type { Metadata } from 'next';
import Head from 'next/head';
import './globals.css';

export const metadata: Metadata = {
  title: 'Compare your Air',
  description:
    'Compare the air quality between cities in the UK - Created by JKL',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </Head>
      <body className="antialiased bg-gradient-to-r from-purple-400 to-blue-500">
        {children}
      </body>
    </html>
  );
}
