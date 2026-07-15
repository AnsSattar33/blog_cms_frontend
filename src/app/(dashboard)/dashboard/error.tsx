"use client";

import { EmptyState } from "@/components/common/empty-state";

export default function DashboardError() {
  return (
    <EmptyState
      title="Something went wrong"
      description="We couldn't load the dashboard. Please try again."
    />
  );
}
