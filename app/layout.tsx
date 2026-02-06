import type { Metadata } from "next";
import { Inter, Roboto, Lato, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin", "vietnamese"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["400", "700"],
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Modern CV Generator",
  description: "Create professional CVs in minutes with real-time preview.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto.variable} ${lato.variable} ${merriweather.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
