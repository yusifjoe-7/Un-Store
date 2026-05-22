export default function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 animate-pulse">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-3 w-10 bg-muted rounded-full" />
          <div className="h-3 w-2 bg-muted rounded-full" />
          <div className="h-3 w-20 bg-muted rounded-full" />
          <div className="h-3 w-2 bg-muted rounded-full" />
          <div className="h-3 w-32 bg-muted rounded-full" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

          {/* Images */}
          <div>
            <div className="bg-muted rounded-2xl aspect-square mb-3" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-14 h-14 bg-muted rounded-xl" />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            {/* Badges */}
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-muted rounded-full" />
              <div className="h-6 w-12 bg-muted rounded-full" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <div className="h-6 w-3/4 bg-muted rounded-lg" />
              <div className="h-6 w-1/2 bg-muted rounded-lg" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-24 bg-muted rounded-full" />
              <div className="h-4 w-28 bg-muted rounded-full" />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <div className="h-8 w-24 bg-muted rounded-lg" />
              <div className="h-5 w-16 bg-muted rounded-lg" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-3 w-full bg-muted rounded-full" />
              <div className="h-3 w-5/6 bg-muted rounded-full" />
              <div className="h-3 w-4/6 bg-muted rounded-full" />
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <div className="h-4 w-16 bg-muted rounded-full" />
              <div className="h-8 w-28 bg-muted rounded-lg" />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <div className="flex-1 h-11 bg-muted rounded-xl" />
              <div className="w-11 h-11 bg-muted rounded-xl" />
            </div>

            {/* Info chips */}
            <div className="bg-muted/50 rounded-xl p-3 space-y-2.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted rounded" />
                  <div className="h-3 bg-muted rounded-full" style={{ width: `${60 + i * 10}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border border-border rounded-2xl overflow-hidden">
          {/* Tab buttons */}
          <div className="flex border-b border-border bg-muted/30 p-1 gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-1 h-9 bg-muted rounded-lg" />
            ))}
          </div>

          {/* Tab content */}
          <div className="p-5 space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-border/50">
                <div className="h-3 w-1/3 bg-muted rounded-full" />
                <div className="h-3 bg-muted rounded-full" style={{ width: `${20 + (i % 3) * 10}%` }} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}