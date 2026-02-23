// Seed data for Tham My Studio
// Run with: npx tsx prisma/seed.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Use any to avoid strict type issues with supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Product Categories - Danh muc san pham
const productCategories = [
  { name: 'Thiet bi Laser', slug: 'thiet-bi-laser', description: 'May laser tri nam, tri long, tai tao da', sort_order: 1 },
  { name: 'Thiet bi RF', slug: 'thiet-bi-rf', description: 'May RF nang co, triet long, tre hoa da', sort_order: 2 },
  { name: 'Thiet bi Hifu', slug: 'thiet-bi-hifu', description: 'May Hifu cuong hoa cot SAR, nang co mat', sort_order: 3 },
  { name: 'Thiet bi Micro-needling', slug: 'thiet-bi-micro-needling', description: 'May kim tram tai tao da, tri seo', sort_order: 4 },
  { name: 'Thiet bi Cryolipolysis', slug: 'thiet-bi-cryolipolysis', description: 'May giam mo dong lanh', sort_order: 5 },
  { name: 'Thiet bi Dieu tri Mun', slug: 'thiet-bi-dieu-tri-mun', description: 'May tri mun, dieu tri da dau', sort_order: 6 },
  { name: 'Thiet bi Phun xam', slug: 'thiet-bi-phun-xam', description: 'May phun xam may, moi, la may', sort_order: 7 },
  { name: 'Thiet bi Cham soc da', slug: 'thiet-bi-cham-soc-da', description: 'May rua mat, hut dau, phun oxy', sort_order: 8 },
]

// Service Categories - Danh muc dich vu
const serviceCategories = [
  { name: 'Triet long', slug: 'triet-long', description: 'Dich vu triet long vinh vien', sort_order: 1 },
  { name: 'Tri nam', slug: 'tri-nam', description: 'Dich vu dieu tri nam da', sort_order: 2 },
  { name: 'Tre hoa da', slug: 'tre-hoa-da', description: 'Dich vu tai tao, tre hoa da', sort_order: 3 },
  { name: 'Nang co', slug: 'nang-co', description: 'Dich vu nang co, tre hoa khuon mat', sort_order: 4 },
  { name: 'Giam mo', slug: 'giam-mo', description: 'Dich vu giam mo, giam beo', sort_order: 5 },
  { name: 'Phun xam', slug: 'phun-xam', description: 'Dich vu phun xam tham my', sort_order: 6 },
  { name: 'Cham soc da', slug: 'cham-soc-da', description: 'Dich vu cham soc, trong da', sort_order: 7 },
  { name: 'Dieu tri mun', slug: 'dieu-tri-mun', description: 'Dich vu tri mun, tratac', sort_order: 8 },
]

