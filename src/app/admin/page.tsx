//
// Admin
//

"use client";

import S2AdminUserTable from "../components/AdminShops/T2AdminTable";
import S1AdminCarouselCart from "../components/AdminShops/T1CauroselCart";
import S3AdminProductsPanel from "../components/AdminShops/T3ProductProducts";
import S5ShopAdminCarouselCart from "../components/AdminShops/T5ShoppingCart";
import S4AdminOrdersPanel from "../components/AdminShops/T4TableOrders";

import S13Footer from "../components/Zambian/P14FooterSmall";
import { useShopStore } from "../memory/shop";

export default function AdminPage() {
  const userId = useShopStore((state) => state.userId);
  return (
    <div className="p-4">
      <p>User ID: {userId || "Not logged in"}</p>

      {userId ? (
        <>
          <S1AdminCarouselCart userId={String(userId)} />
        </>
      ) : (
        <p>Please log in to see your cart</p>
      )}

      <S5ShopAdminCarouselCart />
      <S2AdminUserTable />
      <S3AdminProductsPanel />
      <S4AdminOrdersPanel />
      <S13Footer />
    </div>
  );
}
