export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "soap" | "snack";
  image: string;
  rating: number;
  inStock: boolean;
  features: string[];
}

export const products: Product[] = [
  {
    id: "soap-lavender-bliss",
    name: "Lavender Bliss Bar",
    description:
      "Handcrafted with pure lavender essential oil and shea butter. This luxurious bar soothes your skin while filling your bathroom with a calming aroma.",
    price: 8.99,
    category: "soap",
    image: "/images/soap-lavender.svg",
    rating: 4.8,
    inStock: true,
    features: [
      "100% Natural Ingredients",
      "Vegan & Cruelty-Free",
      "Long-lasting fragrance",
    ],
  },
  {
    id: "soap-charcoal-detox",
    name: "Charcoal Detox Bar",
    description:
      "Activated charcoal draws out impurities while tea tree oil refreshes. Perfect for oily and combination skin types.",
    price: 9.99,
    category: "soap",
    image: "/images/soap-charcoal.svg",
    rating: 4.6,
    inStock: true,
    features: [
      "Deep Cleansing",
      "Activated Charcoal",
      "Tea Tree Oil Infused",
    ],
  },
  {
    id: "soap-honey-oat",
    name: "Honey & Oat Moisturizer",
    description:
      "A gentle exfoliating bar made with real honey and finely ground oats. Leaves skin feeling silky smooth and deeply moisturized.",
    price: 7.99,
    category: "soap",
    image: "/images/soap-honey.svg",
    rating: 4.9,
    inStock: true,
    features: [
      "Gentle Exfoliation",
      "Raw Honey",
      "Sensitive Skin Friendly",
    ],
  },
  {
    id: "soap-citrus-burst",
    name: "Citrus Burst Energizer",
    description:
      "Wake up with a burst of orange, lemon, and grapefruit essential oils. Packed with vitamin C for radiant skin.",
    price: 8.49,
    category: "soap",
    image: "/images/soap-citrus.svg",
    rating: 4.7,
    inStock: true,
    features: ["Vitamin C Rich", "Energizing Scent", "Cold-Pressed Oils"],
  },
  {
    id: "soap-rose-garden",
    name: "Rose Garden Luxury",
    description:
      "Infused with real rose petals and rosehip oil. This premium bar delivers deep hydration and an elegant floral scent.",
    price: 12.99,
    category: "soap",
    image: "/images/soap-rose.svg",
    rating: 4.9,
    inStock: true,
    features: ["Real Rose Petals", "Rosehip Oil", "Premium Formula"],
  },
  {
    id: "soap-mint-refresh",
    name: "Peppermint Refresh Bar",
    description:
      "Cool peppermint and eucalyptus create an invigorating shower experience. Great for post-workout freshness.",
    price: 8.99,
    category: "soap",
    image: "/images/soap-mint.svg",
    rating: 4.5,
    inStock: true,
    features: ["Cooling Effect", "Eucalyptus Blend", "Post-Workout Fresh"],
  },
  {
    id: "snack-spicy-nuts",
    name: "Fiery Masala Mixed Nuts",
    description:
      "A bold blend of cashews, almonds, and peanuts tossed in our signature masala spice mix. Roasted to crunchy perfection.",
    price: 6.99,
    category: "snack",
    image: "/images/snack-nuts.svg",
    rating: 4.7,
    inStock: true,
    features: ["High Protein", "Gluten-Free", "No Artificial Flavours"],
  },
  {
    id: "snack-cheese-crackers",
    name: "Aged Cheddar Crackers",
    description:
      "Baked crispy crackers dusted with real aged cheddar cheese. The perfect savoury companion for any time of day.",
    price: 4.99,
    category: "snack",
    image: "/images/snack-crackers.svg",
    rating: 4.5,
    inStock: true,
    features: ["Real Cheese", "Oven Baked", "No Preservatives"],
  },
  {
    id: "snack-herb-chips",
    name: "Rosemary & Sea Salt Chips",
    description:
      "Thin-cut potato chips seasoned with fresh rosemary and flaky sea salt. Kettle-cooked for maximum crunch.",
    price: 5.49,
    category: "snack",
    image: "/images/snack-chips.svg",
    rating: 4.8,
    inStock: true,
    features: ["Kettle-Cooked", "Fresh Herbs", "Small Batch"],
  },
  {
    id: "snack-pretzel-bites",
    name: "Garlic Parmesan Pretzel Bites",
    description:
      "Soft pretzel bites coated in garlic butter and parmesan cheese. Baked golden and irresistibly moreish.",
    price: 5.99,
    category: "snack",
    image: "/images/snack-pretzels.svg",
    rating: 4.6,
    inStock: true,
    features: ["Soft & Chewy", "Real Parmesan", "Garlic Butter Coated"],
  },
  {
    id: "snack-trail-mix",
    name: "Adventure Trail Mix",
    description:
      "A savoury mix of roasted seeds, spiced chickpeas, dried cranberries, and dark chocolate chunks. Fuel for any adventure.",
    price: 7.49,
    category: "snack",
    image: "/images/snack-trail.svg",
    rating: 4.8,
    inStock: true,
    features: ["Energy Boost", "Mixed Seeds", "Dark Chocolate"],
  },
  {
    id: "snack-seaweed-crisps",
    name: "Wasabi Seaweed Crisps",
    description:
      "Light and crispy seaweed sheets with a kick of wasabi. A guilt-free snack packed with minerals and umami flavour.",
    price: 4.49,
    category: "snack",
    image: "/images/snack-seaweed.svg",
    rating: 4.4,
    inStock: true,
    features: ["Low Calorie", "Rich in Minerals", "Umami Flavour"],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(
  category: "soap" | "snack"
): Product[] {
  return products.filter((p) => p.category === category);
}
