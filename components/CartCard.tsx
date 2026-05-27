'use client';

import Image from "next/image";
import type { Product } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { useEditTost } from "@/context/changeContext";

type CartCardProps = {
  item: Product;
  quantity: number;
  
};

const CartCard = ({ item, quantity }: CartCardProps) => {

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const originalPrice = item.price * (1 + item.discountPercentage / 100);

  const{setProduct,setqtyD, openShow }= useEditTost()
  const handleEdit = ()=>{
    console.log('ee')
    setProduct(item)
    setqtyD(quantity)
    openShow()
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(40px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
      className="bg-card border-b-2 border-b-primary border border-border rounded-xl
                 flex items-center gap-4 w-full px-4 py-3 relative "
    >
      {/* صورة المنتج */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-secondary flex items-center justify-center">
        <Image
          src={item.images[0]}
          alt={item.title}
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      {/* معلومات المنتج */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm sm:text-base font-medium truncate">{item.title}</h4>
        <p className="text-xs text-muted-foreground mb-2">{item.category}</p>

        <div className="flex items-center gap-2">
          <span className="text-base font-medium">{item.price}</span>
          <span className="text-primary text-sm font-medium">$</span>
          <span className="text-xs text-muted-foreground line-through">
            {originalPrice.toFixed(0)}$
          </span>
          <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
            -{item.discountPercentage.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* الكمية وزر التعديل */}
      <div className="flex flex-col items-end gap-3 flex-shrink-0">
        <div className="flex items-center gap-1.5 bg-secondary border border-border rounded-lg px-2.5 py-1">
          <span className="text-xs text-muted-foreground">qty</span>
          <span className="text-sm font-medium">{quantity}</span>
        </div>

        <button
           onClick={handleEdit}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg
                     border border-border hover:bg-secondary transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          edit
        </button>
      </div>
    </div>
  );
};

export default CartCard;