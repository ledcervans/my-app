import type React from "react"
import "../styles/globals.css"

export const metadata = {
  title: "Quiz Shit",
  description: "Sasagot ka o ano?",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

