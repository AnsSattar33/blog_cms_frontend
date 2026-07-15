import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function LandingLoading() {
  return (
    <div className="py-12">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl space-y-4 text-center">
          <Skeleton className="mx-auto h-7 w-40 rounded-full bg-(--lp-surface)" />
          <Skeleton className="mx-auto h-14 w-full max-w-lg bg-(--lp-surface)" />
          <Skeleton className="mx-auto h-5 w-full max-w-md bg-(--lp-surface)" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              className="aspect-[4/3] rounded-2xl bg-(--lp-surface)"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
