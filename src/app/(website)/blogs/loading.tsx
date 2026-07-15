import { BlogGridSkeleton } from "@/components/common/loading-skeleton";
import { Container } from "@/components/layout/container";

function LandingSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`landing-skeleton animate-pulse rounded-lg ${className ?? ""}`}
    />
  );
}

export default function BlogsLoading() {
  return (
    <>
      <section className="landing-hero-bg py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <LandingSkeleton className="mx-auto mb-6 h-8 w-32" />
            <LandingSkeleton className="mx-auto h-12 w-full max-w-md" />
            <LandingSkeleton className="mx-auto mt-5 h-5 w-full max-w-lg" />
          </div>
        </Container>
      </section>
      <div className="border-t border-(--lp-border) bg-(--lp-bg-elevated) py-16 md:py-24">
        <Container>
          <LandingSkeleton className="mb-2 h-8 w-48" />
          <LandingSkeleton className="mb-8 h-5 w-72" />
          <BlogGridSkeleton count={6} />
        </Container>
      </div>
    </>
  );
}
