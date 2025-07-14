// File: src/components/ProductCard.tsx
// "use client";

import { IProduct } from "@/types/models.eshop";
import { useShopStore } from "../memory/shop";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useShopStore();

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product)} className="bg-green-500 text-white px-4 py-1 rounded mt-2">
        Add to Cart
      </button>
    </div>
  );
}
