import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Nav } from "@/components/site/nav"
import { cn } from "@/lib/utils"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body className="flex min-h-svh flex-col">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          storageKey="itp-c4c-theme"
          enableSystem={true}
        >
          <Nav />
          <main className="flex-1 lg:py-8 lg:pl-56 xl:pl-64">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
