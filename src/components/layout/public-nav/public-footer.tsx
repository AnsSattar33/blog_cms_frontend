import Link from "next/link";
import { Container } from "@/components/layout/container";
import { APP_NAME } from "@/lib/constants";
import { PUBLIC_FOOTER_LINKS } from "./public-nav-links";

type PublicFooterVariant = "landing" | "default";

interface PublicFooterProps {
  variant?: PublicFooterVariant;
}

const variantStyles = {
  landing: {
    footer: "mt-auto border-t border-(--lp-border) bg-(--lp-bg-elevated)",
    brand: "font-display text-base font-semibold text-(--lp-text)",
    desc: "text-sm text-(--lp-text-muted)",
    link: "text-sm text-(--lp-text-muted) transition-colors hover:text-(--lp-accent-hover)",
    copyright: "border-t border-(--lp-border) py-6 text-center text-sm text-(--lp-text-subtle)",
  },
  default: {
    footer: "mt-auto border-t border-hairline bg-canvas",
    brand: "font-display text-lg font-bold uppercase text-foreground",
    desc: "mt-1 text-sm text-muted-foreground",
    link: "text-sm text-muted-foreground transition-colors hover:text-discord-link",
    copyright:
      "border-t border-hairline py-6 text-center text-sm text-muted-foreground",
  },
} as const;

export function PublicFooter({ variant = "default" }: PublicFooterProps) {
  const styles = variantStyles[variant];

  return (
    <footer className={styles.footer}>
      <Container>
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className={styles.brand}>{APP_NAME}</p>
            <p className={styles.desc}>
              A modern platform for publishing and managing blog content.
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 md:gap-6">
            {PUBLIC_FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
