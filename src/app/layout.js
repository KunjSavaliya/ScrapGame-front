// src/app/layout.js

import localFont from "next/font/local";
import "./globals.css";
import Head from 'next/head'; // Import the Head component
import ClientLayout from './ClientLayout';

export const metadata = {
  title: "onlinegameforyou!",
  description: "Your ultimate gaming app experience with amazing features and gameplay!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
