"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  created_at: string;
};

export default function F3AdminProductsPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("price", { ascending: false });

    console.log(data);
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data as Product[]);
    }
    setLoading(false);
  };

  const deleteProduct = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
    } else {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    // <div className="max-w-6xl mx-auto p-6">
    <div className="overflow-x-auto">
      {/* </div> */}
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">📦 3. Admin Product Management</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition overflow-hidden flex flex-col">
              {product.image_url ? (
                <div className="relative w-full h-48">
                  <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center bg-gray-100 text-gray-400">No Image</div>
              )}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 flex-1">{product.description}</p>
                <p className="text-blue-600 font-bold mt-2">${product.price.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-1">Added: {new Date(product.created_at).toLocaleDateString()}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setEditingProduct(product)} className="flex-1 py-1 px-3 rounded bg-yellow-400 hover:bg-yellow-500 text-sm text-white font-medium">
                    Edit
                  </button>
                  <button onClick={() => deleteProduct(product.id)} className="flex-1 py-1 px-3 rounded bg-red-500 hover:bg-red-600 text-sm text-white font-medium">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Simple inline modal for editing (replace with actual modal for production use) */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Product</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const updated = {
                  name: formData.get("name") as string,
                  description: formData.get("description") as string,
                  price: Number(formData.get("price")),
                };

                const { error } = await supabase.from("products").update(updated).eq("id", editingProduct.id);

                if (error) {
                  console.error("Update failed:", error);
                } else {
                  await fetchProducts();
                  setEditingProduct(null);
                }
              }}
              className="space-y-4"
            >
              <input name="name" defaultValue={editingProduct.name} required className="w-full px-4 py-2 border rounded-md" placeholder="Product Name" />
              <textarea name="description" defaultValue={editingProduct.description ?? ""} className="w-full px-4 py-2 border rounded-md" placeholder="Description" />
              <input
                name="price"
                type="number"
                defaultValue={editingProduct.price}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Price"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setEditingProduct(null)} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
