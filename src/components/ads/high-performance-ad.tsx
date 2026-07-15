"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { loadHighPerformanceAd } from "@/components/ads/ad-script-queue";

interface HighPerformanceAdProps {
  adKey: string;
  width: number;
  height: number;
  className?: string;
  label?: string;
}

export function HighPerformanceAd({
  adKey,
  width,
  height,
  className,
  label,
}: HighPerformanceAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    void loadHighPerformanceAd(container, { adKey, width, height });
  }, [adKey, width, height]);

  return (
    <div
      className={cn("mx-auto flex flex-col items-center", className)}
      style={{ width: "100%", maxWidth: width }}
    >
      {label ? (
        <span className="mb-2 text-[10px] uppercase tracking-wider text-(--lp-text-subtle)">
          {label}
        </span>
      ) : null}
      <div
        ref={containerRef}
        className="w-full overflow-hidden rounded-lg border border-(--lp-border) bg-(--lp-surface)"
        style={{ width, maxWidth: "100%", minHeight: height }}
        aria-hidden
      />
    </div>
  );
}
