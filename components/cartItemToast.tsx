"use client";

import { useState } from "react";
import { useEditTost } from "@/context/changeContext";
import { useDoneToast } from "@/context/DoneToastContext";
import { Button } from "./ui/button";

export type CartToastData = {
  product: Product;
  quantity: number;
  cartId: string;
  userId: string;
  allItems: { id: string; quantity: number }[];
};

import type { cart, userType, Product, item } from "@/types/types";
import { GetCart, editCart } from "@/hooks/cart";




export function CartItemToast() {
 
  const{qtyD, product, closeShow, show}=useEditTost()

  const [qty, setQty] = useState(qtyD);
  const[hasChanged, setHasChanged]= useState(false)
  const[saving, setSaving]= useState(false)

  const{ showToast }=useDoneToast()
  console.log(product)

  if(!product)return

  const handleSave= async ()=>{
    if(saving)return;
      setSaving(true);
      const user: userType = JSON.parse(localStorage.getItem("login") || "{}");
      if (!user?.id) { setSaving(false); return; }
    
      const cart: cart = (await GetCart(user.id))!;
      
      
    const updatedCart: cart = {
          ...cart,
          items: cart.items.map((item: item) =>
            item.id === String(product.id)
              ? { ...item, quantity: qty }
              : item
          ),
        };
        await editCart( user.id, updatedCart);
        showToast()
        setSaving(false)
        closeShow()
  }

  const handleDelete = async () => {
  if (saving) return;

  setSaving(true);

  const user: userType = JSON.parse(localStorage.getItem("login") || "{}");

  if (!user?.id) {
    setSaving(false);
    return;
  }

  const cart: cart = (await GetCart(user.id))!;

  const updatedCart: cart = {
    ...cart,
    items: cart.items.filter(
      (item: item) => item.id !== String(product.id)
    ),
  };

  await editCart(user.id, updatedCart);

  showToast();
  setSaving(false);
  closeShow()
};

  return (<>
  <style>{styles}</style>

  <div className="fixed inset-0 z-[9999] pointer-events-none">
    <div
      className={`
        pointer-events-auto
        fixed bottom-0 left-0 right-0
        sm:left-1/2 sm:w-[420px] sm:-translate-x-1/2 sm:bottom-6
        bg-white dark:bg-zinc-900
        rounded-t-[28px] sm:rounded-[28px]
        border border-zinc-200 dark:border-zinc-800
        shadow-2xl
        px-5 pt-4 pb-5
        flex flex-col gap-4
        transition-all duration-500 ease-out
        ${
          show
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }
      `}
    >
      {/* Handle */}
      <div className="w-10 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 mx-auto" />

      {/* Product */}
      <div className="cart-toast-product flex gap-4 mt-1 items-center">
        {/* Image */}
        <div className="cart-toast-img-wrap">
          <img
            src={product.images[0]}
            alt={product.title}
            className="cart-toast-img"
          />


          {product.discountPercentage > 0 && (
            <span className="cart-toast-badge">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>

        {/* Info */}
        <div className="cart-toast-info">
          <p className="cart-toast-brand">
            {product.brand}
          </p>

          <p className="cart-toast-title">
            {product.title}
          </p>

          <div className="cart-toast-prices">
            {product.discountPercentage > 0 && (
              <span className="cart-toast-original">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            )}

            <span className="cart-toast-price">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
        <span aria-label="delete item" className="cursor-pointer text-destructive"
        onClick={handleDelete}
        > 
          <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          </span>
           
      </div>

      {/* Divider */}
      <div className="cart-toast-divider" />

      {/* Actions */}
      <div className="flex items-center justify-between">
        {/* Quantity */}
        <div className="flex flex-col gap-2">
          <span className="cart-toast-qty-label">
            Quantity
          </span>

          <div className="cart-toast-qty">
            <button
              className="cart-toast-qty-btn"
              onClick={() => {
                setQty((prev) =>
                  Math.max(1, prev - 1)
                );
                setHasChanged(true);
              }}
              disabled={qty <= 1}
            >
              −
            </button>

            <span className="cart-toast-qty-num">
              {qty}
            </span>

            <button
              className="cart-toast-qty-btn"
              onClick={() => {
                setQty((prev) =>
                  Math.min(product.stock, prev + 1)
                );
                setHasChanged(true);
              }}
              disabled={qty >= product.stock}
            >
              +
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="flex flex-col gap-1 items-end">
          <span className="cart-toast-qty-label">
            Total
          </span>

          <span className="cart-toast-total">
            ${(product.price * qty).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Save button */}
      <div
        className={`
          overflow-hidden transition-all duration-300
          ${
            hasChanged
              ? "max-h-[80px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <button
          className="
            w-full rounded-xl
            bg-primary
            px-4 py-3
            text-sm font-bold
            text-primary-foreground
            flex items-center justify-center gap-2
            transition-all duration-200
            shadow-lg
            hover:opacity-90
            disabled:opacity-60
            disabled:cursor-not-allowed
            cursor-pointer
          "
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <span className="cart-toast-spinner" />
          ) : (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}

          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>

      {/* Cancel */}
      <button
        className="
          w-full rounded-xl
          border border-border
          bg-background
          px-4 py-3
          text-sm font-semibold
          text-foreground
          transition-all duration-200
          hover:bg-muted
          cursor-pointer
        "
        onClick={closeShow}
      >
        Cancel
      </button>
    </div>
  </div>
</>);
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = `
.cart-toast-img-wrap {
  position: relative;
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 16px;
  overflow: hidden;
  background: var(--muted);
}

.cart-toast-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-toast-badge {
  position: absolute;
  top: 6px;
  left: 6px;
  background: var(--destructive);
  color: var(--primary-foreground);
  font-size: 10px;
  font-weight: 700;
  padding: 3px 6px;
  border-radius: 999px;
}

.cart-toast-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cart-toast-brand {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--muted-foreground);
  letter-spacing: .08em;
  margin: 0;
}

.cart-toast-title {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--foreground);
  margin: 0;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cart-toast-prices {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.cart-toast-original {
  font-size: 12px;
  color: var(--muted-foreground);
  text-decoration: line-through;
}

.cart-toast-price {
  font-size: 15px;
  font-weight: 800;
  color: var(--primary);
}

.cart-toast-divider {
  height: 1px;
  background: var(--border);
}

.cart-toast-qty-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--muted-foreground);
}

.cart-toast-qty {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--muted);
  border-radius: 999px;
  padding: 4px;
}

.cart-toast-qty-btn {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: none;
  background: transparent;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: .2s;
}

.cart-toast-qty-btn:hover:not(:disabled) {
  background: var(--background);
}

.cart-toast-qty-btn:disabled {
  opacity: .4;
  cursor: not-allowed;
}

.cart-toast-qty-num {
  min-width: 28px;
  text-align: center;
  font-weight: 700;
}

.cart-toast-total {
  font-size: 22px;
  font-weight: 800;
  color: var(--primary);
}

.cart-toast-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: white;
  border-radius: 999px;
  animation: spin .7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
`;