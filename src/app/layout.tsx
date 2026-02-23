import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({
  variable: '--font-body',
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
})

const playfairDisplay = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://thammy.vn'),
  title: {
    default: 'Tham My Studio - Dich vu tham my cao cap tai TP.HCM',
    template: '%s | Tham My Studio',
  },
  description:
    'Tham My Studio chuyen cung cap dich vu tham my cao cap va thiet bi cham soc da chuyen nghiep. Tri nam, tai tao da, giam mo, phun xam tham my. Uy tin - Chat luong - Hieu qua.',
  keywords: [
    'tham my',
    'tham my vien',
    'spa',
    'cham soc da',
    'tri nam',
    'tri nam da',
    'tai tao da',
    'giam mo',
    'phun xam',
    'may tham my',
    'thiet bi tham my',
    'noi that spa',
    'cham soc da mat',
    'dieu tri da',
    'tham my tp hcm',
  ],
  authors: [{ name: 'Tham My Studio' }],
  creator: 'Tham My Studio',
  publisher: 'Tham My Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://thammy.vn',
    siteName: 'Tham My Studio',
    title: 'Tham My Studio - Dich vu tham my cao cap',
    description:
      'Chuyen cung cap dich vu tham my cao cap va thiet bi cham soc da chuyen nghiep. Uy tin - Chat luong - Hieu qua.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tham My Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tham My Studio - Dich vu tham my cao cap',
    description:
      'Chuyen cung cap dich vu tham my cao cap va thiet bi cham soc da chuyen nghiep.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${beVietnamPro.variable} ${playfairDisplay.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
