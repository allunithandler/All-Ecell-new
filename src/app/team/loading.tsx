import { TeamSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="pt-20 bg-black min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex justify-center mb-12">
          <Skeleton className="h-12 w-64" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {Array.from({ length: 8 }).map((_, i) => <TeamSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}
