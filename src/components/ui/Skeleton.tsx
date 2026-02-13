import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-neutral-800/50",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 animate-shimmer" />
    </div>
  );
}

export function GridSkeleton({ columns = 3, items = 3 }: { columns?: number; items?: number }) {
  return (
    <div className={cn("grid gap-8", {
      "grid-cols-1": columns === 1,
      "grid-cols-1 md:grid-cols-2": columns === 2,
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": columns === 3,
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-4": columns === 4,
    })}>
      {Array.from({ length: items }).map((_, i) => (
        <Skeleton key={i} className="h-64 w-full rounded-2xl" />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-neutral-800 space-y-4">
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function SectionSkeleton({ title = true, description = false, children }: { title?: boolean; description?: boolean; children?: React.ReactNode }) {
  return (
    <section className="py-20 bg-transparent w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && <Skeleton className="h-12 w-64 mb-4" />}
        {description && <Skeleton className="h-6 w-96 mb-12" />}
        {children || <GridSkeleton />}
      </div>
    </section>
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative h-[100svh] bg-transparent overflow-hidden flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-6">
          <Skeleton className="h-20 w-3/4" />
          <Skeleton className="h-10 w-1/2" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
          </div>
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSkeleton() {
  return (
    <section className="bg-transparent pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[3fr_2fr] gap-10 items-center">
          <div className="space-y-6">
            <Skeleton className="h-12 w-full max-w-lg" />
            <div className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <Skeleton className="h-12 w-48 rounded-full" />
          </div>
          <Skeleton className="h-[400px] w-full rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

export function EventSkeleton() {
  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-neutral-800">
      <Skeleton className="aspect-video w-full" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function TeamSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Skeleton className="h-48 w-48 rounded-full" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}
