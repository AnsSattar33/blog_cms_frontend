import { Container } from "@/components/layout/container";

function LandingSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`landing-skeleton animate-pulse rounded-lg ${className ?? ""}`}
    />
  );
}

export default function BlogSlugLoading() {
  return (
    <div className="py-12 md:py-16">
      <Container className="max-w-4xl">
        <LandingSkeleton className="mb-8 aspect-video w-full rounded-2xl" />
        <LandingSkeleton className="mb-4 h-6 w-24" />
        <LandingSkeleton className="mb-6 h-12 w-3/4" />
        <LandingSkeleton className="mb-4 h-4 w-48" />
        <div className="space-y-3">
          <LandingSkeleton className="h-4 w-full" />
          <LandingSkeleton className="h-4 w-full" />
          <LandingSkeleton className="h-4 w-2/3" />
        </div>
      </Container>
    </div>
  );
}
