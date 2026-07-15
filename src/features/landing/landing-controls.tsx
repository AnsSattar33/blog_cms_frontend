"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BLOG_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

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

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "title", label: "Title A–Z" },
  { value: "title-desc", label: "Title Z–A" },
] as const;

interface LandingSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export function LandingSearchInput({
  value,
  onChange,
  placeholder = "Search blogs...",
  className,
  debounceMs = 300,
}: LandingSearchInputProps) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (local !== value) onChange(local);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [local, onChange, debounceMs, value]);

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--lp-text-subtle)" />
      <input
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="landing-input h-10 w-full rounded-lg pl-9 pr-3 text-sm outline-none"
      />
    </div>
  );
}

interface LandingCategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function LandingCategoryFilter({
  value,
  onChange,
  className,
}: LandingCategoryFilterProps) {
  const categories = ["All", ...BLOG_CATEGORIES];

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((cat) => {
        const isActive = (cat === "All" && !value) || cat === value;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat === "All" ? "" : cat)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              isActive ? "landing-btn-primary" : "landing-btn-ghost"
            )}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

interface LandingTagFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function LandingTagFilter({
  value,
  onChange,
  className,
}: LandingTagFilterProps) {
  const tags = ["All", ...TAGS];

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => {
        const isActive = (tag === "All" && !value) || tag === value;
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onChange(tag === "All" ? "" : tag)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              isActive ? "landing-btn-primary" : "landing-btn-ghost"
            )}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}

interface LandingSortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function LandingSortSelect({ value, onChange }: LandingSortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="landing-input h-9 min-w-[160px] rounded-lg px-3 text-sm"
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

interface LandingPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function LandingPagination({
  page,
  totalPages,
  onPageChange,
  className,
}: LandingPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className="landing-btn-ghost inline-flex h-9 w-9 items-center justify-center rounded-lg disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p, i) => {
        const prev = pages[i - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-2">
            {showEllipsis && (
              <span className="px-1 text-(--lp-text-subtle)">…</span>
            )}
            <button
              type="button"
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                p === page ? "landing-btn-primary" : "landing-btn-ghost"
              )}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className="landing-btn-ghost inline-flex h-9 w-9 items-center justify-center rounded-lg disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
