import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { HeroSection } from '@/components/shared/hero-section'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Award,
  Users,
  Heart,
  ShieldCheck,
  Clock,
  Star,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ve chung toi - Tham My Studio',
  description: 'Tim hieu ve Tham My Studio - 10+ nam kinh nghiem, 5000+ khach hang hen long. Doi ngu chuyen gia tai nang, trang thiet bi hien dai.',
  keywords: ['ve chung toi', 'tham my studio', 'lich su cong ty', 'doi ngu chuyen gia'],
  openGraph: {
    title: 'Ve chung toi - Tham My Studio',
    description: '10+ nam kinh nghiem, 5000+ khach hang hen long.',
  },
}

const stats = [
  { value: '10+', label: 'Nam kinh nghiem', icon: Clock },
  { value: '5000+', label: 'Khach hang', icon: Users },
  { value: '50+', label: 'Dich vu', icon: Heart },
  { value: '100%', label: 'Cam ket', icon: ShieldCheck },
]

const values = [
  {
    icon: Star,
    title: 'Chat luong hang dau',
    description: 'Su dung san pham va thiet bi chinh hang, chat luong cao nhat thi truong.',
  },
  {
    icon: Heart,
    title: 'Tan tam chuyen nghiep',
    description: 'Doi ngu chuyen gia tay nghe cao, tan tam voi tung khach hang.',
  },
  {
    icon: ShieldCheck,
    title: 'An toan tin cay',
    description: 'Tuan thu nghiem ngat cac quy chuan an toan trong dieu tri.',
  },
  {
    icon: Users,
    title: 'Dong hanh ben ban',
    description: 'Ho tro va dong hanh cung khach hang trong suot qua trinh dieu tri.',
  },
]

const team = [
  {
    name: 'ThS. Nguyen Thi A',
    role: 'Giam doc chuyen mon',
    bio: '10+ nam kinh nghiem trong linh vuc da lieu va tham my.',
  },
  {
    name: 'BS. Tran Van B',
    role: 'Bac si dieu tri',
    bio: 'Chuyen gia ve Laser va cac phuong phap dieu tri tien tien.',
  },
  {
    name: 'ThS. Le Thi C',
    role: 'Chuyen gia cham soc da',
    bio: 'Thanh vien Hoi Da lieu Viet Nam voi 8 nam kinh nghiem.',
  },
]

const certifications = [
  'Chung nhan co so tham my',
  'Chung nhan ATVSTP',
  'Thanh vien Hoi Da lieu VN',
  'Doi tac chinh thuong cac thuong hieu',
]

export default function AboutPage() {
  return (
    <>
      <HeroSection
        subtitle="Ve chung toi"
        title="Kien tao sac dep - Tan tam cham soc"
        description="Hon 10 nam kinh nghiem trong nganh tham my, chung toi cam ket mang den dich vu tot nhat cho khach hang"
      />

      {/* Stats Section */}
      <section className="-mt-8 border-y border-border bg-primary py-8 text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-2 h-6 w-6 opacity-80" />
                <div className="text-2xl font-bold md:text-3xl">{stat.value}</div>
                <div className="mt-1 text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                Chuyen cua chung toi
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Tham My Studio duoc thanh lap nam 2014 voi mong muon mang den
                  cho khach hang nhung dich vu cham soc da va tham my chat luong
                  cao nhat, an toan va hieu qua.
                </p>
                <p>
                  Voi doi ngu chuyen gia tay nghe cao, trang thiet bi hien dai
                  va he thong quan ly chat luong nghiem ngat, chung toi da phuc
                  vu hon 5000 khach hang va tro thanh dia chi tin cay cua nhieu
                  phu nu Viet Nam.
                </p>
                <p>
                  Chung toi luu giu cam ket "Kien tao sac dep - Tan tam cham soc"
                  trong moi dich vu, moi dieu tri va moi lan tu van.
                </p>
              </div>
              <Button className="mt-6 bg-accent hover:bg-accent-dark gap-2" asChild>
                <Link href="/lien-he">
                  Lien he ngay
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <svg className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-xl bg-primary p-6 text-primary-foreground">
                <p className="text-3xl font-bold">10+</p>
                <p className="text-sm opacity-80">Nam kinh nghiem</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-y border-border bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              Gia tri cot loi
            </h2>
            <p className="mt-3 text-muted-foreground">
              Nhung nguyen tac ma chung toi luon tuan thu
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-heading font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              Doi ngu chuyen gia
            </h2>
            <p className="mt-3 text-muted-foreground">
              Nhung chuyen gia tai nang voi nhieu nam kinh nghiem
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <div className="aspect-square bg-muted">
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <Users className="h-16 w-16" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="border-y border-border bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              Chung chi & Thanh tuu
            </h2>
            <p className="mt-3 text-muted-foreground">
              Cac chung nhan va giai thuong da dat duoc
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert) => (
              <Card key={cert}>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Award className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium">{cert}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              San sang bat dau hanh trinh cua ban?
            </h2>
            <p className="mt-4 opacity-90">
              Dat lich hen ngay de duoc tu van mien phi tu chuyen gia cua chung toi
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-background text-primary hover:bg-background/90"
            >
              <Link href="/lien-he">Dat lich tu van</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
