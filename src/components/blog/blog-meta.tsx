import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";
import type { Blog } from "@/types";

interface BlogMetaProps {
  blog: Blog;
  tone?: "default" | "landing";
}

function formatDate(date: string | null) {
  if (!date) return "Draft";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogMeta({ blog, tone = "default" }: BlogMetaProps) {
  const initials = blog.author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const isLanding = tone === "landing";

  return (
    <div
      className={
        isLanding
          ? "flex flex-wrap items-center gap-4 text-sm text-(--lp-text-muted)"
          : "flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
      }
    >
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          {blog.author.avatar && (
            <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
          )}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <span
          className={
            isLanding ? "font-medium text-(--lp-text)" : "font-medium text-foreground"
          }
        >
          {blog.author.name}
        </span>
      </div>
      <span className="flex items-center gap-1.5">
        <Calendar className="h-4 w-4" />
        {formatDate(blog.publishedAt)}
      </span>
      <span className="flex items-center gap-1.5">
        <Clock className="h-4 w-4" />
        {blog.readingTimeMinutes} min read
      </span>
    </div>
  );
}
