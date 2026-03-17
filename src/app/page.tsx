import Link from "next/link";
import { products } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";

const features = [
  {
    title: "Natural",
    description: "Made with 100% natural and organic ingredients sourced responsibly.",
    icon: "🌿",
  },
  {
    title: "Handcrafted",
    description: "Each product is carefully made by hand in small batches.",
    icon: "🤲",
  },
  {
    title: "Sustainable",
    description: "Eco-friendly packaging and zero-waste manufacturing process.",
    icon: "♻️",
  },
  {
    title: "Free Shipping",
    description: "Complimentary shipping on all orders over $30.",
    icon: "📦",
  },
];

export default function HomePage() {
  const featuredSoaps = products
    .filter((p) => p.category === "soap")
    .slice(0, 3);
  const featuredSnacks = products
    .filter((p) => p.category === "snack")
    .slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white">
        <div className="max-w-6xl mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Pure &amp; Savoury
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Handcrafted Soaps &amp; Gourmet Snacks
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products?category=soap"
              className="inline-block px-8 py-3 bg-white text-purple-700 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Shop Soaps
            </Link>
            <Link
              href="/products?category=snack"
              className="inline-block px-8 py-3 bg-white/20 backdrop-blur text-white font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-colors"
            >
              Shop Snacks
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Soaps */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Soaps</h2>
          <Link
            href="/products?category=soap"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            View all &rarr;
          </Link>
        </div>
        <ProductGrid products={featuredSoaps} />
      </section>

      {/* Featured Snacks */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Snacks</h2>
          <Link
            href="/products?category=snack"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            View all &rarr;
          </Link>
        </div>
        <ProductGrid products={featuredSnacks} />
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100"
              >
                <span className="text-4xl block mb-4">{feature.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
