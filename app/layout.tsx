import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, EB_Garamond, Dancing_Script } from 'next/font/google'
import { AuthProvider } from '@/lib/auth-context'
import { AuthorProvider } from '@/lib/author-context'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
})

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-garamond',
})

const script = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-script-var',
})

export const metadata: Metadata = {
  title: 'Charles David Tebbs | Author',
  description:
    'Official website of Charles David Tebbs ("David"), author of The Trail Unfolded series. Western historical adventure, books, news, and bio.',
  icons: {
    icon: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f4f0e6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-background ${playfair.variable} ${garamond.variable} ${script.variable}`}
    >
      <body className="font-sans antialiased text-foreground selection:bg-gold selection:text-primary-foreground">
        <AuthProvider>
          <AuthorProvider>
            {children}
          </AuthorProvider>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

