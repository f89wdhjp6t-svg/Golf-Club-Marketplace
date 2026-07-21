import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { FamilyProvider } from "@/lib/family-context";
import { Nav } from "@/components/Nav";
import { theme } from "@/lib/theme";

export const metadata: Metadata = {
  title: "The Ultimate Baby Guide — Pre & Post Baby",
  description:
    "A pregnancy and newborn guide: what to expect, what's normal, food and medication safety, labor and postpartum, balanced vaccine information, a baby tracker, and a shared family calendar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: theme.bg }}>
        <AuthProvider>
          <FamilyProvider>
            <Nav />
            {children}
          </FamilyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
