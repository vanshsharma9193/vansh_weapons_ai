export const products = [
  {
    id: 1,
    category: 'knives',
    name: 'Predator Hunting Blade',
    emoji: '🔪',
    image: '/images/knife1.png',
    badge: 'BESTSELLER',
    badgeClass: '',
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    rating: 4.8,
    reviews: 312,
    desc: 'Full tang stainless steel blade with ergonomic textured grip for extreme endurance in wilderness.',
    specs: {
      bladeLength: '7.5 inches',
      material: '440C Stainless Steel',
      handle: 'G10 Non-slip composite',
      sheath: 'Tactical Kydex included'
    }
  },
  {
    id: 2,
    category: 'knives',
    name: 'Stealth Tactical Knife',
    emoji: '🗡️',
    image: '/images/knife2.png',
    badge: 'NEW',
    badgeClass: 'new',
    price: 1899,
    originalPrice: 2199,
    discount: 14,
    rating: 4.6,
    reviews: 98,
    desc: 'Lightweight G10 handle with anti-glare 440C stainless steel edge, engineered for quick ops.',
    specs: {
      bladeLength: '5.8 inches',
      material: 'Titanium-coated 440C',
      handle: 'Molded G10',
      sheath: 'Nylon belt pouch'
    }
  },
  {
    id: 3,
    category: 'knives',
    name: 'Survivalist Bowie Knife',
    emoji: '⚔️',
    image: '/images/knife3.png',
    badge: 'HOT',
    badgeClass: 'hot',
    price: 3799,
    originalPrice: 4500,
    discount: 16,
    rating: 4.9,
    reviews: 245,
    desc: 'Classic 12-inch heavy-duty blade with solid brass crossguard and hand-stitched leather sheath.',
    specs: {
      bladeLength: '12.0 inches',
      material: 'High-Carbon Steel',
      handle: 'Rosewood with Brass Accent',
      sheath: 'Genuine Leather Sheath'
    }
  },
  {
    id: 4,
    category: 'bow',
    name: 'Phantom Recurve Bow',
    emoji: '🏹',
    image: '/images/bow1.png',
    badge: 'POPULAR',
    badgeClass: '',
    price: 8999,
    originalPrice: 11000,
    discount: 18,
    rating: 4.7,
    reviews: 167,
    desc: '40lb draw weight, high-tension fiberglass limbs, precision ergonomic ambidextrous wooden riser.',
    specs: {
      drawWeight: '40 lbs',
      bowLength: '62 inches',
      limbMaterial: 'Hard Maple & Fiberglass',
      useCase: 'Archery practice & Target Shooting'
    }
  },
  {
    id: 5,
    category: 'bow',
    name: 'Steel Arrow Set (12pcs)',
    emoji: '🎯',
    image: '/images/bow2.png',
    badge: 'NEW',
    badgeClass: 'new',
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    rating: 4.5,
    reviews: 89,
    desc: 'Ultra-durable carbon fiber shafts fitted with razor stainless steel broadheads for maximum penetration.',
    specs: {
      quantity: '12 Arrows',
      length: '30 inches',
      shaft: 'Pure Carbon Fiber',
      tips: 'Removable 100gr Steel Broadheads'
    }
  },
  {
    id: 6,
    category: 'bow',
    name: 'Olympic Compound Bow',
    emoji: '🏹',
    image: '/images/bow3.png',
    badge: 'PREMIUM',
    badgeClass: '',
    price: 22999,
    originalPrice: 28000,
    discount: 18,
    rating: 4.9,
    reviews: 53,
    desc: '60-70lb adjustable draw weight, 80% let-off ratio, dual CNC machined aircraft aluminum risers.',
    specs: {
      drawWeight: '60 - 70 lbs (Adjustable)',
      letOff: '80%',
      velocity: '320 FPS',
      riser: 'CNC Machined Aluminum'
    }
  },
  {
    id: 7,
    category: 'tactical',
    name: 'Night Owl Tactical Torch',
    emoji: '🔦',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    badge: 'HOT',
    badgeClass: 'hot',
    price: 1599,
    originalPrice: 1999,
    discount: 20,
    rating: 4.6,
    reviews: 445,
    desc: '2000 lumen ultra-bright output with IPX8 waterproof rating and defense tactical strobe mode.',
    specs: {
      lumens: '2000 LM',
      beamRange: '500 meters',
      battery: 'Rechargeable 5000mAh Li-ion',
      modes: 'High, Medium, Low, Strobe, SOS'
    }
  },
  {
    id: 8,
    category: 'tactical',
    name: 'Ranger Multi-Tool Pro',
    emoji: '🔧',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80',
    badge: 'BESTSELLER',
    badgeClass: '',
    price: 3299,
    originalPrice: 3999,
    discount: 18,
    rating: 4.7,
    reviews: 278,
    desc: '21-in-1 stainless steel heavy duty multi-tool with lockable blades and reinforced leather pouch.',
    specs: {
      toolsCount: '21 Functions',
      material: '420HC Stainless Steel',
      locking: 'All-locking mechanism',
      pouch: 'MOLLE Compatible Leather Pouch'
    }
  },
  {
    id: 9,
    category: 'tactical',
    name: 'Black Ops Tactical Vest',
    emoji: '🦺',
    image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=500&q=80',
    badge: 'NEW',
    badgeClass: 'new',
    price: 5499,
    originalPrice: 6500,
    discount: 15,
    rating: 4.5,
    reviews: 134,
    desc: 'Full MOLLE webbing system, 8 utility pockets, padded mesh shoulder straps, adjustable sizing.',
    specs: {
      material: '1000D Waterproof Cordura Nylon',
      pouches: '8 Modular Detachable Pouches',
      size: 'Fully Adjustable (S - 3XL)',
      ventilation: 'Breathable 3D Mesh Lining'
    }
  },
  {
    id: 10,
    category: 'selfdefense',
    name: 'Phantom Pepper Spray',
    emoji: '💨',
    image: 'https://images.unsplash.com/photo-1604231507908-d5a3da85a9d1?w=500&q=80',
    badge: 'BESTSELLER',
    badgeClass: '',
    price: 499,
    originalPrice: 699,
    discount: 29,
    rating: 4.8,
    reviews: 891,
    desc: 'Maximum strength OC pepper formula with 5-meter ballistic stream range, UV dye marker, and quick release clip.',
    specs: {
      effectiveRange: '15 Feet (5 meters)',
      burstCount: '60 Burst Sprays',
      safety: 'Flip-top safety lock',
      certification: '100% Legal under Indian Law'
    }
  },
  {
    id: 11,
    category: 'selfdefense',
    name: 'Guardian Stun Baton',
    emoji: '⚡',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&q=80',
    badge: 'HOT',
    badgeClass: 'hot',
    price: 2799,
    originalPrice: 3299,
    discount: 15,
    rating: 4.7,
    reviews: 234,
    desc: '5 Million Volt deterrent with loud arc spark, integrated LED tactical searchlight, and rechargeable battery.',
    specs: {
      voltage: '5,000,000 Volts',
      flashlight: '300 Lumen Cree LED',
      construction: 'Aircraft Grade Aluminum',
      charging: 'Micro-USB Wall Charger Included'
    }
  },
  {
    id: 12,
    category: 'selfdefense',
    name: 'Kubaton Keychain Set',
    emoji: '🛡️',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    badge: 'NEW',
    badgeClass: 'new',
    price: 349,
    originalPrice: 499,
    discount: 30,
    rating: 4.4,
    reviews: 567,
    desc: 'Machined aircraft aluminum self-defense impact stick with grooved finger grip and quick-attach key ring.',
    specs: {
      length: '5.5 inches',
      weight: '45 grams',
      material: 'T6 Anodized Aluminum',
      colors: 'Matte Black / Gold'
    }
  },
  {
    id: 13,
    category: 'accessories',
    name: 'Molle Tactical Holster',
    emoji: '👜',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80',
    badge: 'POPULAR',
    badgeClass: '',
    price: 1199,
    originalPrice: 1499,
    discount: 20,
    rating: 4.6,
    reviews: 198,
    desc: 'Universal fit tactical holster with ambidextrous mounting options and thumb-break quick release.',
    specs: {
      fit: 'Universal Pistol / Gear Fit',
      attachment: 'Molle & Belt Loops',
      material: 'High-Density 800D Nylon'
    }
  },
  {
    id: 14,
    category: 'accessories',
    name: 'Leather Knife Sheath',
    emoji: '🧳',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',
    badge: 'BESTSELLER',
    badgeClass: '',
    price: 699,
    originalPrice: 899,
    discount: 22,
    rating: 4.8,
    reviews: 334,
    desc: 'Handcrafted full-grain thick leather sheath featuring heavy brass snap button and dual belt loop fits.',
    specs: {
      bladeFit: 'Fits 6 - 9 inch fixed blades',
      material: '100% Genuine Full-grain Leather',
      hardware: 'Solid Brass Hardware'
    }
  },
  {
    id: 15,
    category: 'accessories',
    name: 'Tactical Weapon Bag',
    emoji: '🎒',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    badge: 'NEW',
    badgeClass: 'new',
    price: 3499,
    originalPrice: 4199,
    discount: 17,
    rating: 4.7,
    reviews: 112,
    desc: 'Heavy padded tactical bag with lockable double zippers, modular dividers, and TSA compliant security lock slot.',
    specs: {
      capacity: '35 Liters',
      padding: '20mm High-density EVA Foam',
      zippers: 'YKK Lockable Zippers'
    }
  },
  {
    id: 16,
    category: 'tactical',
    name: 'Night Vision Monocular',
    emoji: '🔭',
    image: 'https://images.unsplash.com/photo-1464820453369-31d2c0b651af?w=500&q=80',
    badge: 'PREMIUM',
    badgeClass: '',
    price: 18999,
    originalPrice: 24000,
    discount: 21,
    rating: 4.8,
    reviews: 67,
    desc: 'Digital night vision monocular featuring 4x optical magnification, 850nm IR illuminator, and HD video recording.',
    specs: {
      magnification: '4x Digital Optical Zoom',
      range: '300 Meters in total darkness',
      sensor: '1080P HD Sensor with micro-display'
    }
  }
];

export const categoryMap = {
  all: 'All Products',
  knives: '🔪 Hunting Knives',
  bow: '🏹 Bows & Arrows',
  tactical: '⚡ Tactical Gear',
  selfdefense: '🛡️ Self-Defense',
  accessories: '🔧 Accessories'
};
