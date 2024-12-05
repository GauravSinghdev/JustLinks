import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="h-[200px] w-[250px] rounded-xl" />
      <Skeleton className="h-[200px] w-[250px] rounded-xl" />
      <Skeleton className="h-[200px] w-[250px] rounded-xl" />
      <Skeleton className="h-[200px] w-[250px] rounded-xl" />
      <Skeleton className="h-[200px] w-[250px] rounded-xl" />
      <Skeleton className="h-[200px] w-[250px] rounded-xl" />
      <Skeleton className="h-[200px] w-[250px] rounded-xl" />
      <Skeleton className="h-[200px] w-[250px] rounded-xl" />
      <Skeleton className="h-[200px] w-[250px] rounded-xl" />
      <Skeleton className="h-[200px] w-[250px] rounded-xl" />
      <Skeleton className="h-[200px] w-[250px] rounded-xl" />
      <Skeleton className="h-[200px] w-[250px] rounded-xl" />
    </div>
  )
}
