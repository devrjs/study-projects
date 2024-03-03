import { Header } from "@/components/Header"
import SessionProvider from "@/components/SessionProvider"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Roboto } from "next/font/google"
import "./global.scss"

const roboto = Roboto({ weight: ["400", "700", "900"], subsets: ["latin"], variable: "--font-roboto" })

export const metadata: Metadata = {
  title: "Home | ig.news",
  description: "Webpage de Notícias",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <SessionProvider session={session}>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}

