// components/account/OrderList.tsx
import Image from "next/image";
import { Order } from "@/types/models";

type OrderListProps = {
  orders: Order[];
  loading: boolean;
};

export function OrderList({ orders, loading }: OrderListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">📦 Your Orders</h2>
      {loading ? (
        <p className="text-sm text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-gray-500">You haven&apos;t placed any orders yet.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((order) => (
            <li key={order.id} className="border p-3 rounded bg-gray-50">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  {order.product.image_url && (
                    <Image
                      src={order.product.image_url}
                      alt={order.product.name}
                      width={48}
                      height={48}
                      className="object-cover rounded"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  )}
                  <div>
                    <p className="font-medium">{order.product.name}</p>
                    <p className="text-xs text-gray-500">Qty: {order.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-700 font-semibold">ZMW {order.total.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                  <span className={`text-xs ${order.status === "completed" ? "text-green-600" : order.status === "pending" ? "text-yellow-600" : "text-red-600"}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
