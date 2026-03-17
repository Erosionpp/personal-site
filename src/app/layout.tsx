import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jiwen Wang - Personal Site",
  description: "Jiwen Wang's personal website. Explore my background in HCI, finance, and design. Chat with my AI avatar to learn more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
