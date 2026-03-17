import { getProductById, products } from "@/data/products";
import ProductImage from "@/components/ProductImage";
import ProductGrid from "@/components/ProductGrid";
import AddToCartButton from "./AddToCartButton";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Product not found</h1>
        <p className="mt-2 text-gray-500">
          The product you are looking for does not exist or has been removed.
        </p>
        <a
          href="/products"
          className="mt-6 inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
        >
          Browse Products
        </a>
      </main>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <ProductImage product={product} size="lg" className="w-full" />

        {/* Product Details */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            {product.category}
          </span>
          <h1 className="mt-1 text-3xl md:text-4xl font-bold text-gray-900">
            {product.name}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-amber-500">&#9733;</span>
            <span className="font-medium text-gray-700">{product.rating}</span>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Features List */}
          {product.features.length > 0 && (
            <ul className="mt-6 space-y-2">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Add to Cart */}
          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-gray-100 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You might also like
          </h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </main>
  );
}
