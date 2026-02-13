import { GridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="pt-20 bg-black min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex justify-center mb-12">
          <Skeleton className="h-12 w-64" />
        </div>
        <div className="flex gap-4 mb-8 justify-center">
          <Skeleton className="h-10 w-24 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
        <GridSkeleton columns={3} items={9} />
      </div>
    </div>
  );
}
