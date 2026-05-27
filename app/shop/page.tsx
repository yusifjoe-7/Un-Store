"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/types";
import Card from "@/components/ui/Card";
import CardSkeleton from "@/components/ui/CardSkeleton";
import { useCheckIfLogIn } from "@/hooks/login";

type Category = {
  slug: string;
  name: string;
  url: string;
};
const EXCLUDED_CATEGORIES = [
  "furniture", "groceries", "kitchen-accessories", "laptops",
  "motorcycle", "smartphones", "tablets", "vehicle"
];

export default function ShopPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useCheckIfLogIn()

  useEffect(() => {
  fetch("https://dummyjson.com/products/categories")
    .then((r) => r.json())
    .then((data) => {
      const filtered = data.filter(
        (cat: Category) => !EXCLUDED_CATEGORIES.includes(cat.slug)
      );
      setCategories(filtered);
      setLoadingCats(false);
    });
}, []);

  useEffect(() => {
    if (!selected) return;
    setLoadingProducts(true);
    fetch(`https://dummyjson.com/products/category/${selected}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products ?? []);
        setLoadingProducts(false);
      });
  }, [selected]);

  return (
    <div className="flex flex-col gap-6 p-6 sm:mt-16 w-full mb-16">
      {/* Categories Row */}
      <div className="w-full py-5 rounded-md px-2 border-t-2 border-b-2 bg-muted border-muted-foreground">
        {loadingCats ? (
        <div className="flex gap-2 flex-wrap pb-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-24 shrink-0 animate-pulse rounded-full bg-muted"
            />
          ))}
        </div>
      ) : (
        <div className="flex gap-2 flex-wrap pb-1">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setSelected(cat.slug);
                setSelectedName(cat.name);
              }}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors
                ${
                  selected === cat.slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
      </div>

      {/* Products Grid */}
      {!selected && (
        <div className="flex h-60 items-center justify-center text-sm text-muted-foreground">
         choose category
          </div>
      )}

      {selected && (
        <>
          <div className="flex items-center justify-between sm:mt-2 px-10">
            <h2 className="text-base font-medium capitalize">{selectedName}</h2>
            {!loadingProducts && (
              <span className="text-xs text-muted-foreground">
                {products.length} items
              </span>
            )}
          </div>

          {loadingProducts ? (
            <div className=" justify-center w-full flex flex-wrap gap-10 ">
              {Array.from({ length: 8 }).map((_, i) => (
               <CardSkeleton key={i}/>
              ))}
            </div>
          ) : (
            <div className="justify-center w-full flex flex-wrap gap-10 ">
              {products.map((p) => (
                <Card item={p} key={p.id}/>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}