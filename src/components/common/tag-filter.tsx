"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TAGS = [
  "react",
  "nextjs",
  "design",
  "ui",
  "startup",
  "growth",
  "typescript",
  "frontend",
  "architecture",
  "marketing",
];

interface TagFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TagFilter({ value, onChange, className }: TagFilterProps) {
  const tags = ["All", ...TAGS];

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => {
        const isActive = (tag === "All" && !value) || tag === value;
        return (
          <Button
            key={tag}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(tag === "All" ? "" : tag)}
          >
            {tag}
          </Button>
        );
      })}
    </div>
  );
}
