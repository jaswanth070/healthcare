import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/language-context"
import { AccessibilityProvider } from "@/lib/accessibility-context"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Arogya Health Bot - Your AI Healthcare Assistant",
  description: "AI-powered multilingual healthcare education for rural and semi-urban populations",
  generator: "v0.app",
}


import RedirectIfNotRegistered from "./redirect-if-not-registered";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <AccessibilityProvider>
            <LanguageProvider>
              <RedirectIfNotRegistered>{children}</RedirectIfNotRegistered>
            </LanguageProvider>
          </AccessibilityProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
