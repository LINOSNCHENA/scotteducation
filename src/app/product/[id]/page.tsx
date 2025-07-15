"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetail from "@/app/components/Ntemba/LandingPages/ProductDetails";
import { supabase } from "@/lib/supabase";
import { IProduct } from "@/types/models.eshop";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);

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
