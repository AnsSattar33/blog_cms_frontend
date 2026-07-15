"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { PageHeader } from "@/components/common/page-header";
import { BlogForm } from "@/components/forms/blog-form";
import { BlogGridSkeleton } from "@/components/common/loading-skeleton";
import { EmptyState } from "@/components/common/empty-state";
import { useBlog } from "@/hooks/use-blog";
import { useUpdateBlog } from "@/hooks/use-update-blog";
import type { BlogFormValues } from "@/schemas/blog.schema";
import type { BlogStatus } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditBlogPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data: blog, isLoading, isError } = useBlog(id, "id");
  const { mutate: updateBlog, isPending, uploadProgress } = useUpdateBlog();

  const handleSubmit = (values: BlogFormValues & { status: BlogStatus }) => {
    updateBlog(
      {
        id,
        title: values.title,
        slug: values.slug,
        shortDescription: values.shortDescription,
        category: values.category,
        tags: values.tags,
        content: values.content,
        status: values.status,
        isFeatured: values.isFeatured,
        coverImage: values.coverImageFile,
      },
      {
        onSuccess: () => router.push("/dashboard/blogs"),
      }
    );
  };

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Edit Blog" description="Loading..." />
        <BlogGridSkeleton count={1} />
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <EmptyState
        title="Blog not found"
        description="The blog you're looking for doesn't exist."
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Edit Blog"
        description={`Editing "${blog.title}"`}
      />
      <div className="max-w-3xl">
        <BlogForm
          defaultValues={{
            title: blog.title,
            slug: blog.slug,
            shortDescription: blog.shortDescription,
            category: blog.category,
            tags: blog.tags,
            thumbnail: blog.thumbnail,
            content: blog.content,
            published: blog.status === "published",
            isFeatured: blog.isFeatured ?? false,
          }}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          uploadProgress={uploadProgress}
          submitLabel="Update Blog"
        />
      </div>
    </div>
  );
}
