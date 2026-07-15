import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { ApiClientError, getErrorMessage, parseApiError } from "@/lib/api-error";
import type { BackendPaginationMeta, BackendSuccessResponse } from "@/types/api";
import type { Pagination } from "@/types";

function normalizePagination(meta: BackendPaginationMeta): Pagination {
  return {
    page: meta.currentPage,
    limit: meta.limit,
    total: meta.totalItems,
    totalPages: meta.totalPages,
  };
}

function unwrapResponse<T>(response: AxiosResponse): AxiosResponse {
  const body = response.data as BackendSuccessResponse<T> | { success?: boolean };

  if (
    body &&
    typeof body === "object" &&
    "success" in body &&
    body.success === true &&
    "data" in body
  ) {
    const successBody = body as BackendSuccessResponse<T>;
    response.data = {
      data: successBody.data,
      message: successBody.message,
      ...(successBody.pagination && {
        pagination: normalizePagination(successBody.pagination),
      }),
    };
  }

  return response;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

api.interceptors.response.use(
  (response) => unwrapResponse(response),
  (error) => {
    const apiError = parseApiError(error);

    if (apiError.status === 401 && typeof window !== "undefined") {
      const isAuthRoute = window.location.pathname === "/login";
      if (!isAuthRoute && !window.location.pathname.startsWith("/dashboard")) {
        // Public pages: surface error without redirect
      }
    }

    return Promise.reject(apiError);
  }
);

export { ApiClientError, getErrorMessage };
export default api;
