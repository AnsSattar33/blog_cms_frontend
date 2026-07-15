import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only"),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(500, "Short description must be at most 500 characters"),
  category: z.string().min(1, "Please select a category"),
  tags: z.array(z.string()).min(1, "Add at least one tag"),
  thumbnail: z.string().optional(),
  coverImageFile: z.instanceof(File).optional(),
  content: z.string().min(20, "Content must be at least 20 characters"),
  published: z.boolean(),
  isFeatured: z.boolean(),
});

export type BlogFormValues = z.infer<typeof blogSchema>;

export function createBlogSchema(requireImage: boolean) {
  return blogSchema.superRefine((data, ctx) => {
    if (requireImage && !data.coverImageFile && !data.thumbnail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cover image is required",
        path: ["coverImageFile"],
      });
    }
  });
}
