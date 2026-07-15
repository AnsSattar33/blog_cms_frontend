import { cn } from "@/lib/utils";

interface PublicPageHeroProps {
  badge: string;
  title: string;
  highlight?: string;
  description: string;
  className?: string;
}

export function PublicPageHero({
  badge,
  title,
  highlight,
  description,
  className,
}: PublicPageHeroProps) {
  return (
    <section
      className={cn(
        "landing-hero-bg relative overflow-hidden py-16 md:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-(--lp-border) bg-(--lp-accent-soft) px-4 py-1.5 text-sm text-(--lp-accent-hover)">
          {badge}
        </div>

        <h1 className="font-display text-3xl font-bold leading-[1.15] tracking-tight text-(--lp-text) md:text-4xl lg:text-5xl">
          {title}
          {highlight ? (
            <>
              {" "}
              <span className="text-(--lp-accent-hover)">{highlight}</span>
            </>
          ) : null}
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-(--lp-text-muted) md:text-lg">
          {description}
        </p>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-(--lp-border-strong) to-transparent"
        aria-hidden
      />
    </section>
  );
}
