"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Card from "./ui/Card";
import type { Product } from "@/types/types";
import { Slab } from "react-loading-indicators";

const LIMIT = 10;

const EXCLUDED_CATEGORIES = [
  "furniture", "groceries", "kitchen-accessories", "laptops",
  "motorcycle", "smartphones", "tablets", "vehicle"
];

interface InfiniteScrollProps {
  initialProducts: Product[];
  initialSkip: number;
  total: number;
}

export default function InfiniteScroll({ initialProducts, initialSkip, total }: InfiniteScrollProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [skip, setSkip] = useState(initialSkip);
  const [hasMore, setHasMore] = useState(initialSkip < total);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      let newSkip = skip;
      let accumulated: Product[] = [];

      // نكمل نجيب لحد ما نلاقي LIMIT منتج مش في الـ excluded categories
      while (accumulated.length < LIMIT && newSkip < total) {
        const res = await fetch(
          `https://dummyjson.com/products?limit=${LIMIT}&skip=${newSkip}`
        );
        const data = await res.json();

        const filtered = data.products.filter(
          (item: Product) => !EXCLUDED_CATEGORIES.includes(item.category)
        );

        accumulated = [...accumulated, ...filtered];
        newSkip += LIMIT;

        if (newSkip >= total) break;
      }

      setProducts((prev) => [...prev, ...accumulated]);
      setSkip(newSkip);
      setHasMore(newSkip < total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [skip, total, hasMore, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [loadMore, hasMore, loading]);

  return (
    <>
      <div className="justify-center w-full flex flex-wrap gap-10 mb-18">
        {products.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>

      <div ref={observerRef} className="h-10 w-full" />

      {loading && (
        <div className="w-full flex justify-center sm:-translate-y-3 -translate-y-15">
            <Slab color={"var(--color-primary)"} size="small"/>
        </div>
      )}
      {!hasMore && (
        <p className="text-center text-muted-foreground mb-10 sm:-translate-y-3 -translate-y-15">nothing more</p>
      )}
    </>
  );
}