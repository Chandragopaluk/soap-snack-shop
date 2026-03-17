"use client";

import { Product } from "@/data/products";

interface ProductImageProps {
  product: Product;
  size?: "sm" | "small" | "lg" | "large";
  className?: string;
}

export default function ProductImage({
  product,
  size = "small",
  className = "",
}: ProductImageProps) {
  const isLarge = size === "large" || size === "lg";
  const initial = product.name.charAt(0).toUpperCase();
  const category = product.category;

  const soapIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={isLarge ? "w-16 h-16" : "w-10 h-10"}
    >
      <circle cx="20" cy="18" r="6" fill="rgba(255,255,255,0.4)" />
      <circle cx="36" cy="14" r="4" fill="rgba(255,255,255,0.3)" />
      <circle cx="28" cy="28" r="5" fill="rgba(255,255,255,0.35)" />
      <circle cx="44" cy="24" r="3" fill="rgba(255,255,255,0.25)" />
      <rect x="12" y="36" width="40" height="22" rx="4" fill="rgba(255,255,255,0.5)" />
      <rect x="16" y="40" width="32" height="14" rx="2" fill="rgba(255,255,255,0.3)" />
    </svg>
  );

  const snackIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      className={isLarge ? "w-16 h-16" : "w-10 h-10"}
    >
      <path
        d="M12 44 C12 44, 20 16, 32 16 C44 16, 52 44, 52 44 Z"
        fill="rgba(255,255,255,0.4)"
      />
      <circle cx="26" cy="32" r="2" fill="rgba(255,255,255,0.6)" />
      <circle cx="34" cy="28" r="1.5" fill="rgba(255,255,255,0.6)" />
      <circle cx="30" cy="38" r="1.5" fill="rgba(255,255,255,0.6)" />
      <circle cx="38" cy="36" r="2" fill="rgba(255,255,255,0.6)" />
      <path
        d="M8 44 h48 v4 a4 4 0 01-4 4 H12 a4 4 0 01-4-4 v-4z"
        fill="rgba(255,255,255,0.5)"
      />
    </svg>
  );

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-xl overflow-hidden ${
        isLarge ? "h-80" : "h-48"
      } ${
        category === "soap"
          ? "bg-gradient-to-br from-teal-400 to-emerald-600"
          : "bg-gradient-to-br from-amber-400 to-orange-600"
      } ${className}`}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 left-4 w-12 h-12 rounded-full bg-white" />
        <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-white" />
        <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-white" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3">
        {category === "soap" ? soapIcon : snackIcon}
        <div
          className={`flex items-center justify-center rounded-full bg-white/30 backdrop-blur-sm font-bold text-white ${
            isLarge ? "w-14 h-14 text-2xl" : "w-10 h-10 text-lg"
          }`}
        >
          {initial}
        </div>
      </div>

      <span
        className={`relative z-10 mt-2 text-white/80 font-medium ${
          isLarge ? "text-sm" : "text-xs"
        }`}
      >
        {category === "soap" ? "Artisan Soap" : "Gourmet Snack"}
      </span>
    </div>
  );
}
