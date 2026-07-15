"use client";

import { BLOG_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CategoryFilter({ value, onChange, className }: CategoryFilterProps) {
  const categories = ["All", ...BLOG_CATEGORIES];

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((cat) => {
        const isActive = (cat === "All" && !value) || cat === value;
        return (
          <Button
            key={cat}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(cat === "All" ? "" : cat)}
          >
            {cat}
          </Button>
        );
      })}
    </div>
  );
}
