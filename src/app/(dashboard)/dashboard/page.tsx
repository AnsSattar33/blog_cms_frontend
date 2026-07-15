"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, FileCheck, FilePen } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { BlogTable } from "@/components/dashboard/blog-table";
import { TableSkeleton } from "@/components/common/loading-skeleton";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { useDeleteBlog } from "@/hooks/use-delete-blog";
import { staggerContainer } from "@/lib/motion";

export default function DashboardHomePage() {
  const { data: user } = useAuth();
  const { data: stats, isLoading, isError, refetch } = useDashboardStats(!!user);
  const deleteBlog = useDeleteBlog();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your blog content"
        className="[&_h1]:dash-page-title [&_p]:dash-page-desc"
        action={
          <Button asChild className="dash-btn-primary h-9 rounded-lg border-0 px-4 text-sm">
            <Link href="/dashboard/blogs/create">Create blog</Link>
          </Button>
        }
      />

      {isLoading ? (
        <TableSkeleton rows={3} />
      ) : isError || !stats ? (
        <EmptyState
          title="Unable to load stats"
          description="Something went wrong while fetching your data."
          className="dash-empty rounded-xl border-dashed py-16 [&_h3]:text-(--dash-text) [&_p]:text-(--dash-text-muted)"
          action={
            <Button
              variant="outline"
              className="mt-4 border-(--dash-border) bg-transparent text-(--dash-text) hover:bg-(--dash-surface-hover)"
              onClick={() => refetch()}
            >
              Try again
            </Button>
          }
        />
      ) : (
        <>
          <motion.div
            className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <StatsCard
              title="Total blogs"
              value={stats.totalBlogs}
              icon={FileText}
              variant="blurple"
            />
            <StatsCard
              title="Published"
              value={stats.publishedBlogs}
              icon={FileCheck}
              description="Live on the website"
              variant="green"
            />
            <StatsCard
              title="Drafts"
              value={stats.draftBlogs}
              icon={FilePen}
              description="Not yet published"
              variant="amber"
            />
          </motion.div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="dash-section-title">Recent blogs</h2>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-8 border-(--dash-border) bg-transparent text-(--dash-text-muted) hover:bg-(--dash-surface) hover:text-(--dash-text)"
              >
                <Link href="/dashboard/blogs">View all</Link>
              </Button>
            </div>

            {stats.recentBlogs.length ? (
              <BlogTable
                blogs={stats.recentBlogs}
                onDelete={(id) => deleteBlog.mutate(id)}
              />
            ) : (
              <EmptyState
                title="No blogs yet"
                description="Create your first blog post to get started."
                className="dash-empty rounded-xl border-dashed py-16 [&_h3]:text-(--dash-text) [&_p]:text-(--dash-text-muted)"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
