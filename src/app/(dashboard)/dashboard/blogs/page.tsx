"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { BlogTable } from "@/components/dashboard/blog-table";
import { TableSkeleton } from "@/components/common/loading-skeleton";
import { EmptyState } from "@/components/common/empty-state";
import { SearchInput } from "@/components/common/search-input";
import { Pagination } from "@/components/common/pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBlogs } from "@/hooks/use-blogs";
import { useDeleteBlog } from "@/hooks/use-delete-blog";
import { DASHBOARD_PAGE_SIZE } from "@/lib/constants";

export default function DashboardBlogsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1");

  const params = useMemo(
    () => ({ search, page, limit: DASHBOARD_PAGE_SIZE }),
    [search, page]
  );

  const { data, isLoading, isError } = useBlogs(params);
  const deleteBlog = useDeleteBlog();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) next.set(key, value);
        else next.delete(key);
      });
      if (!updates.page) next.delete("page");
      router.push(`/dashboard/blogs?${next.toString()}`);
    },
    [router, searchParams]
  );

  const handleDelete = () => {
    if (deleteId) {
      deleteBlog.mutate(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  return (
    <div>
      <PageHeader
        title="Blogs"
        description="Manage all your blog posts"
        action={
          <Button asChild>
            <Link href="/dashboard/blogs/create">Create Blog</Link>
          </Button>
        }
      />

      <div className="mb-6 max-w-md">
        <SearchInput
          key={`search-${search}`}
          value={search}
          onChange={(q) => updateParams({ q, page: "" })}
        />
      </div>

      {isLoading ? (
        <TableSkeleton rows={8} />
      ) : isError ? (
        <EmptyState
          title="Something went wrong"
          description="We couldn't load your blogs. Please try again."
        />
      ) : data?.data.length ? (
        <>
          <BlogTable blogs={data.data} onDelete={setDeleteId} />
          <Pagination
            page={data.pagination.page}
            totalPages={data.pagination.totalPages}
            onPageChange={(p) => updateParams({ page: String(p) })}
            className="mt-8"
          />
        </>
      ) : (
        <EmptyState
          title="No blogs found"
          description={search ? "Try a different search term." : "Create your first blog post."}
        />
      )}

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete blog</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The blog will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteBlog.isPending}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
