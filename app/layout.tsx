import type { Metadata } from "next";
import LocalFont from "next/font/local";
import "./globals.css";
import { ImageKitProvider } from "@imagekit/next";

const inter = LocalFont({
  src: "./fonts/Inter-VariableFont.ttf",
  variable: "--font-inter",
});

const cormorant = LocalFont({
  src: "./fonts/CormorantGaramond-VariableFont_wght.ttf",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Koushik | Full-Stack MERN Developer",
  description: "Portfolio of Koushik, a Full-Stack MERN Developer based in Hyderabad, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${cormorant.variable} antialiased`}
      >
        <ImageKitProvider urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}>
          {children}
        </ImageKitProvider>
      </body>
    </html>
  );
}
