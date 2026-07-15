import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      {children}
    </section>
  );
}

export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-10 text-center md:mb-12", className)}>
      <h2 className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">{title}</h2>
      {description && (
        <p className="mt-3 text-muted-foreground md:text-lg">{description}</p>
      )}
    </div>
  );
}
