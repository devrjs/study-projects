import type { Metadata } from 'next'
import { Roboto_Flex as Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NLW Copa',
  description: 'Crie seu bolão de apostas',

  // openGraph: {
  //   title: 'NLW Copa ',
  //   description: 'Crie seu bolão de apostas',
  //   images: [
  //     {
  //       url: 'https://',
  //       width: 800,
  //       height: 600,
  //     },
  //   ],
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.className} bg-gray-900 bg-[url('../assets/app-bg.png')] bg-cover bg-no-repeat`}
      >
        {children}
      </body>
    </html>
  )
}
