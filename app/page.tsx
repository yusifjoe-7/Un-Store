import Hero from "@/components/Hero";
import SpecialItems from "@/components/SpecialItems";


export default function Home() {
  return (
    <main className="overflow-x-hidden w-full">
      <Hero/>
      <div className="flex w-full border-muted-foreground bg-muted text-muted-foreground
      items-center justify-center sm:my-16 mb-10 rounded-xs
      "></div>
      <SpecialItems/>
    </main>
  );
}
