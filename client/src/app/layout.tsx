import type { Metadata } from "next";
import { Header } from "@/components/layouts";
import "./globals.scss";

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
