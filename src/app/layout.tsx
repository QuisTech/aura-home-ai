import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SceneController from "@/components/SceneController";
import PageTransitionProvider from "@/components/PageTransitionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aura Home AI | Autonomous Life Concierge",
  description: "Stop managing your life. Start living it. Aura is your autonomous home concierge powered by Agno-Class intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SceneController />
        <PageTransitionProvider>
          {children}
        </PageTransitionProvider>
      </body>
    </html>
  );
}

