

function CardSkeleton() {
  return (
    <div className="bg-card border-l-2 border-l-primary rounded-xl flex flex-col items-center justify-center sm:w-60 w-40 px-5 py-3 relative border-border animate-pulse">
  
  {/* Discount badge skeleton */}
  <div className="absolute top-3 right-3 bg-muted rounded-full w-10 h-5" />

  {/* Image skeleton */}
  <div className="w-20 md:w-auto">
    <div className="w-[100px] h-[100px] bg-muted rounded-lg" />
  </div>

  {/* Title skeleton */}
  <div className="my-1 w-full flex flex-col gap-1 items-center">
    <div className="h-4 bg-muted rounded w-4/5" />
    <div className="h-4 bg-muted rounded w-3/5" />
  </div>

  {/* Price skeleton */}
  <div className="flex flex-col items-center sm:mt-2 mt-1 gap-1">
    <div className="h-5 bg-muted rounded w-14" />
    <div className="h-4 bg-muted rounded w-10" />
  </div>

</div>
  )
}

export default CardSkeleton