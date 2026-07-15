import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AppLayout from '@/components/AppLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Mini-Ledger',
  description: 'AI-powered personal finance ledger',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-nexus-bg text-nexus-text flex min-h-screen`}>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  )
}
