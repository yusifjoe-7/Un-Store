'use client';

import { useCheckIfLogIn } from "@/hooks/login";
import Image from 'next/image'
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { useState, useEffect } from "react";

export default function Hero() {

  useCheckIfLogIn()

//git screen width to make mouse animation only in pc or laptop
const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);


// mouse tracking animation

        
   

    const mouse = useMouseParallax();
  const move = (depth: number) => isDesktop?{
    transform: `translate(${-mouse.x * depth}px, ${-mouse.y * depth}px)`,
    transition: "transform 0.1s ease-out",
  }:undefined;







  return (
    <section className='flex md:flex-row flex-col items-center md:justify-between md:px-24 h-screen relative hilight-r w-full mt-15 2xl:px-30 px-5 md:mt-0 gap-10'>
        <div className="relative flex flex-col items-center md:gap-0 gap-5 ">
            <h1 className='logoFont md:text-9xl 2xl:text-[10rem] text-muted-foreground z-3 text-7xl animate-fade-up-4'>
            THIS IS NOT <br /> A REAL STORE
        </h1>
        <p className='text-muted-foreground un'>so i will try to give you a real experience as i can but sure i can't do all the details </p>
        </div>
       <div className="flex flex-col   items-center">
         <div style={move(100)} className='animate-[slideUp_0.8s_ease_forwards] md:animate-none'>
            <Image src={'https://res.cloudinary.com/dfcytmt3r/image/upload/q_auto/f_auto/v1779098118/vecteezy_blue-trendy-denim-jacket-on-transparent-background_51494933_h2pwds.png'}
        alt="jacket"
        width={500}
        height={500}
        className='2xl:max-w-150 2xl:max-h-150 max-w-100 max-h-100'
        />
       
         </div>
         <div className="flex items-center justify-between md:w-100 w-60">
        <div style={move(50)} className='animate-[slideUp_0.4s_ease_forwards] md:animate-none'>
            <Image
        src={'https://res.cloudinary.com/dfcytmt3r/image/upload/q_auto/f_auto/v1779258886/vecteezy_smart-watches-with-your-smartphone_45547265_yawwvk.png'}
        alt='smart watch'
        width={100}
        height={100}
        className='2xl:max-w-25 2xl:max-h-25 max-w-19 max-h-19'
        />
        
        
        </div>
        <div style={move(70)} className='animate-[slideUp_1s_ease_forwards] md:animate-none'>
            <Image
    src={'https://res.cloudinary.com/dfcytmt3r/image/upload/q_auto/f_auto/v1779105953/vecteezy_sleek-white-wireless-headphones-premium-audio-bluetooth_55130517_ukri2x.png'}
alt='headphone'
        width={150}
        height={150}
        className='2xl:max-w-38 2xl:max-h-38 max-w-28 max-h-28'
        />
       
        </div>

       </div>
        
       </div>
    <div className="md:absolute md:bottom-14 md:left-14 flex items-center ">

      {/* hoodie */}

 <div className=" item-wrap">
   <div className=" h-10 rounded-sm  flex items-center justify-center gap-4 card card-1 ">
    <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M237.31,120.53,183,39.12A16,16,0,0,0,169.73,32H86.27A16,16,0,0,0,73,39.12L18.69,120.53a16,16,0,0,0-2.13,13.09L38,212.21A16,16,0,0,0,53.43,224H80a16,16,0,0,0,16-16V192h64v16a16,16,0,0,0,16,16h26.57A16,16,0,0,0,218,212.21l21.44-78.59A16,16,0,0,0,237.31,120.53ZM80,176V69l24,14.15V136a8,8,0,0,0,16,0V92.57l3.94,2.32a8,8,0,0,0,8.12,0L136,92.57V128a8,8,0,0,0,16,0V83.14L176,69V176ZM169.73,48l2.92,4.39L128,78.71,83.35,52.39,86.27,48ZM80,208H53.43L32,129.41l32-48V176a16,16,0,0,0,16,16Zm122.57,0H176V192a16,16,0,0,0,16-16V81.41l32,48Z"></path></svg>
        
  </div>
  <div className="ground-shadow shadow-2"></div>
 </div>

 {/* dimond */}

  <div className=" item-wrap">
   <div className=" h-10 rounded-sm  flex items-center justify-center gap-4 card card-2 ">
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gem-icon lucide-gem"><path d="M10.5 3 8 9l4 13 4-13-2.5-6"/><path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z"/><path d="M2 9h20"/></svg>
         
  </div>
  <div className="ground-shadow shadow-2"></div>
 </div>

{/* snekers */}

 <div className=" item-wrap">
   <div className=" h-10 rounded-sm  flex items-center justify-center gap-4 card card-3 ">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sport-shoe-icon lucide-sport-shoe"><path d="m15 10.42 4.8-5.07"/><path d="M19 18h3"/><path d="M9.5 22 21.414 9.415A2 2 0 0 0 21.2 6.4l-5.61-4.208A1 1 0 0 0 14 3v2a2 2 0 0 1-1.394 1.906L8.677 8.053A1 1 0 0 0 8 9c-.155 6.393-2.082 9-4 9a2 2 0 0 0 0 4h14"/></svg>
    
        
  </div>
  <div className="ground-shadow shadow-3"></div>
 </div>

 {/* fragrance */}


  <div className=" item-wrap">
   <div className=" h-10 rounded-sm  flex items-center justify-center gap-4 card card-4 ">
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
  <path d="M7 5.42168V5C7 3.58579 7 2.87868 7.43934 2.43934C7.87868 2 8.58579 2 10 2C11.4142 2 12.1213 2 12.5607 2.43934C13 2.87868 13 3.58579 13 5V5.42168V7H7V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M13 7H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M7 5.00021C7.55228 5.00021 8 5.05228 8 4.5C8 3.94772 7.55228 4.00035 7 4.00035" stroke="currentColor" strokeWidth="1.5"/>
  <path d="M2.16133 16C2.05554 15.5138 2 15.0105 2 14.495C2 10.3556 5.58172 7 10 7C14.4183 7 18 10.3556 18 14.495C18 16.4098 17.2336 18.1569 15.9725 19.4817C15.5224 19.9546 15.2973 20.191 14.3538 20.5955C13.4102 21 12.7596 21 11.4584 21H8.5416C7.24039 21 6.58979 21 5.64624 20.5955C5.38106 20.4818 5.17262 20.3814 5 20.2853" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  <path d="M2.5 13C3.93501 13.5805 5.64292 14.7308 7.86069 14.9805C10.3509 15.2609 11.8549 13.5843 14 13.2947" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  <path d="M13.5 5H14.3197C15.0959 5 15.8615 5.18073 16.5557 5.52786L17.5 6" stroke="currentColor" strokeWidth="1.5"/>
  <path d="M20.5 5.24977C21.6958 5.94012 22.2174 7.27523 21.6651 8.23182C21.1128 9.1884 19.6958 9.40422 18.5 8.71387C17.3043 8.02351 16.7827 6.6884 17.335 5.73182C17.8872 4.77523 19.3043 4.55941 20.5 5.24977Z" stroke="currentColor" strokeWidth="1.5"/>
</svg>
 </div>
  <div className="ground-shadow shadow-4"></div>
 </div>
</div>
    </section>
  )
}
