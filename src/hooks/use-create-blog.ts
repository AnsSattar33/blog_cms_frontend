"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { blogService } from "@/services/blog.service";
import { parseApiError } from "@/lib/api-error";
import type { CreateBlogInput } from "@/types";

export function useCreateBlog() {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: (input: CreateBlogInput) =>
      blogService.create(input, setUploadProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      setUploadProgress(0);
      toast.success("Blog created successfully");
    },
    onError: (error: unknown) => {
      setUploadProgress(0);
      toast.error(parseApiError(error).message);
    },
  });

  return { ...mutation, uploadProgress };
}