// Sample Products - San pham mau
const products = [
  {
    name: 'May Laser Diode 808nm',
    slug: 'may-laser-diode-808nm',
    description: 'May triet long Laser Diode 808nm cong nghe moi nhat, triet long vinh vien cho moi loai da.',
    price: 150000000,
    compare_price: 180000000,
    warranty_months: 24,
    category_slug: 'thiet-bi-laser',
    images: ['/images/products/laser-diode-808.jpg'],
    specifications: { cong_suat: '800W', so_xung: '10Hz', kich_thuoc_spot: '12x12mm' },
    stock_quantity: 5,
    is_featured: true,
  },
  {
    name: 'May Laser IPL + RF',
    slug: 'may-laser-ipl-rf',
    description: 'May ket hop IPL va RF, dieu tri nam, triet long, tai tao da hieu qua.',
    price: 120000000,
    compare_price: 140000000,
    warranty_months: 24,
    category_slug: 'thiet-bi-laser',
    images: ['/images/products/ipl-rf.jpg'],
    specifications: { cong_suat: '500W', bo_loc: '530-1200nm', dien_tich_dau: '15x50mm' },
    stock_quantity: 3,
    is_featured: true,
  },
  {
    name: 'May Hifu 4D',
    slug: 'may-hifu-4d',
    description: 'May Hifu 4D cuong hoa cot SAR, nang co mat khong can phau thuat.',
    price: 200000000,
    compare_price: 250000000,
    warranty_months: 36,
    category_slug: 'thiet-bi-hifu',
    images: ['/images/products/hifu-4d.jpg'],
    specifications: { tan_so: '4MHz, 7MHz', do_sau: '1.5mm, 3mm, 4.5mm', dau_do: '200-400' },
    stock_quantity: 2,
    is_featured: true,
  },
  {
    name: 'May RF 3D Multipolar',
    slug: 'may-rf-3d-multipolar',
    description: 'May RF 3D da cuc, nang co, tre hoa da, giam mo hieu qua.',
    price: 80000000,
    compare_price: 95000000,
    warranty_months: 24,
    category_slug: 'thiet-bi-rf',
    images: ['/images/products/rf-3d.jpg'],
    specifications: { tan_so: '1MHz, 3MHz', cong_suat: '200W', che_do: '5 che do' },
    stock_quantity: 4,
    is_featured: false,
  },
  {
    name: 'May Cryolipolysis 4 Tay',
    slug: 'may-cryolipolysis-4-tay',
    description: 'May giam mo dong lanh 4 tay, giam beo phi phau thuat.',
    price: 250000000,
    compare_price: 300000000,
    warranty_months: 36,
    category_slug: 'thiet-bi-cryolipolysis',
    images: ['/images/products/cryo-4.jpg'],
    specifications: { nhiet_do: '-10C den -15C', so_tay: '4 tay', ap_luc: '0-80kPa' },
    stock_quantity: 2,
    is_featured: true,
  },
  {
    name: 'May Kim Derma Pen',
    slug: 'may-kim-derma-pen',
    description: 'May kim tram dieu tri seo, tai tao da, tri nam.',
    price: 25000000,
    compare_price: 30000000,
    warranty_months: 12,
    category_slug: 'thiet-bi-micro-needling',
    images: ['/images/products/derma-pen.jpg'],
    specifications: { toc_do: '700-2500rpm', do_sau: '0-2mm', kim: '9-36 kim' },
    stock_quantity: 10,
    is_featured: false,
  },
]

// Sample Services - Dich vu mau
const services = [
  {
    name: 'Triet long Laser Diode',
    slug: 'triet-long-laser-diode',
    description: 'Triet long vinh vien cong nghe Laser Diode 808nm, an toan, hieu qua.',
    price: 1500000,
    duration_minutes: 45,
    category_slug: 'triet-long',
    images: ['/images/services/laser-hair.jpg'],
    is_featured: true,
  },
  {
    name: 'Tri nam Laser Toning',
    slug: 'tri-nam-laser-toning',
    description: 'Dieu tri nam da, tan nhang, dom nau cong nghie Laser Toning.',
    price: 1200000,
    duration_minutes: 30,
    category_slug: 'tri-nam',
    images: ['/images/services/laser-toning.jpg'],
    is_featured: true,
  },
  {
    name: 'Nang co Hifu',
    slug: 'nang-co-hifu',
    description: 'Nang co, tre hoa khuon mat bang cong nghe Hifu khong xam lan.',
    price: 3000000,
    duration_minutes: 60,
    category_slug: 'nang-co',
    images: ['/images/services/hifu-lift.jpg'],
    is_featured: true,
  },
  {
    name: 'Tre hoa da RF',
    slug: 'tre-hoa-da-rf',
    description: 'Tre hoa da, triet long mat bang cong nghe RF da cuc.',
    price: 800000,
    duration_minutes: 45,
    category_slug: 'tre-hoa-da',
    images: ['/images/services/rf-skin.jpg'],
    is_featured: false,
  },
  {
    name: 'Giam mo Cryolipolysis',
    slug: 'giam-mo-cryolipolysis',
    description: 'Giam beo, giam mo noi dong lanh cong nghie Cryolipolysis.',
    price: 2500000,
    duration_minutes: 60,
    category_slug: 'giam-mo',
    images: ['/images/services/cryo-fat.jpg'],
    is_featured: true,
  },
  {
    name: 'Phun xam may 3D',
    slug: 'phun-xam-may-3d',
    description: 'Phun xam may 3D tu nhien, sac net, dep mat.',
    price: 4000000,
    duration_minutes: 120,
    category_slug: 'phun-xam',
    images: ['/images/services/eyebrow.jpg'],
    is_featured: true,
  },
  {
    name: 'Cham soc da HydraFacial',
    slug: 'cham-soc-da-hydrafacial',
    description: 'Trong da, cay am, lam sach sau da voi HydraFacial.',
    price: 1500000,
    duration_minutes: 60,
    category_slug: 'cham-soc-da',
    images: ['/images/services/hydrafacial.jpg'],
    is_featured: false,
  },
  {
    name: 'Dieu tri mun Laser',
    slug: 'dieu-tri-mun-laser',
    description: 'Dieu tri mun, giam dau, giam thanks cong nghie Laser.',
    price: 1000000,
    duration_minutes: 30,
    category_slug: 'dieu-tri-mun',
    images: ['/images/services/acne.jpg'],
    is_featured: false,
  },
]

