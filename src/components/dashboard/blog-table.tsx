"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Blog } from "@/types";

interface BlogTableProps {
  blogs: Blog[];
  onDelete: (id: string) => void;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogTable({ blogs, onDelete }: BlogTableProps) {
  const router = useRouter();

  return (
    <div className="dash-table-wrap overflow-hidden rounded-2xl shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-(--dash-border) hover:bg-transparent">
            <TableHead className="h-10 text-[11px] font-semibold uppercase tracking-wider text-(--dash-text-subtle)">
              Thumbnail
            </TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-(--dash-text-subtle)">
              Title
            </TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-(--dash-text-subtle)">
              Category
            </TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-(--dash-text-subtle)">
              Status
            </TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-(--dash-text-subtle)">
              Date
            </TableHead>
            <TableHead className="w-16 text-right text-[11px] font-semibold uppercase tracking-wider text-(--dash-text-subtle)">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow
              key={blog.id}
              className="border-(--dash-border) text-(--dash-text) hover:bg-(--dash-surface-hover)"
            >
              <TableCell>
                <div className="relative h-10 w-16 overflow-hidden rounded-md">
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              </TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/blogs/${blog.id}/edit`}
                  className="font-medium hover:underline"
                >
                  {blog.title}
                </Link>
              </TableCell>
              <TableCell className="text-(--dash-text-muted)">
                {blog.category}
              </TableCell>
              <TableCell>
                <Badge
                  variant={blog.status === "published" ? "default" : "secondary"}
                  className={
                    blog.status === "published"
                      ? "bg-(--dash-accent-soft) text-(--dash-accent) hover:bg-(--dash-accent-soft)"
                      : "bg-(--dash-surface-hover) text-(--dash-text-muted)"
                  }
                >
                  {blog.status}
                </Badge>
              </TableCell>
              <TableCell className="text-(--dash-text-muted)">
                {formatDate(blog.updatedAt)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon" />}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => router.push(`/dashboard/blogs/${blog.id}/edit`)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => onDelete(blog.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
