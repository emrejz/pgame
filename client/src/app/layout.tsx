import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components";

export const metadata: Metadata = {
  title: "pgame",
  description: "welcome",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
