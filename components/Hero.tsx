'use client';

import { useCheckIfLogIn } from "@/hooks/login";

import Image from 'next/image'
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { 
  ElectronicsIcon, 
  JewelryIcon,
  MensClothingIcon,
  WomensClothingIcon
 } from "./ui/icons";

export default function Hero() {


        useCheckIfLogIn()
   

    const mouse = useMouseParallax();
  const move = (depth: number) => ({
    transform: `translate(${-mouse.x * depth}px, ${-mouse.y * depth}px)`,
    transition: "transform 0.1s ease-out",
  });





  return (
    <section className='flex md:flex-row flex-col items-center md:justify-between md:px-24 h-screen relative hilight-r w-full mt-15 px-5 md:mt-0 gap-10'>
        <div className="relative flex flex-col items-center md:gap-0 gap-5 ">
            <h1 className='logoFont md:text-9xl text-muted-foreground z-3 text-7xl animate-fade-up-4'>
            THIS IS NOT <br /> A REAL STORE
        </h1>
        <p className='text-muted-foreground un'>so i will try to give you a real experience as i can but sure i can't do all the details </p>
        </div>
       <div className="flex flex-col items-center">
         <div style={move(70)} className='animate-fade-up-1 '>
            <Image src={'https://res.cloudinary.com/dfcytmt3r/image/upload/q_auto/f_auto/v1779098118/vecteezy_blue-trendy-denim-jacket-on-transparent-background_51494933_h2pwds.png'}
        alt="jacket"
        width={400}
        height={400}
        className='md:max-w-xl max-w-xs'
        />
       
         </div>
         <div className="flex items-center justify-between md:w-100 w-60">
        <div style={move(35)} className='animate-fade-up-2'>
            <Image
        src={'https://res.cloudinary.com/dfcytmt3r/image/upload/q_auto/f_auto/v1779097793/vecteezy_smart-watches-for-kid_45547257_typrcn.png'}
        alt='smart watch'
        width={80}
        height={80}
    
        />
        
        
        </div>
        <div style={move(50)} className='animate-fade-up-2'>
            <Image
    src={'https://res.cloudinary.com/dfcytmt3r/image/upload/q_auto/f_auto/v1779105953/vecteezy_sleek-white-wireless-headphones-premium-audio-bluetooth_55130517_ukri2x.png'}
alt='headphone'
        width={120}
        height={120}
        />
       
        </div>

       </div>
        
       </div>
    <div className="md:absolute md:bottom-14 md:left-14 flex items-center ">
 <div className=" item-wrap">
   <div className=" h-10 rounded-sm  flex items-center justify-center gap-4 card card-1 ">
    <ElectronicsIcon width={16} height={16} />
        
  </div>
  <div className="ground-shadow shadow-2"></div>
 </div>
  <div className=" item-wrap">
   <div className=" h-10 rounded-sm  flex items-center justify-center gap-4 card card-2 ">
    <JewelryIcon width={16} height={16} />
        
  </div>
  <div className="ground-shadow shadow-2"></div>
 </div>
 <div className=" item-wrap">
   <div className=" h-10 rounded-sm  flex items-center justify-center gap-4 card card-3 ">
    <MensClothingIcon width={16} height={16} />
        
  </div>
  <div className="ground-shadow shadow-3"></div>
 </div>
  <div className=" item-wrap">
   <div className=" h-10 rounded-sm  flex items-center justify-center gap-4 card card-4 ">
    <WomensClothingIcon width={16} height={16} />
        
  </div>
  <div className="ground-shadow shadow-4"></div>
 </div>
</div>
    </section>
  )
}
