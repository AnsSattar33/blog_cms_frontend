import api from "@/services/axios";
import { ApiClientError } from "@/lib/api-error";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import type {
  APIResponse,
  Blog,
  BlogQueryParams,
  CreateBlogInput,
  DashboardStats,
  PaginatedResponse,
  UpdateBlogInput,
  UploadProgressCallback,
} from "@/types";

function buildBlogQueryParams(params: BlogQueryParams = {}): Record<string, string | number> {
  const {
    search = "",
    category = "",
    tag = "",
    sort = "",
    page = 1,
    limit = DEFAULT_PAGE_SIZE,
    status,
  } = params;

  const query: Record<string, string | number> = { page, limit };

  if (search) query.search = search;
  if (category) query.category = category;
  if (tag) query.tag = tag;
  if (sort) query.sort = sort;
  if (status === "published") query.isPublished = "true";
  if (status === "draft") query.isPublished = "false";

  return query;
}

function buildBlogFormData(input: CreateBlogInput | UpdateBlogInput): FormData {
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("slug", input.slug);
  formData.append("excerpt", input.shortDescription);
  formData.append("content", input.content);
  formData.append("category", input.category);
  formData.append("tags", JSON.stringify(input.tags));
  formData.append("isPublished", String(input.status === "published"));
  formData.append("isFeatured", String(input.isFeatured ?? false));

  if (input.coverImage) {
    formData.append("coverImage", input.coverImage);
  }

  return formData;
}

export const blogService = {
  async getAll(params: BlogQueryParams = {}): Promise<PaginatedResponse<Blog>> {
    const { data } = await api.get<PaginatedResponse<Blog>>("/blogs", {
      params: buildBlogQueryParams(params),
    });
    return data;
  },

  async getPublished(params: BlogQueryParams = {}): Promise<PaginatedResponse<Blog>> {
    return this.getAll({ ...params, status: "published" });
  },

  async getBySlug(slug: string): Promise<APIResponse<Blog | null>> {
    try {
      const { data } = await api.get<APIResponse<Blog>>(`/blogs/${slug}`);
      return { data: data.data };
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 404) {
        return { data: null };
      }
      throw error;
    }
  },

  async getById(id: string): Promise<APIResponse<Blog | null>> {
    try {
      const { data } = await api.get<APIResponse<Blog>>(`/blogs/by-id/${id}`);
      return { data: data.data };
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 404) {
        return { data: null };
      }
      throw error;
    }
  },

  async create(
    input: CreateBlogInput,
    onProgress?: UploadProgressCallback
  ): Promise<APIResponse<Blog>> {
    const formData = buildBlogFormData(input);
    const { data } = await api.post<APIResponse<Blog>>("/blogs", formData, {
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          onProgress(Math.round((event.loaded * 100) / event.total));
        }
      },
    });
    return data;
  },

  async update(
    input: UpdateBlogInput,
    onProgress?: UploadProgressCallback
  ): Promise<APIResponse<Blog>> {
    const { id, ...payload } = input;
    const formData = buildBlogFormData({ ...payload, id } as UpdateBlogInput);
    const { data } = await api.put<APIResponse<Blog>>(`/blogs/${id}`, formData, {
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          onProgress(Math.round((event.loaded * 100) / event.total));
        }
      },
    });
    return data;
  },

  async delete(id: string): Promise<APIResponse<null>> {
    const { data } = await api.delete<APIResponse<null>>(`/blogs/${id}`);
    return data;
  },

  async getFeatured(limit = 3): Promise<APIResponse<Blog[]>> {
    const { data } = await api.get<APIResponse<Blog[]>>("/blogs/featured", {
      params: { limit },
    });
    return data;
  },

  async getLatest(limit = 6): Promise<APIResponse<Blog[]>> {
    const { data } = await api.get<APIResponse<Blog[]>>("/blogs/latest", {
      params: { limit },
    });
    return data;
  },

  async getRelated(slug: string, limit = 3): Promise<APIResponse<Blog[]>> {
    const { data } = await api.get<APIResponse<Blog[]>>(`/blogs/${slug}/related`, {
      params: { limit },
    });
    return data;
  },

  async getDashboardStats(): Promise<APIResponse<DashboardStats>> {
    const { data } = await api.get<APIResponse<DashboardStats>>("/blogs/dashboard/stats");
    return data;
  },
};
