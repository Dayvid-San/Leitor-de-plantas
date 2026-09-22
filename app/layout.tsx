import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ClientLayout } from "@/components/client-layout";
import { VoiceProvider } from "@/components/VoiceProvider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dayvid Santana",
  description: "Programador, pesquisador e empreendedor",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <VoiceProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <ClientLayout>{children}</ClientLayout>
          </Suspense>
          <Analytics />
        </VoiceProvider>
      </body>
    </html>
  );
}