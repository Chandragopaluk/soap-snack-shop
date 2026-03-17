"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import { useStore } from "@/lib/store";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const addToCart = useStore((state) => state.addToCart);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors rounded-l-lg"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-4 py-2 text-center min-w-[3rem] font-medium">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors rounded-r-lg"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className="flex-1 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="mt-3 px-4 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-lg border border-green-200">
          Added {quantity} {quantity > 1 ? "items" : "item"} to cart!
        </div>
      )}
    </div>
  );
}
