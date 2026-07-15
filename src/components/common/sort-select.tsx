"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest", sort: "-createdAt" },
  { value: "oldest", label: "Oldest", sort: "createdAt" },
  { value: "title", label: "Title A–Z", sort: "title" },
  { value: "title-desc", label: "Title Z–A", sort: "-title" },
] as const;

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  const displayValue = SORT_OPTIONS.find((o) => o.value === value)?.value ?? "newest";

  return (
    <Select
      value={displayValue}
      onValueChange={(v) => v && onChange(v)}
    >
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function sortValueToApiParam(value: string): string {
  return SORT_OPTIONS.find((o) => o.value === value)?.sort ?? "-createdAt";
}
