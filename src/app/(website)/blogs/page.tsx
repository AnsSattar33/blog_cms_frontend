import { Suspense } from "react";
import { BlogGridSkeleton } from "@/components/common/loading-skeleton";
import { Container } from "@/components/layout/container";
import { BlogsPageContent } from "./blogs-page-content";

export default function BlogsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-16 md:py-24">
          <Container>
            <BlogGridSkeleton />
          </Container>
        </div>
      }
    >
      <BlogsPageContent />
    </Suspense>
  );
}
