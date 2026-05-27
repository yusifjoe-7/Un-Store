"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { cart, Product, userType, item } from "@/types/types";
import Barcode from 'react-barcode'
import ProductDetailsSkeleton from "@/components/DetailsSkeleton";
import { editCart, GetCart } from "@/hooks/cart";
import { useDoneToast } from "@/context/DoneToastContext";
import { useCheckIfLogIn } from "@/hooks/login";

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const starSize = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${starSize} ${star <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30 fill-muted-foreground/30"}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function RatingBar({ star, count, max }: { star: number; count: number; max: number }) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="w-2">{star}</span>
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-3 text-right">{count}</span>
    </div>
  );
}

type Tab = "specs" | "reviews" | "details";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("specs");
  const [wishlist, setWishlist] = useState(false);
 const[loadingC, setLoadingC]=useState(false)
 
  const { showToast } = useDoneToast()

  useCheckIfLogIn()


const handleAdd = async () => {
  if(loadingC)return;
  setLoadingC(true);
  const user: userType = JSON.parse(localStorage.getItem("login") || "{}");
  if (!user?.id) { setLoadingC(false); return; }

  const cart: cart = (await GetCart(user.id))!;
  
  
  const filtered: item[] = (cart.items ?? []).filter(
    (item: item) => item.id === String(id)  // also ensure type match
  );

  if (filtered.length === 0) {
    // Item not in cart → add it
    const newCart: cart = {
      ...cart,
      items: [...(cart.items ?? []), { id: String(id), quantity: qty }],
    };
    await editCart(cart.id, newCart);
    showToast()
  } else {
    // Item already in cart → update quantity
    const updatedCart: cart = {
      ...cart,
      items: cart.items.map((item: item) =>
        item.id === String(id)
          ? { ...item, quantity: item.quantity + qty }
          : item
      ),
    };
    await editCart( user.id, updatedCart);
    showToast()
  }

  setLoadingC(false);
};
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data: Product) => {
        setProduct(data);
        setQty(data.minimumOrderQuantity ?? 1);
        if(data.minimumOrderQuantity > data.stock) setQty(data.stock)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <ProductDetailsSkeleton/>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">Product not found</p>
          <button
            onClick={() => router.back()}
            className="text-sm text-primary underline cursor-pointer"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const originalPrice = product.price / (1 - product.discountPercentage / 100);
  const minQty = product.minimumOrderQuantity > product.stock? product.stock ?? 1 :product.minimumOrderQuantity ?? 1;

  console.log(product)

  const ratingCounts = [0, 0, 0, 0, 0];
  product.reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) ratingCounts[r.rating - 1]++;
  });
  const maxCount = Math.max(...ratingCounts, 1);

  const specs = [
    { label: "SKU", value: product.sku },
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category },
    { label: "Weight", value: `${product.weight} kg` },
    {
      label: "Dimensions (W × H × D)",
      value: `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`,
    },
    { label: "Min. Order Qty", value: String(product.minimumOrderQuantity) },
    { label: "Stock", value: String(product.stock) },
  ];
 


 

  return (
    <div className="min-h-screen bg-background sm:mt-16 mb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">

        {/* Breadcrumb */}
        {/* <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <button onClick={() => router.push("/")} className="hover:text-foreground transition">
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => router.push(`/category/${product.category}`)}
            className="hover:text-foreground transition capitalize"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
        </nav> */}

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

          {/* ── Images ── */}
          <div>
            {/* Main image */}
            <div className="relative bg-card rounded-2xl overflow-hidden aspect-square flex items-center justify-center mb-3 border-primary border-b-2 ">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-contain p-6"
                priority
              />
              {/* Discount badge */}
              <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
                -{product.discountPercentage.toFixed(1)}%
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 flex-wrap">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative cursor-pointer
                     w-14 h-14 rounded-md border-2 overflow-hidden transition ${
                    selectedImage === i
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Image src={src} alt={`thumb-${i}`} fill className="object-contain p-1" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Info ── */}
          <div className="flex flex-col gap-4">
            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  product.availabilityStatus === "In Stock"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {product.availabilityStatus}
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">
                {product.brand}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold leading-tight">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-sm text-muted-foreground">
                {product.rating.toFixed(2)} · {product.reviews.length} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-base text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400 ml-3">
                Save ${(originalPrice - product.price).toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty((q) => Math.max(minQty, q - 1))}
                  className="w-8 h-8 
                  cursor-pointer
                  rounded-lg border border-border flex items-center justify-center hover:bg-muted transition text-lg"
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="cursor-pointer w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition text-lg"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-muted-foreground">
                {product.stock} in stock
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="cursor-pointer flex-1 bg-primary text-primary-foreground 
              flex items-center justify-center gap-2
              rounded-md py-2.5 text-sm font-medium hover:opacity-90 transition active:scale-[0.98]"
              style={{ cursor: loadingC ? "not-allowed" : "pointer" }}
              onClick={handleAdd}
              >
                {loadingC ? (
                  <>
                    <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Adding in...
                  </>
                ) : (
                  "Add To Cart"
                )}
              </button>
              <button
                onClick={() => setWishlist((w) => !w)}
                className={`w-11 h-11 rounded-xl border flex items-center justify-center transition ${
                  wishlist
                    ? "bg-destructive/10 border-destructive/30 text-destructive"
                    : "border-border hover:bg-muted"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill={wishlist ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Info chips */}
            <div className="bg-muted/50 rounded-xl p-3 flex flex-col gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" />
                </svg>
                {product.shippingInformation}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                {product.returnPolicy}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                {product.warrantyInformation}
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="border border-border rounded-2xl overflow-hidden">
          {/* Tab buttons */}
          <div className="flex border-b border-border bg-muted/30">
            {(["specs", "reviews", "details"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer flex-1 py-3 text-sm font-medium capitalize transition ${
                  activeTab === tab
                    ? "text-foreground border-b-2 border-primary bg-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "specs"
                  ? "Specifications"
                  : tab === "reviews"
                  ? `Reviews (${product.reviews.length})`
                  : "Details"}
              </button>
            ))}
          </div>

          <div className="p-5">
            {/* ── Specs Tab ── */}
            {activeTab === "specs" && (
              <div className="space-y-4">
                <div className="divide-y divide-border">
                  {specs.map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-2.5 text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                {product.tags.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Reviews Tab ── */}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                {/* Summary */}
                <div className="flex items-center gap-6 p-4 bg-muted/30 rounded-xl">
                  <div className="text-center">
                    <div className="text-4xl font-semibold">{product.rating.toFixed(1)}</div>
                    <StarRating rating={product.rating} size="lg" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {product.reviews.length} reviews
                    </p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((s) => (
                      <RatingBar key={s} star={s} count={ratingCounts[s - 1]} max={maxCount} />
                    ))}
                  </div>
                </div>

                {/* Review cards */}
                <div className="space-y-3">
                  {product.reviews.map((review, i) => {
                    const initials = review.reviewerName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();
                    return (
                      <div key={i} className="bg-muted/30 rounded-xl p-4 border border-border">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                            {initials}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{review.reviewerName}</p>
                            <div className="flex items-center gap-2">
                              <StarRating rating={review.rating} />
                              <span className="text-xs text-muted-foreground">
                                {new Date(review.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Details Tab ── */}
            {activeTab === "details" && (
              <div className="divide-y divide-border">
                {[
                  { label: "Barcode", value: product.meta.barcode },
                  { label: "SKU", value: product.sku },
                  {
                    label: "Created at",
                    value: new Date(product.meta.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    }),
                  },
                  {
                    label: "Updated at",
                    value: new Date(product.meta.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    }),
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2.5 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    {label === "Barcode"?
                    <Barcode value={value} className="font-mono text-xs w-50 "/>
                      :<span className="font-mono text-xs font-medium">{value}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}