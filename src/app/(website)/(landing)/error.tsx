"use client";

import { EmptyState } from "@/components/common/empty-state";

export default function LandingError() {
  return (
    <EmptyState
      title="Something went wrong"
      description="We couldn't load this page. Please try again."
    />
  );
}
