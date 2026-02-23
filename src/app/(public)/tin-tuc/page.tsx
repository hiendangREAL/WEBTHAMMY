import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { HeroSection } from '@/components/shared/hero-section'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, ArrowRight } from 'lucide-react'

// Placeholder data
const placeholderPosts = [
  {
    id: '1',
    slug: 'huong-dan-cham-soc-da-mua-dong',
    title: 'Huong dan cham soc da mua dong: Giu am va sang khoi',
    excerpt: 'Mua dong la thoi diem da de bi kho, nheu. Hay cung tim hieu cach cham soc da dong de giu am...',
    image_url: null,
    category: { name: 'Cham soc da', slug: 'cham-soc-da' },
    author: 'ThS. Nguyen Thi A',
    published_at: '2024-01-15',
    read_time: 5,
  },
  {
    id: '2',
    slug: 'top-5-phuong-phap-tri-nam-hieu-qua',
    title: 'Top 5 phuong phap tri nam hieu qua nhat hien nay',
    excerpt: 'Nam da la van de cua rat nhieu phu nu. Cung tim hieu cac phuong phap tri nam hieu qua nhat...',
    image_url: null,
    category: { name: 'Dieu tri', slug: 'dieu-tri' },
    author: 'BS. Tran Van B',
    published_at: '2024-01-10',
    read_time: 7,
  },
  {
    id: '3',
    slug: 'prp-la-gi-co-tot-khong',
    title: 'PRP la gi? Co that su tot nhu loi don?',
    excerpt: 'PRP (Platelet-Rich Plasma) la phuong phap tai tao da bang huyet tang cuong. Hay tim hieu...',
    image_url: null,
    category: { name: 'Tai tao da', slug: 'tai-tao-da' },
    author: 'ThS. Le Thi C',
    published_at: '2024-01-05',
    read_time: 6,
  },
]

const categories = [
  { slug: 'cham-soc-da', name: 'Cham soc da', count: 15 },
  { slug: 'dieu-tri', name: 'Dieu tri', count: 22 },
  { slug: 'tai-tao-da', name: 'Tai tao da', count: 18 },
  { slug: 'review', name: 'Review', count: 10 },
]

export const metadata: Metadata = {
  title: 'Tin tuc & Kien thuc cham soc da - Tham My Studio',
  description: 'Tin tuc, kinh nghiem cham soc da va tham my tu chuyen gia. Huong dan cham soc da, phuong phap tri nam, tai tao da hieu qua.',
  keywords: ['tin tuc tham my', 'kinh nghiem cham soc da', 'huong dan tri nam', 'bi quyet lam dep'],
  openGraph: {
    title: 'Tin tuc & Kien thuc cham soc da - Tham My Studio',
    description: 'Kien thuc cham soc da va tham my tu chuyen gia.',
  },
}

export default function BlogPage() {
  return (
    <>
      <HeroSection
        subtitle="Tin tuc & Kien thuc"
        title="Blog tham my"
        description="Cap nhat tin tuc moi nhat, chia se kinh nghiem cham soc da va tham my tu chuyen gia"
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Featured post */}
              {placeholderPosts[0] && (
                <Card className="mb-8 overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className="relative aspect-video md:aspect-auto">
                      <div className="h-full bg-muted flex items-center justify-center text-muted-foreground">
                        <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground">
                        Noi bat
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-2">
                        {placeholderPosts[0].category.name}
                      </Badge>
                      <h2 className="font-heading text-xl font-bold line-clamp-2">
                        <Link href={`/tin-tuc/${placeholderPosts[0].slug}`} className="hover:text-primary">
                          {placeholderPosts[0].title}
                        </Link>
                      </h2>
                      <p className="mt-2 text-muted-foreground line-clamp-3">
                        {placeholderPosts[0].excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {placeholderPosts[0].author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(placeholderPosts[0].published_at).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <Link
                        href={`/tin-tuc/${placeholderPosts[0].slug}`}
                        className="mt-4 inline-flex items-center text-sm text-primary hover:underline"
                      >
                        Doc tiep
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              )}

              {/* Post grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                {placeholderPosts.slice(1).map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="relative aspect-video bg-muted">
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2">
                        {post.category.name}
                      </Badge>
                      <h3 className="font-heading font-semibold line-clamp-2">
                        <Link href={`/tin-tuc/${post.slug}`} className="hover:text-primary">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{new Date(post.published_at).toLocaleDateString('vi-VN')}</span>
                        <span>{post.read_time} phut doc</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Placeholder notice */}
              <div className="mt-12 rounded-lg border border-dashed border-border p-8 text-center">
                <p className="text-muted-foreground">
                  Noi dung dang duoc cap nhat. Vui long quay lai sau!
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Categories */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-heading font-semibold">Danh muc</h3>
                  <ul className="mt-4 space-y-2">
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/tin-tuc?cat=${cat.slug}`}
                          className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary"
                        >
                          <span>{cat.name}</span>
                          <span>({cat.count})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-4">
                  <h3 className="font-heading font-semibold">Dang ky nhan tin</h3>
                  <p className="mt-2 text-sm opacity-90">
                    Nhan thong tin moi nhat qua email
                  </p>
                  <div className="mt-4">
                    <input
                      type="email"
                      placeholder="Email cua ban"
                      className="w-full rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-2 text-sm placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                    />
                    <button className="mt-2 w-full rounded-md bg-primary-foreground px-3 py-2 text-sm font-medium text-primary hover:bg-primary-foreground/90">
                      Dang ky
                    </button>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
