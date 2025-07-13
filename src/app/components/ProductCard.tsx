// File: src/components/ProductCard.tsx
"use client";

import { Product } from "@/types/models";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };
  return (
    <div onClick={handleClick} className="border rounded shadow-md p-4 cursor-pointer hover:shadow-lg transition">
      <Image src={product.image_url} alt={product.name} width={200} height={200} className="mb-2" />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-gray-600">{product.image_url}</p>
      <p className="text-blue-700 font-bold mt-2">ZMW {product.price}</p>
    </div>
  );
}
