"use client";

import Link from "next/link";
import { Product } from "@/data/products";
import { useStore } from "@/lib/store";
import ProductImage from "@/components/ProductImage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);

  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="card group flex flex-col">
      <Link href={`/products/${product.id}`} className="block">
        <div className="overflow-hidden">
          <div className="transform transition-transform duration-300 group-hover:scale-105">
            <ProductImage
              product={product}
              size="small"
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link
            href={`/products/${product.id}`}
            className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-1"
          >
            {product.name}
          </Link>
          <span className="text-lg font-bold text-primary-700 whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: fullStars }).map((_, i) => (
            <svg
              key={`full-${i}`}
              className="w-4 h-4 text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          {hasHalfStar && (
            <svg
              className="w-4 h-4 text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <defs>
                <linearGradient id={`half-${product.id}`}>
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#d1d5db" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#half-${product.id})`}
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          )}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <svg
              key={`empty-${i}`}
              className="w-4 h-4 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-1 text-sm text-gray-500">
            {product.rating.toFixed(1)}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.features.map((feature) => (
            <span
              key={feature}
              className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-primary-50 text-primary-700"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2">
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="flex-1 btn-primary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150"
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
          <Link
            href={`/products/${product.id}`}
            className="btn-outline text-sm py-2 px-4 text-center hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
