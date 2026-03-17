"use client";

import { useState } from "react";
import { products, getProductsByCategory } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";

type Filter = "all" | "soap" | "snack";

export default function ProductsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredProducts =
    filter === "all" ? products : getProductsByCategory(filter);

  const tabs: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Soaps", value: "soap" },
    { label: "Snacks", value: "snack" },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
      <p className="mt-2 text-gray-500">
        Browse our full collection of handcrafted soaps and gourmet snacks.
      </p>

      {/* Filter Tabs */}
      <div className="mt-8 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === tab.value
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="mt-8">
        <ProductGrid products={filteredProducts} />
      </div>
    </main>
  );
}