async function seed() {
  console.log('Starting seed...')

  // Seed Product Categories
  console.log('Seeding product categories...')
  for (const cat of productCategories) {
    const { error } = await supabase
      .from('product_categories')
      .upsert({ ...cat, is_active: true }, { onConflict: 'slug' })
    if (error) console.error('Error seeding product category:', cat.name, error.message)
    else console.log('  + Product category:', cat.name)
  }

  // Seed Service Categories
  console.log('Seeding service categories...')
  for (const cat of serviceCategories) {
    const { error } = await supabase
      .from('service_categories')
      .upsert({ ...cat, is_active: true }, { onConflict: 'slug' })
    if (error) console.error('Error seeding service category:', cat.name, error.message)
    else console.log('  + Service category:', cat.name)
  }

  // Get category IDs
  const { data: prodCats } = await supabase.from('product_categories').select('id, slug')
  const { data: svcCats } = await supabase.from('service_categories').select('id, slug')

  const prodCatMap: Record<string, string> = {}
  prodCats?.forEach((c: any) => { prodCatMap[c.slug] = c.id })

  const svcCatMap: Record<string, string> = {}
  svcCats?.forEach((c: any) => { svcCatMap[c.slug] = c.id })

  // Seed Products
  console.log('Seeding products...')
  for (const prod of products) {
    const category_id = prodCatMap[prod.category_slug]
    if (!category_id) {
      console.error('Category not found:', prod.category_slug)
      continue
    }
    const { error } = await supabase
      .from('products')
      .upsert(
        {
          name: prod.name,
          slug: prod.slug,
          description: prod.description,
          price: prod.price,
          compare_price: prod.compare_price,
          warranty_months: prod.warranty_months,
          category_id,
          images: prod.images,
          specifications: prod.specifications,
          stock_quantity: prod.stock_quantity,
          is_active: true,
          is_featured: prod.is_featured,
        },
        { onConflict: 'slug' }
      )
    if (error) console.error('Error seeding product:', prod.name, error.message)
    else console.log('  + Product:', prod.name)
  }

  // Seed Services
  console.log('Seeding services...')
  for (const svc of services) {
    const category_id = svcCatMap[svc.category_slug]
    if (!category_id) {
      console.error('Category not found:', svc.category_slug)
      continue
    }
    const { error } = await supabase
      .from('services')
      .upsert(
        {
          name: svc.name,
          slug: svc.slug,
          description: svc.description,
          price: svc.price,
          duration_minutes: svc.duration_minutes,
          category_id,
          images: svc.images,
          is_active: true,
          is_featured: svc.is_featured,
        },
        { onConflict: 'slug' }
      )
    if (error) console.error('Error seeding service:', svc.name, error.message)
    else console.log('  + Service:', svc.name)
  }

  console.log('Seed completed!')
  console.log('\nNote: To create a super admin user, use Supabase Auth to sign up.')
  console.log('Then update the user role in the database:')
  console.log("  UPDATE users SET role = 'super_admin' WHERE email = 'admin@example.com';")
}

seed().catch(console.error)
