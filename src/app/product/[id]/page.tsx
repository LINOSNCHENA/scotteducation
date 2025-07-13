"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetail from "@/app/components/ProductDetails";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/models";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase.from("products").select("*").eq("id", Number(id)).single();

      if (!error && data) {
        setProduct(data);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  if (!product) return <p className="p-6">Loading product...</p>;

  return <ProductDetail product={product} />;
}
