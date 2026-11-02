import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paidipilli Purushotham — 32-Bit RISC-V Silicon • Embedded Systems • Full-Stack",
  description:
    "ECE engineer building high-performance systems from silicon to software. 32-Bit RISC-V tapeout finisher (Top 22 National Rank), embedded firmware architect, and full-stack engineer (.NET, Angular, React, Django).",
  keywords: [
    "VLSI Engineer",
    "Physical Design",
    "RTL to GDSII",
    "Embedded Systems",
    "RISC-V",
    "RV32I",
    "SystemVerilog",
    "UVM",
    "OpenLane",
    "SkyWater 130nm",
    "FreeRTOS",
    "ESP32",
    "ASP.NET Core",
    "Angular",
    "React",
    "Django",
    "Paidipilli Purushotham",
    "ECE Engineer",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Paidipilli Purushotham — 32-Bit RISC-V Silicon • Embedded Systems • Full-Stack",
    description: "ECE engineer building systems from silicon to software.",
    type: "website",
    locale: "en_US",
  },
  authors: [{ name: "Paidipilli Purushotham" }],
  creator: "Paidipilli Purushotham",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#06080E" />
      </head>
      <body>{children}</body>
    </html>
  );
}
