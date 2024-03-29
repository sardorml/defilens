import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SideMenu from "@/components/home/SideMenu";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const noto = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Defilens - Defi and beyond | TVL",
  description:
    "Track analytics and metrics for various DeFi protocols including bridges, fees, stablecoins, yield, TVL, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://defilens.xyz",
    title: "Defilens - Defi and beyond",
    images: [
      {
        url: "https://defilens.xyz/defilens.png",
        width: 1200,
        height: 630,
        alt: "Defilens",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"" + noto.className}>
        <Navigation />
        <div className="mx-auto flex max-w-7xl ">
          <div className="w-56 hidden lg:block">
            <SideMenu />
            <div className="fixed bottom-12">
              <div className="flex flex-col">
                <Link href="https://twitter.com/defilensxyz" target="_blank">
                  <span className="text-base text-slate-600">Twitter</span>
                </Link>
                <Link href="https://sardor.xyz" target="_blank">
                  <span className="text-base text-slate-600">About Me</span>
                </Link>
                <Link href="https://defillama.com" target="_blank">
                  <span className="text-base text-slate-600">Data source</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-10 w-full px-5 lg:px-0">{children}</div>
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
