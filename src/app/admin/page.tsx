// import AdminUserTable from "@/components/AdminUserTable";

"use client";

import AdminUserTable from "../components/AdminTables/AdminTable";
import AdminCarouselCart from "../components/AdminTables/CauroselCart";
import AdminProductsPanel from "../components/AdminTables/ProductProducts";
import AdminOrdersPanel from "../components/AdminTables/TableOrders";
import CarouselCart from "../components/CarouselCart";
import S13Footer from "../components/LandingPages/P14FooterSmall";
import { useShopStore } from "../memory/shop";

export default function AdminPage() {
  const userId = useShopStore((state) => state.userId);
  return (
    <div className="p-4">
      <p>User ID: {userId || "Not logged in"}</p>

      {userId ? (
        <>
          <CarouselCart userId={String(userId)} />
          <AdminCarouselCart userId={String(userId)} />
        </>
      ) : (
        <p>Please log in to see your cart</p>
      )}

      <AdminUserTable />
      <AdminOrdersPanel />
      <AdminProductsPanel />
      <S13Footer />
    </div>
  );
}
