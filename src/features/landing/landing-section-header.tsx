import { cn } from "@/lib/utils";

interface LandingSectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
}

export function LandingSectionHeader({
  title,
  description,
  className,
  align = "center",
}: LandingSectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-12",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <h2 className="font-display text-2xl font-semibold tracking-tight text-(--lp-text) md:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-(--lp-text-muted) md:text-base">{description}</p>
      )}
    </div>
  );
}
