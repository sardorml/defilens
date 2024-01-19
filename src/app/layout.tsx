import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SideMenu from "@/components/home/SideMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Defilens - defi and beyond",
  description: "Get a glimpse of the future of finance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-zinc-50">
        <Navigation />
        <div className="mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="w-56 hidden lg:block">
            <SideMenu />
          </div>
          <div className="mt-10 w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
