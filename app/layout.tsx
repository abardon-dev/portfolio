import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/business/navigation/components/header";
import { Footer } from "@/business/navigation/components/footer";
import { SocialMedias } from "@/business/socials/social-medias";

const buenoMono = localFont({
  src: "./fonts/Bueno.woff",
  variable: "--font-bueno-mono",
  weight: "400"
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const twemoji = localFont({
  src: "./fonts/Twemoji.Mozilla.ttf",
  display: "swap",
  variable: "--font-twemoji"
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`relative ${buenoMono.variable} ${inter.variable} ${twemoji.variable} min-h-svh w-screen overflow-y-auto overflow-x-hidden`}
      >
        <Header />

        <div className="fixed left-0 top-1/2 z-50 flex -translate-y-1/2 sm:left-5">
          <SocialMedias />
        </div>

        <main className="space-y-10 px-12 py-10 2xl:container sm:mt-20 sm:px-20 sm:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
