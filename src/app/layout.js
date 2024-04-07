import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next App",
  description: "Next.js frontend app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="relative min-h-screen flex flex-col justify-between">
            <Navbar />
            <div className="bg-slate-50">

            {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
