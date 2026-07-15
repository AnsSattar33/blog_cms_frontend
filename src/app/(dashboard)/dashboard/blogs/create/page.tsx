"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { BlogForm } from "@/components/forms/blog-form";
import { useCreateBlog } from "@/hooks/use-create-blog";
import type { BlogFormValues } from "@/schemas/blog.schema";
import type { BlogStatus } from "@/types";

export default function CreateBlogPage() {
  const router = useRouter();
  const { mutate: createBlog, isPending, uploadProgress } = useCreateBlog();

  const handleSubmit = (values: BlogFormValues & { status: BlogStatus }) => {
    if (!values.coverImageFile) return;

    createBlog(
      {
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

  return (
    <div>
      <PageHeader
        title="Create Blog"
        description="Write and publish a new blog post"
      />
      <div className="max-w-3xl">
        <BlogForm
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          uploadProgress={uploadProgress}
          submitLabel="Create Blog"
        />
      </div>
    </div>
  );
}
