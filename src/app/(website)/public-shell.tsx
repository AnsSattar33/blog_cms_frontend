import { PublicNavbar } from "@/components/layout/public-nav/public-navbar";
import { PublicFooter } from "@/components/layout/public-nav/public-footer";

interface PublicShellProps {
  children: React.ReactNode;
  variant?: "landing" | "default";
}

export function PublicShell({ children, variant = "default" }: PublicShellProps) {
  const wrapperClass =
    variant === "landing" ? "landing-page flex min-h-full flex-col" : "flex min-h-full flex-col";

  return (
    <div className={wrapperClass}>
      <PublicNavbar variant={variant} />
      <main className="flex-1">{children}</main>
      <PublicFooter variant={variant} />
    </div>
  );
}
