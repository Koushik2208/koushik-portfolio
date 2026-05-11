import type { Metadata } from "next";
import LocalFont from "next/font/local";
import "./globals.css";
import { ImageKitProvider } from "@imagekit/next";
import { IBM_Plex_Mono } from "next/font/google";

const historia = LocalFont({
  src: "./fonts/HistoriaSky.ttf",
  variable: "--font-historia",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
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
    <html lang="en" className="light">
      <body
        className={`${historia.variable} ${ibmPlexMono.variable} font-mono antialiased`}
      >
        <ImageKitProvider urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}>
          {children}
        </ImageKitProvider>
      </body>
    </html>
  );
}
