"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { blogService } from "@/services/blog.service";
import { parseApiError } from "@/lib/api-error";
import type { UpdateBlogInput } from "@/types";

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: (input: UpdateBlogInput) =>
      blogService.update(input, setUploadProgress),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({
        queryKey: ["blog", "id", response.data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["blog", "slug", response.data.slug],
      });
      setUploadProgress(0);
      toast.success("Blog updated successfully");
    },
    onError: (error: unknown) => {
      setUploadProgress(0);
      toast.error(parseApiError(error).message);
    },
  });

  return { ...mutation, uploadProgress };
}
