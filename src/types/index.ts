export type BlogStatus = "draft" | "published";

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: UserRole;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  category: string;
  tags: string[];
  thumbnail: string;
  status: BlogStatus;
  author: User;
  publishedAt: string | null;
  readingTimeMinutes: number;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface APIResponse<T> {
  data: T;
  message?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: Pagination;
}

export interface BlogQueryParams {
  search?: string;
  category?: string;
  tag?: string;
  sort?: string;
  page?: number;
  limit?: number;
  status?: BlogStatus;
}

export interface BlogFormPayload {
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  isFeatured?: boolean;
  coverImage?: File;
}

export interface CreateBlogInput extends BlogFormPayload {
  coverImage: File;
}

export interface UpdateBlogInput extends BlogFormPayload {
  id: string;
  coverImage?: File;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface Session {
  user: User;
}

export interface DashboardStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  recentBlogs: Blog[];
}

export interface UploadProgressCallback {
  (progress: number): void;
}
