import Link from "next/link";

interface ArticleBreadcrumbsProps {
  title: string;
}

export function ArticleBreadcrumbs({ title }: ArticleBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-(--lp-text-muted)">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-(--lp-accent-hover)"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link
            href="/blogs"
            className="transition-colors hover:text-(--lp-accent-hover)"
          >
            Articles
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <span className="text-(--lp-text)" aria-current="page">
            {title}
          </span>
        </li>
      </ol>
    </nav>
  );
}
