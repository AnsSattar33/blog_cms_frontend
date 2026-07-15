"use client";

import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/common/empty-state";
import { LANDING_EMPTY_CLASS } from "@/features/landing/landing-classes";

export default function BlogsError() {
  return (
    <section className="border-t border-(--lp-border) bg-(--lp-bg-elevated) py-16 md:py-24">
      <Container>
        <EmptyState
          title="Something went wrong"
          description="We couldn't load the blogs. Please try again."
          className={LANDING_EMPTY_CLASS}
        />
      </Container>
    </section>
  );
}
