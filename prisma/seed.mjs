import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    name: "Midnight Rose",
    description: "A rich, velvety blend of Bulgarian rose, dark patchouli, and warm amber. Ideal for evenings when you want the room to feel like a secret garden.",
    price: 1850,
    imageUrl: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=600&q=80",
    category: "Floral",
    stock: 24,
  },
  {
    name: "Saffron & Oud",
    description: "The warmth of golden saffron meets ancient oud wood. A bold, festive fragrance that commands attention and lingers long after the flame is out.",
    price: 2400,
    imageUrl: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80",
    category: "Oriental",
    stock: 18,
  },
  {
    name: "Cedar & Smoke",
    description: "Atlas cedar, birch tar, and a whisper of vetiver. Earthy, grounding, and deeply masculine — like a cabin fireplace on a winter night.",
    price: 1650,
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    category: "Woody",
    stock: 30,
  },
  {
    name: "Lemon Verbena",
    description: "Bright, clean lemon verbena with a hint of green herbs and white musk. Sharpens focus, clears the mind, and fills the room with optimism.",
    price: 1450,
    imageUrl: "https://images.unsplash.com/photo-1556909172-89cf0b15cff8?w=600&q=80",
    category: "Citrus",
    stock: 40,
  },
  {
    name: "Sandalwood & Vanilla",
    description: "Creamy sandalwood warmed by sweet vanilla and a touch of tonka bean. The ultimate comfort candle — like a cashmere throw in fragrance form.",
    price: 1750,
    imageUrl: "https://images.unsplash.com/photo-1608181831718-c9e3a43cf5d1?w=600&q=80",
    category: "Woody",
    stock: 35,
  },
  {
    name: "Jasmine Noir",
    description: "Heady night-blooming jasmine anchored by black musk and a veil of smoked woods. Sensual, mysterious, and unforgettable.",
    price: 1950,
    imageUrl: "https://images.unsplash.com/photo-1609610169870-bb91bf8cb3b2?w=600&q=80",
    category: "Floral",
    stock: 20,
  },
  {
    name: "Cardamom & Fig",
    description: "Spiced green cardamom with ripe fig and a base of creamy benzoin. Warm, exotic, and utterly unique — a scent unlike anything you've tried.",
    price: 1850,
    imageUrl: "https://images.unsplash.com/photo-1575563060200-d34e7b9e3748?w=600&q=80",
    category: "Oriental",
    stock: 22,
  },
  {
    name: "White Tea & Ginger",
    description: "Delicate white tea leaves with a spark of fresh ginger and clean ocean musk. Light, airy, and meditative — perfect for morning rituals.",
    price: 1550,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80",
    category: "Earthy",
    stock: 28,
  },
  {
    name: "Vetiver & Black Pepper",
    description: "Raw vetiver root electrified by sharp black pepper and a smoky base. A statement scent for those who prefer their spaces to feel alive.",
    price: 2100,
    imageUrl: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&q=80",
    category: "Earthy",
    stock: 15,
  },
  {
    name: "Peony & Silk",
    description: "The freshest peony blossom over silk musk and a wisp of powdery iris. Clean, romantic, and timelessly elegant.",
    price: 1650,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    category: "Floral",
    stock: 32,
  },
  {
    name: "Amber & Benzoin",
    description: "Golden amber resin, sweet benzoin, and a trace of labdanum. Rich and resinous — a scent that wraps around you like an embrace.",
    price: 2250,
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
    category: "Oriental",
    stock: 12,
  },
  {
    name: "Forest After Rain",
    description: "Petrichor, wet fern, pine bark, and mossy earth. This is what it smells like when the forest exhales. Pure, primal, and restorative.",
    price: 1750,
    imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&q=80",
    category: "Earthy",
    stock: 26,
  },
];

async function main() {
  console.log('Seeding Supabase with', products.length, 'products...');

  // Clear existing products first
  await prisma.product.deleteMany();
  console.log('Cleared existing products');

  for (const p of products) {
    const created = await prisma.product.create({ data: p });
    console.log(' ✓', created.name);
  }

  console.log('\n✅ All products seeded successfully!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
