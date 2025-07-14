// components/account/CartList.tsx

import { CartItem } from "@/types/models.eshop";
import Image from "next/image";

type CartListProps = {
  items: CartItem[];
  loading: boolean;
};

export function CartList({ items, loading }: CartListProps) {
  console.log(items);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">🛒 Your Cart</h2>
      {loading ? (
        <p className="text-sm text-gray-500">Loading cart...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="border p-3 rounded bg-gray-50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                {item.product.image_url && (
                  <div className="w-12 h-12 relative">
                    <Image
                      src={item.product.image_url}
                      alt={item.product.name || "Product image"}
                      fill
                      className="object-cover rounded"
                      sizes="48px" // matches your w-12 (12 * 4 = 48px)
                    />
                  </div>
                )}
                <span>{item.product.name}</span>
              </div>
              <span className="text-sm text-gray-600">
                Qty: {item.quantity} • ZMW {(item.product.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
