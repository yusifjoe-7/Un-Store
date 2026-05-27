import { useRouter } from "next/navigation";

export default function NotAStorePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 select-none">
      {/* Decorative ring */}
      <div className="relative flex items-center justify-center mb-10">
        <div className="absolute w-48 h-48 rounded-full border border-primary/10 animate-ping [animation-duration:3s]" />
        <div className="absolute w-36 h-36 rounded-full border border-primary/20" />
        <div className="w-24 h-24 rounded-full bg-primary/5 border border-primary/30 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-9 h-9 text-primary/60"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
      </div>

      {/* Text */}
      <h1 className="text-3xl font-semibold tracking-tight mb-3">
        This is not a real store
      </h1>
      <p className="text-muted-foreground text-sm mb-10">
        Nothing to buy here. Move along.
      </p>

      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Go back
      </button>
    </main>
  );
}