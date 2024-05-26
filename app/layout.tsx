import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "NFVCB Coop Portal",
  description:
    "This is the NFVCB Multipurpose Cooperative Society Ltd contribution portal",
  twitter: {
    card: "summary",
    title: "NFVCB Coop Portal",
    description:
      "This is the NFVCB Multipurpose Cooperative Society Ltd contribution portal",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NFVCB Coop Portal",
  },
  openGraph: {
    url: "https://nfvcbcoop-contributions.com.ng",
    siteName: "NFVCB Coop Portal",
    images: [
      {
        url: "https://res.cloudinary.com/mctony17/image/upload/v1716676461/nfvcb_coop/coop-logo_jpg.jpg", // Must be an absolute URL
        width: 100,
        height: 100,
      },
    ],
    locale: "en_US",
    type: "website",
    // authors: ["Matthew Chukwu"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange>
          <Header />
          <main className="bg-gray-50 dark:bg-gray-950"> {children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
