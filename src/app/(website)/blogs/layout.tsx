import "@/features/landing/landing.css";
import { PublicShell } from "@/app/(website)/public-shell";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicShell variant="landing">{children}</PublicShell>;
}
