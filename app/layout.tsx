import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FairwayFind — Golf Club Marketplace",
  description:
    "Buy and sell used golf clubs with AI-powered valuation, photo scanning, and buy verdicts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
