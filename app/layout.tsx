import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.scss";
import Tabs from "./components/Tabs";
import Header from "./components/Header";
import { Suspense } from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const spaceGrotest = Space_Grotesk({
    variable: "--header-font",
    weight: ['300', '400', '500'],
    subsets: ['latin'],
    display: "swap",
})

export const metadata: Metadata = {
    title: "Good Tape Assignment",
    description: "Explore Part 1 and Part 2 of the Good Tape Assignment, created by Thea Birk Berger.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotest.variable} antialiased`}>
                <main className="min-h-screen min-w-screen px-[4vw] py-[5vh] flex flex-col gap-4">
                    
                    <Header></Header>

                    <div className="flex flex-col grow shadow-xl rounded-b-[1rem]">
                        <Suspense fallback={<div className="h-15"></div>}>
                            <Tabs></Tabs>
                        </Suspense>
                        <div className="grow bg-white py-[5vh] px-[4vw] flex flex-col rounded-b-[1rem]">
                            <Suspense>
                                { children }
                            </Suspense>
                        </div>
                    </div>
                
                </main>
            </body>
        </html>
    );
}
