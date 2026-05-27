'use client';


import Image from "next/image";
import type { Product } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";


const Card = ({item}:{item:Product}) => {
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null)
  const[visible, setVisible] = useState(false)

  useEffect(()=>{
    const observer = new IntersectionObserver(
      ([enter])=>{
        if(enter.isIntersecting){
          setVisible(true)
          observer.disconnect()
        }
      },{threshold: 0.15}
    )
    if(ref.current) observer.observe(ref.current)
      return () => observer.disconnect()
  },[])

  


const oragenalPrice = item.price * item.discountPercentage

  return (
    <div className="bg-card border-l-2 border-l-primary rounded-xl flex flex-col items-center justify-center sm:w-60 w-40 px-5 py-3 group relative [.dark_*]:border-2 border-border transition"
    ref={ref}
    style={{
      opacity: visible? 1:0,
      transform:visible? "translateY(0px)" : "translateY(40px)"
    }}
    onClick={() => router.push(`/products/${item.id}`)}>
      <div className="absolute inset-0 top-0 bottom-0 left-0 right-0 flex items-center justify-center z-5 rounded-xl backdrop-blur-2xl cursor-pointer transition opacity-0 hover:opacity-100 "
      onClick={() => router.push(`/products/${item.id}`)}
      >
        click to see the details
      </div>
       

       <div className="w-20 md:w-auto">
        <Image src={item.images[0]} alt={'image'}
      width={100}
      height={100}
/>
       </div>


      <h4 className="my-1 flex-wrap sm:text-[1rem] text-sm">{item.title} </h4>



     <div className="flex flex-col items-center sm:mt-2 mt-1">
       <p className="text-lg">{item.price}
        <span className="text-primary">$</span>
      </p>
      <p className="text-sm text-muted-foreground line-through">
        {oragenalPrice.toFixed(0)}
        $
        </p>
     </div>

      <div className="absolute top-3 right-3 bg-destructive text-white text-xs px-2 py-1 rounded-full">
  -{item.discountPercentage.toFixed(1)}%
</div>
     
    </div>
  )
}

export default Card
