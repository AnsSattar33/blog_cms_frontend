"use client";

import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/forms/image-upload";
import { RichTextEditor } from "@/components/forms/rich-text-editor";
import { createBlogSchema, type BlogFormValues } from "@/schemas/blog.schema";
import { BLOG_CATEGORIES } from "@/lib/constants";
import { slugify } from "@/lib/slugify";
import type { BlogStatus } from "@/types";

interface BlogFormProps {
  defaultValues?: Partial<BlogFormValues>;
  onSubmit: (values: BlogFormValues & { status: BlogStatus }) => void;
  isSubmitting?: boolean;
  uploadProgress?: number;
  submitLabel?: string;
}

const emptyDefaults: BlogFormValues = {
  title: "",
  slug: "",
  shortDescription: "",
  category: "",
  tags: [],
  thumbnail: "",
  coverImageFile: undefined,
  content: "",
  published: false,
  isFeatured: false,
};

export function BlogForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  uploadProgress,
  submitLabel = "Save Blog",
}: BlogFormProps) {
  const isEditing = !!defaultValues?.title;
  const schema = useMemo(() => createBlogSchema(!isEditing), [isEditing]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ...emptyDefaults, ...defaultValues },
  });

  const title = watch("title");

  useEffect(() => {
    if (!isEditing && title) {
      setValue("slug", slugify(title));
    }
  }, [title, isEditing, setValue]);

  const handleFormSubmit = (values: BlogFormValues) => {
    onSubmit({
      ...values,
      status: values.published ? "published" : "draft",
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter blog title" {...register("title")} />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" placeholder="blog-url-slug" {...register("slug")} />
          {errors.slug && (
            <p className="text-sm text-destructive">{errors.slug.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortDescription">Short Description</Label>
        <Textarea
          id="shortDescription"
          placeholder="Brief summary of the blog post"
          rows={3}
          {...register("shortDescription")}
        />
        {errors.shortDescription && (
          <p className="text-sm text-destructive">
            {errors.shortDescription.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {BLOG_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-sm text-destructive">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Input
                id="tags"
                placeholder="react, nextjs, typescript"
                value={field.value.join(", ")}
                onChange={(e) =>
                  field.onChange(
                    e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                  )
                }
              />
            )}
          />
          {errors.tags && (
            <p className="text-sm text-destructive">{errors.tags.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Cover Image</Label>
        <Controller
          name="coverImageFile"
          control={control}
          render={({ field }) => (
            <ImageUpload
              previewUrl={defaultValues?.thumbnail}
              file={field.value ?? null}
              onChange={(file) => {
                field.onChange(file ?? undefined);
              }}
              error={errors.coverImageFile?.message}
            />
          )}
        />
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              error={errors.content?.message}
            />
          )}
        />
      </div>

      <div className="space-y-4 rounded-xl border border-hairline bg-surface-indigo/50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="published" className="text-base">
              Publish
            </Label>
            <p className="text-sm text-muted-foreground">
              Make this blog visible on the website
            </p>
          </div>
          <Controller
            name="published"
            control={control}
            render={({ field }) => (
              <Switch
                id="published"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="isFeatured" className="text-base">
              Featured
            </Label>
            <p className="text-sm text-muted-foreground">
              Show on the landing page featured section
            </p>
          </div>
          <Controller
            name="isFeatured"
            control={control}
            render={({ field }) => (
              <Switch
                id="isFeatured"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      {uploadProgress !== undefined && uploadProgress > 0 && uploadProgress < 100 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Uploading image...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-onyx">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}
