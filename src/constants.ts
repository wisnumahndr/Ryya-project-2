import { Product, Service, Testimonial } from './types';

export const WHATSAPP_NUMBER = '6281234567890'; // Replace with real number

export const BOUQUET_CATEGORIES = [
  'Hand Bouquet Wedding',
  'Bloombox Ballons',
  'Bouquet Graduation/Boneka',
  'Bouquet Artifical Flowers',
  'Bouquet Fresh Flowers',
  'Bouquet Money',
  'Bouquet Pita Satin',
  'Bouquet Kawat Bulu',
  'Bouquet Snack',
  'Bouquet Rokok'
];

export const DECORATION_CATEGORIES = [
  'Dekorasi Wedding',
  'Dekorasi Lamaran',
  'Dekorasi Ulang Tahun'
];
export const WHATSAPP_LINK = (message: string) => 
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const HERO_IMAGE = 'https://i.imgur.com/BpiqYY1.jpeg';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Elegant Rose Bouquet',
    category: 'Fresh Flower',
    priceStart: 150000,
    image: 'https://i.imgur.com/q3iMnf6.jpeg',
    label: 'Best Seller'
  },
  {
    id: '2',
    name: 'Premium Money Bouquet',
    category: 'Money Bouquet',
    priceStart: 100000,
    image: 'https://i.imgur.com/bNwa1Sg.jpeg',
  },
  {
    id: '3',
    name: 'Graduation Bloom Edition',
    category: 'Graduation',
    priceStart: 120000,
    image: 'https://i.imgur.com/yNXqyRT.jpeg',
    label: 'Popular'
  },
  {
    id: '4',
    name: 'Luxury Custom Box',
    category: 'Custom Arrangement',
    priceStart: 250000,
    image: 'https://i.imgur.com/gjiwssL.jpeg',
  }
];

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Dekorasi Ulang Tahun',
    category: 'Dekorasi Ulang Tahun',
    description: 'Bikin momen ulang tahunmu makin aesthetic dengan backdrop dan dekorasi cantik.',
    image: 'https://i.imgur.com/RnQ77mL.jpeg'
  },
  {
    id: '2',
    title: 'Dekorasi Lamaran',
    category: 'Dekorasi Lamaran',
    description: 'Momen sakral lamaran dengan nuansa romantis dan elegan.',
    image: 'https://i.imgur.com/zVxAHF5.jpeg'
  },
  {
    id: '3',
    title: 'Dekorasi Wedding',
    category: 'Dekorasi Wedding',
    description: 'Transformasi venue pernikahanmu jadi negeri dongeng.',
    image: 'https://i.imgur.com/gg5bYBb.jpeg'
  }
];

export const GALLERY_IMAGES = [
  'https://i.imgur.com/kdwdyfe.jpeg',
  'https://i.imgur.com/gdecvoJ.jpeg'
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Amelia',
    comment: 'Buketnya cantik banget! Sesuai request dan pengerjaannya cepat. Pasti repat order!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Budi Santoso',
    comment: 'Dekorasi buat lamaran kemaren rapi banget. Harganya oke banget buat kualitas sejago ini.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Indah Permata',
    comment: 'Warna bunganya fresh, bungkusnya rapi. Adminnya juga fast response banget.',
    rating: 5,
  }
];

export const FAQ_ITEMS = [
  {
    question: 'Berapa lama pengerjaan buket?',
    answer: 'Untuk buket ready stok bisa langsung dikirim, untuk custom normalnya 1-2 hari kerja.'
  },
  {
    question: 'Bisa request budget?',
    answer: 'Tentu! Kami bisa menyesuaikan desain buket dengan budget yang Anda miliki.'
  },
  {
    question: 'Apakah ada jasa pengiriman?',
    answer: 'Ya, kami menyediakan jasa delivery untuk area sekitar lokasi kami.'
  }
];
