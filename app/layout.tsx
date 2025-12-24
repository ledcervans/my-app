import type React from "react"
import type { Metadata } from "next"
import { Allan } from "next/font/google"
import "./globals.css"

const allan = Allan({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Best Wishes",
  description: "Intern Well✨. Exam Well🍀",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={allan.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body>{children}</body>
    </html>
  )
}
