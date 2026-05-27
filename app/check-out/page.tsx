"use client";

import { useEffect, useState } from "react";
import { Product, userType, cart } from "@/types/types";
import { useOrderToast } from "@/context/comingToastContext";
import { useRouter } from "next/navigation";
import { editCart } from "@/hooks/cart";
import { GetCart } from "@/hooks/cart";

// ─── Local Types ──────────────────────────────────────────────────────────────

type CartItem = { id: string; quantity: number };
type EnrichedItem = { product: Product; quantity: number };


// ─── Mock GetCart (replace with your real import) ─────────────────────────────


// ─── Sub-components ───────────────────────────────────────────────────────────

function QuantityControl({
  quantity,
  stock,
  onIncrease,
  onDecrease,
}: {
  quantity: number;
  stock: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--accent)] hover:border-[var(--primary)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-sm font-semibold"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-bold text-[var(--foreground)] tabular-nums">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={quantity >= stock}
        className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--accent)] hover:border-[var(--primary)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-sm font-semibold"
      >
        +
      </button>
    </div>
  );
}

function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: EnrichedItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) {
  const { product, quantity } = item;
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  const lineTotal = discountedPrice * quantity;

  return (
    <div className="group flex gap-4 p-4 bg-[var(--card)] rounded-[var(--radius-lg)] border border-[var(--border)] hover:border-[var(--ring)] hover:shadow-md transition-all duration-300">
      {/* Image */}
      <div className="relative flex-shrink-0 w-24 h-24 rounded-[var(--radius-md)] overflow-hidden bg-[var(--muted)]">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute top-1 left-1 bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-bold px-1.5 py-0.5 rounded-[var(--radius-sm)]">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-widest font-medium truncate">
              {product.brand}
            </p>
            <h3 className="text-sm font-semibold text-[var(--foreground)] leading-tight line-clamp-2 mt-0.5">
              {product.title}
            </h3>
          </div>
          {/* Remove */}
          <button
            onClick={onRemove}
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--destructive)] hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 opacity-0 group-hover:opacity-100"
            title="Remove item"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <QuantityControl
            quantity={quantity}
            stock={product.stock}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
          <div className="text-right">
            {product.discountPercentage > 0 && (
              <p className="text-xs text-[var(--muted-foreground)] line-through">
                ${(product.price * quantity).toFixed(2)}
              </p>
            )}
            <p className="text-sm font-bold text-[var(--primary)]">
              ${lineTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderSummary({
  items,
  onOrder,
  onContinue,
}: {
  items: EnrichedItem[];
  onOrder: () => void;
  onContinue: () => void;
}) {
  const subtotal = items.reduce((sum, { product, quantity }) => {
    const price = product.price * (1 - product.discountPercentage / 100);
    return sum + price * quantity;
  }, 0);

  const originalTotal = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  const savings = originalTotal - subtotal;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const itemCount = items.reduce((sum, { quantity }) => sum + quantity, 0);

  return (
    <div className="flex flex-col gap-5 bg-[var(--card)] rounded-[var(--radius-xl)] border border-[var(--border)] p-6 h-fit">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[var(--border)] pb-4">
        <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <div>
          <h2 className="text-sm font-bold text-[var(--foreground)]">Order Summary</h2>
          <p className="text-xs text-[var(--muted-foreground)]">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Line items */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--muted-foreground)]">Subtotal</span>
          <span className="font-medium text-[var(--foreground)]">${subtotal.toFixed(2)}</span>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Savings
            </span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">-${savings.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-[var(--muted-foreground)]">Shipping</span>
          <span className={`font-medium ${shipping === 0 ? "text-emerald-600 dark:text-emerald-400" : "text-[var(--foreground)]"}`}>
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-[var(--muted-foreground)]">Tax (8%)</span>
          <span className="font-medium text-[var(--foreground)]">${tax.toFixed(2)}</span>
        </div>

        {subtotal < 50 && (
          <div className="text-xs text-[var(--muted-foreground)] bg-[var(--muted)] rounded-[var(--radius-sm)] px-3 py-2">
            Add <span className="font-semibold text-[var(--primary)]">${(50 - subtotal).toFixed(2)}</span> more for free shipping
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
        <span className="text-base font-bold text-[var(--foreground)]">Total</span>
        <span className="text-xl font-black text-[var(--primary)]">${total.toFixed(2)}</span>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 mt-1">
        <button
          onClick={onOrder}
          className="w-full cursor-pointer py-3.5 px-6 bg-[var(--primary)] hover:opacity-90 active:scale-[0.98] text-[var(--primary-foreground)] font-bold text-sm rounded-[var(--radius-md)] transition-all duration-200 shadow-lg shadow-[var(--primary)]/20 flex items-center justify-center gap-2"
          
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Order Now
        </button>

        <button
          onClick={onContinue}
          className="w-full cursor-pointer py-3 px-6 bg-transparent border border-[var(--border)] hover:bg-[var(--accent)] hover:border-[var(--primary)] text-[var(--foreground)] font-semibold text-sm rounded-[var(--radius-md)] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Continue Shopping
        </button>
      </div>

      {/* Trust badges */}
      <div className="flex justify-center gap-4 pt-2 border-t border-[var(--border)]">
        {[
          { icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            , label: "Secure" },
          { icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>,
             label: "Easy Returns" },
          { icon: <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85357 3.85355L7.65355 3.05353C8.2981 2.40901 9.42858 1.96172 10.552 1.80125C11.1056 1.72217 11.6291 1.71725 12.0564 1.78124C12.4987 1.84748 12.7698 1.97696 12.8965 2.10357C13.0231 2.23018 13.1526 2.50125 13.2188 2.94357C13.2828 3.37086 13.2779 3.89439 13.1988 4.44801C13.0383 5.57139 12.591 6.70188 11.9464 7.34645L7.49999 11.7929L6.35354 10.6465C6.15827 10.4512 5.84169 10.4512 5.64643 10.6465C5.45117 10.8417 5.45117 11.1583 5.64643 11.3536L7.14644 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L8.40073 12.3064L9.57124 14.2572C9.65046 14.3893 9.78608 14.4774 9.9389 14.4963C10.0917 14.5151 10.2447 14.4624 10.3535 14.3536L12.3535 12.3536C12.4648 12.2423 12.5172 12.0851 12.495 11.9293L12.0303 8.67679L12.6536 8.05355C13.509 7.19808 14.0117 5.82855 14.1887 4.58943C14.2784 3.9618 14.2891 3.33847 14.2078 2.79546C14.1287 2.26748 13.9519 1.74482 13.6035 1.39645C13.2552 1.04809 12.7325 0.871332 12.2045 0.792264C11.6615 0.710945 11.0382 0.721644 10.4105 0.8113C9.17143 0.988306 7.80189 1.491 6.94644 2.34642L6.32322 2.96968L3.07071 2.50504C2.91492 2.48278 2.75773 2.53517 2.64645 2.64646L0.646451 4.64645C0.537579 4.75533 0.484938 4.90829 0.50375 5.0611C0.522563 5.21391 0.61073 5.34954 0.742757 5.42876L2.69364 6.59928L2.14646 7.14645C2.0527 7.24022 2.00002 7.3674 2.00002 7.50001C2.00002 7.63261 2.0527 7.75979 2.14646 7.85356L3.64647 9.35356C3.84173 9.54883 4.15831 9.54883 4.35357 9.35356C4.54884 9.1583 4.54884 8.84172 4.35357 8.64646L3.20712 7.50001L3.85357 6.85356L6.85357 3.85355ZM10.0993 13.1936L9.12959 11.5775L11.1464 9.56067L11.4697 11.8232L10.0993 13.1936ZM3.42251 5.87041L5.43935 3.85356L3.17678 3.53034L1.80638 4.90074L3.42251 5.87041ZM2.35356 10.3535C2.54882 10.1583 2.54882 9.8417 2.35356 9.64644C2.1583 9.45118 1.84171 9.45118 1.64645 9.64644L0.646451 10.6464C0.451188 10.8417 0.451188 11.1583 0.646451 11.3535C0.841713 11.5488 1.1583 11.5488 1.35356 11.3535L2.35356 10.3535ZM3.85358 11.8536C4.04884 11.6583 4.04885 11.3417 3.85359 11.1465C3.65833 10.9512 3.34175 10.9512 3.14648 11.1465L1.14645 13.1464C0.95119 13.3417 0.951187 13.6583 1.14645 13.8535C1.34171 14.0488 1.65829 14.0488 1.85355 13.8536L3.85358 11.8536ZM5.35356 13.3535C5.54882 13.1583 5.54882 12.8417 5.35356 12.6464C5.1583 12.4512 4.84171 12.4512 4.64645 12.6464L3.64645 13.6464C3.45119 13.8417 3.45119 14.1583 3.64645 14.3535C3.84171 14.5488 4.1583 14.5488 4.35356 14.3535L5.35356 13.3535ZM9.49997 6.74881C10.1897 6.74881 10.7488 6.1897 10.7488 5.5C10.7488 4.8103 10.1897 4.25118 9.49997 4.25118C8.81026 4.25118 8.25115 4.8103 8.25115 5.5C8.25115 6.1897 8.81026 6.74881 9.49997 6.74881Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>,
             label: "Fast Delivery" },
        ].map(({ icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-0.5 mt-5">
            <span className="text-base">{icon}</span>
            <span className="text-[10px] text-[var(--muted-foreground)] font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="flex gap-4 p-4 bg-[var(--card)] rounded-[var(--radius-lg)] border border-[var(--border)] animate-pulse">
      <div className="w-24 h-24 rounded-[var(--radius-md)] bg-[var(--muted)] flex-shrink-0" />
      <div className="flex-1 flex flex-col gap-3 justify-between">
        <div className="space-y-2">
          <div className="h-3 bg-[var(--muted)] rounded w-16" />
          <div className="h-4 bg-[var(--muted)] rounded w-3/4" />
          <div className="h-3 bg-[var(--muted)] rounded w-1/2" />
        </div>
        <div className="flex justify-between">
          <div className="h-8 bg-[var(--muted)] rounded-full w-28" />
          <div className="h-5 bg-[var(--muted)] rounded w-16" />
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyCart({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
      <div className="w-24 h-24 rounded-full bg-[var(--accent)] flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-foreground)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6" />
        </svg>
      </div>
      <div>
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Your cart is empty</h2>
        <p className="text-sm text-[var(--muted-foreground)]">Looks like you haven't added anything yet.</p>
      </div>
      <button
        onClick={onContinue}
        className="py-3 px-8 bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold text-sm rounded-[var(--radius-md)] hover:opacity-90 transition-all duration-200"
      >
        Start Shopping
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const [items, setItems] = useState<EnrichedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState('')
  const [cart, setCart] = useState<cart>()

  useEffect(() => {
    async function loadCart() {
      try {
        const user: userType = JSON.parse(localStorage.getItem("login") || "{}");
        setUserId(user.id)
        
        if (!user?.id) {
          setLoading(false);
          setError(true);
          return;
        }

        const cart:cart = (await GetCart(user.id))!;
        setCart(cart)

        if (!cart || !cart.items || cart.items.length === 0) {
          setLoading(false);
          return;
        }

        const enriched: EnrichedItem[] = await Promise.all(
          cart.items.map(async (item: CartItem) => {
            const res = await fetch(`https://dummyjson.com/products/${item.id}`);
            const product: Product = await res.json();
            return { product, quantity: item.quantity };
          })
        );

        setItems(enriched);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadCart();
  }, []);

  const handleIncrease = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity < item.product.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const {showToast}=useOrderToast()
  const router = useRouter()

  const handleOrder = () => {
    showToast()
    router.push('/')
    if(!cart) return
    const newCart:cart = {...cart!, items:[]}
    editCart(newCart.id, newCart)

  };

  const handleContinue = () => {
    window.history.back();
  };

  // ── Error State ──
  if (error) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-[var(--destructive)] font-semibold mb-2">Something went wrong</p>
          <p className="text-sm text-[var(--muted-foreground)]">Please try again later or log in again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ── Header ── */}
      <header className="sticky top-0 z-30 bg-[var(--card)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6" />
            </svg>
          </div>
          <h1 className="text-base font-bold text-[var(--foreground)]">
            Checkout
            {!loading && items.length > 0 && (
              <span className="ml-2 text-xs font-normal text-[var(--muted-foreground)]">
                ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
            )}
          </h1>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 mb-16 lg:mb-0">

        {/* MOBILE: single column */}
        <div className="flex flex-col gap-6 lg:hidden">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : items.length === 0 ? (
            <EmptyCart onContinue={handleContinue} />
          ) : (
            <>
              {/* Items list */}
              <section className="flex flex-col gap-3">
                {items.map((item, index) => (
                  <CartItemCard
                    key={item.product.id}
                    item={item}
                    onIncrease={() => handleIncrease(index)}
                    onDecrease={() => handleDecrease(index)}
                    onRemove={() => handleRemove(index)}
                  />
                ))}
              </section>

              {/* Summary — normal flow on mobile */}
              <OrderSummary
                items={items}
                onOrder={handleOrder}
                onContinue={handleContinue}
              />
            </>
          )}
        </div>

        {/* DESKTOP: two columns */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_400px] lg:gap-10">

          {/* Left — payment placeholder */}
          <div className="flex items-center justify-center text-[var(--muted-foreground)] text-sm italic select-none">
            imagine that you putting your card info here
          </div>

          {/* Right — cart + summary */}
          <div className="flex flex-col gap-6">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : items.length === 0 ? (
              <EmptyCart onContinue={handleContinue} />
            ) : (
              <>
                {/* Items */}
                <section className="flex flex-col gap-3">
                  <h2 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-widest mb-1">
                    Cart Items
                  </h2>
                  {items.map((item, index) => (
                    <CartItemCard
                      key={item.product.id}
                      item={item}
                      onIncrease={() => handleIncrease(index)}
                      onDecrease={() => handleDecrease(index)}
                      onRemove={() => handleRemove(index)}
                    />
                  ))}
                </section>

                {/* Summary — sticky on desktop */}
                <div className="sticky top-24">
                  <OrderSummary
                    items={items}
                    onOrder={handleOrder}
                    onContinue={handleContinue}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}