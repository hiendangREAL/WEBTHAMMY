import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, User, Clock, ArrowLeft, Share2, Facebook } from 'lucide-react'
import { sanitizeHtml } from '@/lib/sanitize'

// Placeholder data
const placeholderPosts = [
  {
    id: '1',
    slug: 'huong-dan-cham-soc-da-mua-dong',
    title: 'Huong dan cham soc da mua dong: Giu am va sang khoi',
    content: `
      <p>Mua dong la thoi diem da de bi kho, nheu va mat am tu nhien. Viec cham soc da trong mua dong can chu y dac biet de giu cho la da luon khoang khao va sang khoi.</p>

      <h2>1. Tang cuong cap am</h2>
      <p>Trong mua dong, da can duoc cap am nhieu hon binh thuong. Hay su dung kem duong dam hon va bo sung serum hyaluronic acid.</p>

      <h2>2. Don la khoang cach</h2>
      <p>Tuy nhien viec rua mat qua nhieu cung khong tot. Chi can don la 2 lan/ngay voi sua rua mat diu nhe.</p>

      <h2>3. Su dung mat na duong</h2>
      <p>Mat na duong 2-3 lan/tuan se giup da cua ban duoc cap am sau va phuc hoi khoi mau.</p>

      <h2>4. Bao ve da khoi gio lanh</h2>
      <p>Gio lanh co the gay kho da. Hay su dung khan choang va kem duong moi khi ra ngoai.</p>

      <p>Neu ban can tu van them ve cham soc da, hay lien he voi chuyen gia cua Tham My Studio!</p>
    `,
    excerpt: 'Mua dong la thoi diem da de bi kho, nheu...',
    image_url: null,
    category: { name: 'Cham soc da', slug: 'cham-soc-da' },
    author: 'ThS. Nguyen Thi A',
    author_role: 'Chuyen gia da lieu',
    published_at: '2024-01-15',
    read_time: 5,
  },
  {
    id: '2',
    slug: 'top-5-phuong-phap-tri-nam-hieu-qua',
    title: 'Top 5 phuong phap tri nam hieu qua nhat hien nay',
    content: `<p>Noi dung dang cap nhat...</p>`,
    excerpt: 'Nam da la van de cua rat nhieu phu nu...',
    image_url: null,
    category: { name: 'Dieu tri', slug: 'dieu-tri' },
    author: 'BS. Tran Van B',
    author_role: 'Bac si da lieu',
    published_at: '2024-01-10',
    read_time: 7,
  },
]

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = placeholderPosts.find((p) => p.slug === resolvedParams.slug)

  if (!post) {
    return { title: 'Khong tim thay bai viet' }
  }

  return {
    title: `${post.title} - Tham My Studio`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  return placeholderPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = placeholderPosts.find((p) => p.slug === resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-secondary/30">
        <div className="container mx-auto px-4 py-3 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Trang chu
            </Link>
            <span>/</span>
            <Link href="/tin-tuc" className="hover:text-primary">
              Tin tuc
            </Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <header className="mb-8">
              <Link
                href="/tin-tuc"
                className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Quay lai Tin tuc
              </Link>

              <Badge variant="outline" className="mb-4">
                {post.category.name}
              </Badge>

              <h1 className="font-heading text-2xl font-bold md:text-3xl lg:text-4xl">
                {post.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.published_at).toLocaleDateString('vi-VN')}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.read_time} phut doc
                </span>
              </div>
            </header>

            {/* Featured image */}
            <div className="mb-8 aspect-video overflow-hidden rounded-xl bg-muted">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div
              className="prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
            />

            {/* Share */}
            <Separator className="my-8" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Chia se:</span>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                  aria-label="Copy link"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Author */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{post.author}</h3>
                    <p className="text-sm text-muted-foreground">{post.author_role}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Chuyen gia voi nhieu nam kinh nghiem trong linh vuc cham soc da va tham my.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="mt-8 rounded-xl bg-primary/10 p-6 text-center">
              <h3 className="font-heading font-semibold">Can tu van them?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Lien he ngay voi chuyen gia cua chung toi de duoc tu van mien phi
              </p>
              <Link
                href="/lien-he"
                className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Lien he ngay
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
