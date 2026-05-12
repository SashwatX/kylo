import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KYLO — Beyond Ordinary",
  description:
    "Premium black and white T-shirts for those who move in silence.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23000'/><text x='50%25' y='72%25' text-anchor='middle' font-size='72' font-family='sans-serif' font-weight='900' fill='%23fff'>K</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    title: "KYLO — Beyond Ordinary",
    description:
      "Premium black and white T-shirts for those who move in silence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${bebasNeue.variable} ${dmSans.variable} bg-black text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
