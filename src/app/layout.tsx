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
      <body className="font-sans antialiased">
        <Navigation />
        <div className="mx-auto flex max-w-7xl ">
          <div className="w-56 hidden lg:block">
            <SideMenu />
            <div className="fixed bottom-12">
              <div className="flex flex-col">
                <span className="text-md text-slate-600">Twitter</span>
                <span className="text-md text-slate-600">Github</span>
              </div>
            </div>
          </div>
          <div className="mt-10 w-full px-5 lg:px-0">{children}</div>
        </div>
      </body>
    </html>
  );
}
