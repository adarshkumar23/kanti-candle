export interface ProductSize {
  label: string;
  weight: string;
  price: number;
  burnTime: string;
}

export interface ScentProfile {
  top: number;    // 0-100
  heart: number;
  base: number;
  intensity: number;
  longevity: number;
}

export interface Product {
  slug: string;
  name: string;
  series: string;
  category: "floral" | "woody" | "oriental" | "citrus" | "earthy";
  description: string;
  scentNotes: string[];
  sizes: ProductSize[];
  imageUrl: string;
  images?: string[];
  badge?: "Bestseller" | "New" | "Limited";
  inStock: boolean;
  // New luxury fields
  price: number;
  weight: string;
  burnTime: string;
  tags: string[];
  scentProfile?: ScentProfile;
  batchSize?: number;
  pouredDate?: string;
}

export const products: Product[] = [
  {
    slug: "luxury-amber",
    name: "Luxury Amber",
    series: "Oriental Series",
    category: "oriental",
    description:
      "A rich, intoxicating blend that wraps your space in warmth. Luxury Amber opens with deep amber resin and mellows into a heart of smoky oud and cedarwood. The perfect companion for quiet winter evenings.",
    scentNotes: ["Amber", "Oud", "Cedarwood"],
    sizes: [
      { label: "Small", weight: "100g", price: 1600, burnTime: "20–25 hrs" },
      { label: "Medium", weight: "200g", price: 2400, burnTime: "45–55 hrs" },
      { label: "Large", weight: "400g", price: 3200, burnTime: "80–90 hrs" },
    ],
    price: 2400,
    weight: "200g",
    burnTime: "80–90 hours",
    tags: ["oriental", "warm", "luxe"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCZ8uEKjqePVk15g-8h40CLySWAgVkEqSByQQzERKpIBL3cBnaeOwwIMf--tDt3xz6UFIc-OyyCk8plIQ8D5gWuO28leaUybiDgDpAXYfzqenABQpzAY9hVUfEGb7oBWK-TiluYCO3aZRB5DSGQTfQRMnRCocOjJi5BkAZC_KAjhU0HnXk-szCLIXKgqUFpGpPjjvdA",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCZ8uEKjqePVk15g-8h40CLySWAgVkEqSByQQzERKpIBL3cBnaeOwwIMf--tDt3xz6UFIc-OyyCk8plIQ8D5gWuO28leaUybiDgDpAXYfzqenABQpzAY9hVUfEGb7oBWK-TiluYCO3aZRB5DSGQTfQRMnRCocOjJi5BkAZC_KAjhU0HnXk-szCLIXKgqUFpGpPjjvdA",
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=600&q=80",
      "https://images.unsplash.com/photo-1608181831688-ba943659e786?w=600&q=80",
    ],
    badge: "Bestseller",
    inStock: true,
    scentProfile: { top: 70, heart: 85, base: 95, intensity: 88, longevity: 90 },
    batchSize: 24,
    pouredDate: "March 18, 2026",
  },
  {
    slug: "sacred-sandalwood",
    name: "Sacred Sandalwood",
    series: "Earthy Series",
    category: "earthy",
    description:
      "Inspired by ancient temple rituals, Sacred Sandalwood marries creamy Indian sandalwood with soft musk and a whisper of warm vanilla. Grounding, meditative, and deeply calming.",
    scentNotes: ["Sandalwood", "Musk", "Vanilla"],
    sizes: [
      { label: "Small", weight: "100g", price: 1450, burnTime: "18–22 hrs" },
      { label: "Medium", weight: "200g", price: 1850, burnTime: "40–50 hrs" },
      { label: "Large", weight: "400g", price: 2800, burnTime: "75–85 hrs" },
    ],
    price: 1850,
    weight: "200g",
    burnTime: "75–85 hours",
    tags: ["earthy", "meditative", "woody"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzvJ73WuY64668n7wCYJHK3dEqiuFnaI9W_O7S6eSiQXZ_G97Zgbo9g5VAYqL4NUzdKcHzNpIF3Q44OG6bVX_YbHBdLlioLrjpAZPhJV3t7Q2iGB7aIyUkrpbqpcr4dA",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzvJ73WuY64668n7wCYJHK3dEqiuFnaI9W_O7S6eSiQXZ_G97Zgbo9g5VAYqL4NUzdKcHzNpIF3Q44OG6bVX_YbHBdLlioLrjpAZPhJV3t7Q2iGB7aIyUkrpbqpcr4dA",
      "https://images.unsplash.com/photo-1614607242094-b1b2cf769ff3?w=600&q=80",
      "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&q=80",
    ],
    badge: "New",
    inStock: true,
    scentProfile: { top: 55, heart: 80, base: 90, intensity: 72, longevity: 88 },
    batchSize: 24,
    pouredDate: "March 20, 2026",
  },
  {
    slug: "temple-bloom",
    name: "Temple Bloom",
    series: "Floral Series",
    category: "floral",
    description:
      "A lush bouquet captured in wax. Temple Bloom layers night-blooming jasmine over heady tuberose, anchored by a smoky incense base. Romantic, sacred, and unforgettable.",
    scentNotes: ["Jasmine", "Tuberose", "Incense"],
    sizes: [
      { label: "Small", weight: "100g", price: 1400, burnTime: "18–20 hrs" },
      { label: "Medium", weight: "200g", price: 1750, burnTime: "38–45 hrs" },
      { label: "Large", weight: "400g", price: 2650, burnTime: "70–80 hrs" },
    ],
    price: 1750,
    weight: "200g",
    burnTime: "70–80 hours",
    tags: ["floral", "romantic", "incense"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCV5m1YSJ6tgeGf79eOKWZAG4COFw3XJQSdHsZoQOXps3EM77zdD2H0VLT4v7nN2yOh6TGaQEIBhB2ugIPUaG0k9G6C5FZ8nbAELpzbdTKj4BV9mWXyPRaVIeLJQvLe2ZHeXR-wDz_lXoCQD84YOlLFybBmIBDFBBfIh_6R",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCV5m1YSJ6tgeGf79eOKWZAG4COFw3XJQSdHsZoQOXps3EM77zdD2H0VLT4v7nN2yOh6TGaQEIBhB2ugIPUaG0k9G6C5FZ8nbAELpzbdTKj4BV9mWXyPRaVIeLJQvLe2ZHeXR-wDz_lXoCQD84YOlLFybBmIBDFBBfIh_6R",
      "https://images.unsplash.com/photo-1543006098-3af3e5c984e0?w=600&q=80",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80",
    ],
    inStock: true,
    scentProfile: { top: 85, heart: 90, base: 65, intensity: 78, longevity: 75 },
    batchSize: 20,
    pouredDate: "March 15, 2026",
  },
  {
    slug: "the-noir",
    name: "The Noir",
    series: "Midnight Series",
    category: "woody",
    description:
      "Dark, daring, and deeply sophisticated. The Noir combines smoky sandalwood with raw oud and a crack of black pepper. A candle for those who prefer their light with an edge.",
    scentNotes: ["Sandalwood", "Oud", "Black Pepper"],
    sizes: [
      { label: "Small", weight: "100g", price: 1700, burnTime: "20–25 hrs" },
      { label: "Medium", weight: "200g", price: 2500, burnTime: "45–55 hrs" },
      { label: "Large", weight: "400g", price: 3400, burnTime: "85–95 hrs" },
    ],
    price: 2500,
    weight: "200g",
    burnTime: "85–95 hours",
    tags: ["woody", "dark", "bold"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2rT8N_NvldqwycFoszsg-nm_6sTI2iQgdxdPvncsUPzgPi3hVJ_Te4fVtKAEDqHm5GgywmB7jJ1GkMANQlgpOUN36gsFL53m4VIUbGt86FQhV14fP1vXTjZC8tuuG2LqYicrCz8CN9JiQ-DmUe2EFFbroqkJmenzR55L9Mseot0VRHODYZl_z324anFMzyX19NMPKnXsEVGL-k8ctYNZxZHAek7bempXIpktRpaHxs2QSK9OqHsycO6NJYZ2pKPZwTySUtZmJOgU",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2rT8N_NvldqwycFoszsg-nm_6sTI2iQgdxdPvncsUPzgPi3hVJ_Te4fVtKAEDqHm5GgywmB7jJ1GkMANQlgpOUN36gsFL53m4VIUbGt86FQhV14fP1vXTjZC8tuuG2LqYicrCz8CN9JiQ-DmUe2EFFbroqkJmenzR55L9Mseot0VRHODYZl_z324anFMzyX19NMPKnXsEVGL-k8ctYNZxZHAek7bempXIpktRpaHxs2QSK9OqHsycO6NJYZ2pKPZwTySUtZmJOgU",
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=600&q=80",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80",
    ],
    badge: "Bestseller",
    inStock: true,
    scentProfile: { top: 80, heart: 75, base: 95, intensity: 92, longevity: 88 },
    batchSize: 24,
    pouredDate: "March 10, 2026",
  },
  {
    slug: "ethereal-bloom",
    name: "Ethereal Bloom",
    series: "Dawn Series",
    category: "floral",
    description:
      "Light as the first breath of morning. Ethereal Bloom dances between dewy jasmine, sun-warmed neroli, and a cloud of white musk. Uplifting, elegant, and effortlessly feminine.",
    scentNotes: ["Jasmine", "Neroli", "White Musk"],
    sizes: [
      { label: "Small", weight: "100g", price: 1500, burnTime: "18–22 hrs" },
      { label: "Medium", weight: "200g", price: 2200, burnTime: "42–50 hrs" },
      { label: "Large", weight: "400g", price: 3000, burnTime: "78–88 hrs" },
    ],
    price: 2200,
    weight: "200g",
    burnTime: "78–88 hours",
    tags: ["floral", "light", "feminine"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIU5Eg2NSv631pzvRORhVyokxf3fD_BRVFvg3rcts3jPG4nFwa35B4feueu7KeoSdVFNWaUo98_CWeXuzAdT6arMiJXELqLYZMqH1YqJFzIZtUZxLLECf-a8My6VduD9jO3v5HPctsjTLcQn9Wne5ptMTpbwlSzhxZ3ThL8C--DChbIib750orRHq79X3bKUjM4S-yK7LaUqqayzewPPXvjckDLLX9h5VvKuqX6T1_v4JZkBd7h7eOf3WF3Z6lo5JdllVowVZ9Ywo",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIU5Eg2NSv631pzvRORhVyokxf3fD_BRVFvg3rcts3jPG4nFwa35B4feueu7KeoSdVFNWaUo98_CWeXuzAdT6arMiJXELqLYZMqH1YqJFzIZtUZxLLECf-a8My6VduD9jO3v5HPctsjTLcQn9Wne5ptMTpbwlSzhxZ3ThL8C--DChbIib750orRHq79X3bKUjM4S-yK7LaUqqayzewPPXvjckDLLX9h5VvKuqX6T1_v4JZkBd7h7eOf3WF3Z6lo5JdllVowVZ9Ywo",
      "https://images.unsplash.com/photo-1543006098-3af3e5c984e0?w=600&q=80",
      "https://images.unsplash.com/photo-1608181831688-ba943659e786?w=600&q=80",
    ],
    inStock: true,
    scentProfile: { top: 88, heart: 82, base: 55, intensity: 68, longevity: 72 },
    batchSize: 20,
    pouredDate: "March 22, 2026",
  },
  {
    slug: "terra-spirit",
    name: "Terra Spirit",
    series: "Earth Series",
    category: "earthy",
    description:
      "Rooted in the wild. Terra Spirit captures the essence of a rain-soaked forest floor — vetiver and cedar wrapped in damp green moss. For nature lovers and old souls.",
    scentNotes: ["Vetiver", "Cedar", "Moss"],
    sizes: [
      { label: "Small", weight: "100g", price: 1550, burnTime: "20–24 hrs" },
      { label: "Medium", weight: "200g", price: 2300, burnTime: "44–52 hrs" },
      { label: "Large", weight: "400g", price: 3100, burnTime: "80–90 hrs" },
    ],
    price: 2300,
    weight: "200g",
    burnTime: "80–90 hours",
    tags: ["earthy", "forest", "grounding"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBd2KgF5uAG21Af-sdWNCvdkpW0GlO6ZhuGmhIIgqzmGbTRyl0TjYBkaMdx33QhvRupj1BSa2iDS9ZGpvi1gEkelz8gecogm29PTV1rZW7UGhQQLsB16pdKR_tBQ6FqjwQ8gY6C3q7OyzIlXnK4zlMoiPacevJ40w4EyhSU80KgUzyPmvUefudKcOrsdMjgXcGDgtqkiDUYb_8GUktpz3ujEFoCBF39AtucqQCYKbcWWxtF8XQTai1Oa4w-6QO8vLuENGNCBvM_HxQ",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBd2KgF5uAG21Af-sdWNCvdkpW0GlO6ZhuGmhIIgqzmGbTRyl0TjYBkaMdx33QhvRupj1BSa2iDS9ZGpvi1gEkelz8gecogm29PTV1rZW7UGhQQLsB16pdKR_tBQ6FqjwQ8gY6C3q7OyzIlXnK4zlMoiPacevJ40w4EyhSU80KgUzyPmvUefudKcOrsdMjgXcGDgtqkiDUYb_8GUktpz3ujEFoCBF39AtucqQCYKbcWWxtF8XQTai1Oa4w-6QO8vLuENGNCBvM_HxQ",
      "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&q=80",
      "https://images.unsplash.com/photo-1614607242094-b1b2cf769ff3?w=600&q=80",
    ],
    badge: "New",
    inStock: true,
    scentProfile: { top: 60, heart: 70, base: 88, intensity: 75, longevity: 85 },
    batchSize: 18,
    pouredDate: "March 12, 2026",
  },
  {
    slug: "golden-saffron",
    name: "Golden Saffron",
    series: "Royal Series",
    category: "oriental",
    description:
      "A regal masterpiece. Golden Saffron blooms with precious saffron threads, deepened by rose absolute and a base of warm, resinous amber. Opulent yet intimate.",
    scentNotes: ["Saffron", "Rose", "Amber"],
    sizes: [
      { label: "Small", weight: "100g", price: 1800, burnTime: "20–25 hrs" },
      { label: "Medium", weight: "200g", price: 2600, burnTime: "48–56 hrs" },
      { label: "Large", weight: "400g", price: 3500, burnTime: "90–100 hrs" },
    ],
    price: 2600,
    weight: "200g",
    burnTime: "90–100 hours",
    tags: ["oriental", "royal", "saffron"],
    imageUrl:
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=600&q=80",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80",
      "https://images.unsplash.com/photo-1543006098-3af3e5c984e0?w=600&q=80",
    ],
    badge: "Limited",
    inStock: true,
    scentProfile: { top: 78, heart: 88, base: 80, intensity: 85, longevity: 92 },
    batchSize: 16,
    pouredDate: "March 5, 2026",
  },
  {
    slug: "citrus-dawn",
    name: "Citrus Dawn",
    series: "Sunrise Series",
    category: "citrus",
    description:
      "Wake up your space. Citrus Dawn bursts open with Sicilian bergamot and yuzu zest, balanced by a heart of lemongrass and a soft, clean musk finish. Energizing and bright.",
    scentNotes: ["Bergamot", "Yuzu", "Lemongrass"],
    sizes: [
      { label: "Small", weight: "100g", price: 1350, burnTime: "18–22 hrs" },
      { label: "Medium", weight: "200g", price: 1800, burnTime: "38–45 hrs" },
      { label: "Large", weight: "400g", price: 2500, burnTime: "70–80 hrs" },
    ],
    price: 1800,
    weight: "200g",
    burnTime: "70–80 hours",
    tags: ["citrus", "energizing", "fresh"],
    imageUrl:
      "https://images.unsplash.com/photo-1543006098-3af3e5c984e0?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1543006098-3af3e5c984e0?w=600&q=80",
      "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&q=80",
      "https://images.unsplash.com/photo-1608181831688-ba943659e786?w=600&q=80",
    ],
    inStock: true,
    scentProfile: { top: 92, heart: 75, base: 50, intensity: 70, longevity: 65 },
    batchSize: 24,
    pouredDate: "March 25, 2026",
  },
  {
    slug: "wild-lavender",
    name: "Wild Lavender",
    series: "Provence Series",
    category: "floral",
    description:
      "Fields of purple under an endless sky. Wild Lavender layers French lavender with herbaceous rosemary and a dusting of dried eucalyptus. The ultimate wind-down ritual.",
    scentNotes: ["Lavender", "Rosemary", "Eucalyptus"],
    sizes: [
      { label: "Small", weight: "100g", price: 1400, burnTime: "18–22 hrs" },
      { label: "Medium", weight: "200g", price: 1900, burnTime: "40–48 hrs" },
      { label: "Large", weight: "400g", price: 2700, burnTime: "75–85 hrs" },
    ],
    price: 1900,
    weight: "200g",
    burnTime: "75–85 hours",
    tags: ["floral", "calming", "herbal"],
    imageUrl:
      "https://images.unsplash.com/photo-1608181831688-ba943659e786?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1608181831688-ba943659e786?w=600&q=80",
      "https://images.unsplash.com/photo-1543006098-3af3e5c984e0?w=600&q=80",
      "https://images.unsplash.com/photo-1614607242094-b1b2cf769ff3?w=600&q=80",
    ],
    inStock: true,
    scentProfile: { top: 82, heart: 78, base: 55, intensity: 65, longevity: 78 },
    batchSize: 24,
    pouredDate: "March 20, 2026",
  },
  {
    slug: "smoky-vetiver",
    name: "Smoky Vetiver",
    series: "Midnight Series",
    category: "woody",
    description:
      "For those who like it raw. Smoky Vetiver blends dark vetiver root with charred birch and a hint of leather. Unapologetically bold, masculine, and complex.",
    scentNotes: ["Vetiver", "Birch", "Leather"],
    sizes: [
      { label: "Small", weight: "100g", price: 1650, burnTime: "20–25 hrs" },
      { label: "Medium", weight: "200g", price: 2400, burnTime: "45–52 hrs" },
      { label: "Large", weight: "400g", price: 3200, burnTime: "82–92 hrs" },
    ],
    price: 2400,
    weight: "200g",
    burnTime: "82–92 hours",
    tags: ["woody", "smoky", "masculine"],
    imageUrl:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80",
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=600&q=80",
      "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&q=80",
    ],
    badge: "Bestseller",
    inStock: true,
    scentProfile: { top: 65, heart: 72, base: 95, intensity: 90, longevity: 87 },
    batchSize: 24,
    pouredDate: "March 8, 2026",
  },
  {
    slug: "ocean-drift",
    name: "Ocean Drift",
    series: "Coastal Series",
    category: "citrus",
    description:
      "Salt air and sea glass. Ocean Drift captures the coast with marine accord, driftwood, and a fresh squeeze of lime. Light, breezy, and endlessly refreshing.",
    scentNotes: ["Sea Salt", "Driftwood", "Lime"],
    sizes: [
      { label: "Small", weight: "100g", price: 1450, burnTime: "18–22 hrs" },
      { label: "Medium", weight: "200g", price: 2000, burnTime: "40–48 hrs" },
      { label: "Large", weight: "400g", price: 2800, burnTime: "75–85 hrs" },
    ],
    price: 2000,
    weight: "200g",
    burnTime: "75–85 hours",
    tags: ["citrus", "fresh", "coastal"],
    imageUrl:
      "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&q=80",
      "https://images.unsplash.com/photo-1543006098-3af3e5c984e0?w=600&q=80",
      "https://images.unsplash.com/photo-1608181831688-ba943659e786?w=600&q=80",
    ],
    inStock: true,
    scentProfile: { top: 88, heart: 68, base: 60, intensity: 65, longevity: 70 },
    batchSize: 24,
    pouredDate: "March 23, 2026",
  },
  {
    slug: "spiced-chai",
    name: "Spiced Chai",
    series: "Heritage Series",
    category: "oriental",
    description:
      "A warm hug in a jar. Spiced Chai simmers with cardamom, cinnamon bark, and clove, sweetened by creamy vanilla and a touch of black tea. Nostalgic and comforting.",
    scentNotes: ["Cardamom", "Cinnamon", "Vanilla"],
    sizes: [
      { label: "Small", weight: "100g", price: 1500, burnTime: "20–24 hrs" },
      { label: "Medium", weight: "200g", price: 2100, burnTime: "42–50 hrs" },
      { label: "Large", weight: "400g", price: 2900, burnTime: "78–88 hrs" },
    ],
    price: 2100,
    weight: "200g",
    burnTime: "78–88 hours",
    tags: ["oriental", "spice", "cozy"],
    imageUrl:
      "https://images.unsplash.com/photo-1614607242094-b1b2cf769ff3?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1614607242094-b1b2cf769ff3?w=600&q=80",
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=600&q=80",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80",
    ],
    badge: "New",
    inStock: true,
    scentProfile: { top: 82, heart: 85, base: 75, intensity: 80, longevity: 82 },
    batchSize: 24,
    pouredDate: "March 17, 2026",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(count: number): Product[] {
  return products.filter((p) => p.badge).slice(0, count);
}

export function getAllCategories(): string[] {
  return ["all", ...new Set(products.map((p) => p.category))];
}
