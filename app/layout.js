import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SocialMediaSidebar from "@/components/SocialMediaSidebar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Student Activity Center",
  keywords: ["Student Activity Center"],
  authors: [
    {
      name: "DigiCraft",
      url: "https://sacnitjsr.org/",
    },
  ],
  description: "Student Activity Center is a platform for managing student activities and events of NIT Jamshedpur .",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SocialMediaSidebar />
        {children}
      </body>
    </html>
  );
}
