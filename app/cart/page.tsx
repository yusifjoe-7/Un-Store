
// app/cart/page.tsx
'use client';

import { useEffect, useState } from "react";
import CartCard from "@/components/CartCard";
import type { Product, userType } from "@/types/types";
import { GetCart } from "@/hooks/cart";
import { Button } from "@/components/ui/button";

type CartItem = {
  id: string;
  quantity: number;
};

type EnrichedItem = {
  product: Product;
  quantity: number;
};

export default function CartPage() {
  const [items, setItems] = useState<EnrichedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadCart() {
      try {
        const user: userType = JSON.parse(localStorage.getItem("login") || "{}");
        if (!user) {
          setLoading(false);
          setError(true);
          return;
        }

        // جيب الـ cart من الـ API
        const cart  = await GetCart(user.id);
         // بييجي array، خد أول نتيجة

        console.log(cart)

        if (!cart || !cart.items || cart.items.length === 0) {
          setLoading(false);
          return;
        }

        // جيب بيانات كل منتج من dummy JSON
        const enriched: EnrichedItem[] = await Promise.all(
          cart.items.map(async (item: CartItem) => {
            const res = await fetch(
              `https://dummyjson.com/products/${item.id}`
            );
            const product: Product = await res.json();
            return { product, quantity: item.quantity };
          })
        );

        setItems(enriched);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadCart();
  }, []);

  // ——— Loading ———
  if (loading) {
    return (
      <div className="flex flex-col gap-3 p-4 sm:px-30 w-full mt-16">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full h-24 rounded-xl bg-secondary animate-pulse"
          />
        ))}
      </div>
    );
  }

  // ——— Error ———
  if (error) {
    return (
      <div className="flex flex-col gap-3 p-4 sm:px-30 w-full mt-16">
        <p className="text-lg text-muted-foreground mx-auto">
            Error while loading
        </p>
      </div>
    );
  }

  // ——— فاضية ———
  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-3 p-4 sm:px-30 w-full mt-16">
        <p className="text-2xl mb-2">🛒</p>
        <p className="text-lg font-medium">emty cart</p>
        <p className="text-sm text-muted-foreground mt-1">
          add products
               </p>
      </div>
    );
  }

  // ——— المحتوى ———
  return (
   <div className="flex flex-col gap-3 p-4 sm:px-30 w-full mt-18">
      <h1 className="text-xl font-medium mb-2"> your cart </h1>

      {items.map(({ product, quantity }) => (
        <CartCard
          key={product.id}
          item={product}
          quantity={quantity}
          onEdit={(id) => {
            // هنا تفتح modal أو تروح لصفحة التعديل
            console.log("edit:", id);
          }}
        />
      ))}

      <div className="fixed flex items-center justify-center left-0 right-0 md:bottom-5 bottom-20">
        <Button className="px-20 md:px-50 py-5 rounded-md shadow-lg cursor-pointer">
        Chick out
      </Button>
      </div>
    </div>
  );
}