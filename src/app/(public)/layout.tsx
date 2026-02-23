import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { ZaloButton } from '@/components/shared/zalo-button'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ZaloButton />
    </>
  )
}
