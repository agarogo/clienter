"use client";

import type { AppProps } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from "../components/Header";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      {pathname !== "/login" && pathname !== "/register" && <Header />}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;