"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/layout/container";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { isAdmin } from "@/lib/auth-roles";
import { LOGIN_PATH, PUBLIC_NAV_LINKS } from "./public-nav-links";

type PublicNavVariant = "landing" | "default";

interface PublicNavbarProps {
  variant?: PublicNavVariant;
}

const variantStyles = {
  landing: {
    header:
      "sticky top-0 z-50 border-b border-(--lp-border) bg-(--lp-bg)/90 backdrop-blur-lg",
    logo: "font-display text-base font-semibold tracking-tight text-(--lp-text)",
    linkActive: "text-(--lp-text)",
    linkInactive:
      "text-(--lp-text-muted) hover:text-(--lp-accent-hover)",
    loginBtn: "landing-btn-ghost inline-flex h-9 items-center rounded-lg px-4 text-sm font-medium transition-colors",
    sheet: "border-(--lp-border) bg-(--lp-bg-elevated)",
    sheetTitle: "text-(--lp-text)",
    menuBtn:
      "border-(--lp-border) bg-transparent text-(--lp-text)",
  },
  default: {
    header:
      "sticky top-0 z-50 border-b border-hairline bg-canvas/95 backdrop-blur-md",
    logo: "font-display text-lg font-bold uppercase tracking-tight text-foreground",
    linkActive: "text-foreground",
    linkInactive: "text-muted-foreground hover:text-discord-link",
    loginBtn: "",
    sheet: "bg-canvas",
    sheetTitle: "",
    menuBtn: "",
  },
} as const;

function isLinkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PublicNavbar({ variant = "default" }: PublicNavbarProps) {
  const pathname = usePathname();
  const styles = variantStyles[variant];
  const { data: user } = useAuth();
  const showLogin = !isAdmin(user);

  const navLinks = PUBLIC_NAV_LINKS.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={cn(
        "text-sm font-medium transition-colors",
        variant === "landing" ? "text-sm" : "",
        isLinkActive(pathname, link.href) ? styles.linkActive : styles.linkInactive
      )}
    >
      {link.label}
    </Link>
  ));

  const loginLink =
    variant === "landing" ? (
      <Link href={LOGIN_PATH} className={styles.loginBtn}>
        Login
      </Link>
    ) : (
      <Button asChild variant="outline" size="sm">
        <Link href={LOGIN_PATH}>Login</Link>
      </Button>
    );

  return (
    <header className={styles.header}>
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className={styles.logo}>
            {APP_NAME}
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks}
            {showLogin && loginLink}
          </nav>

          <Sheet>
            <SheetTrigger
              className="md:hidden"
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className={styles.menuBtn || undefined}
                />
              }
            >
              <Menu className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="right" className={styles.sheet}>
              <SheetHeader>
                <SheetTitle className={styles.sheetTitle}>{APP_NAME}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4">
                {PUBLIC_NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-base font-medium",
                      isLinkActive(pathname, link.href)
                        ? styles.linkActive
                        : styles.linkInactive
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                {showLogin &&
                  (variant === "landing" ? (
                    <Link
                      href={LOGIN_PATH}
                      className={cn(styles.loginBtn, "mt-2 justify-center")}
                    >
                      Login
                    </Link>
                  ) : (
                    <Button asChild className="mt-2">
                      <Link href={LOGIN_PATH}>Login</Link>
                    </Button>
                  ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
