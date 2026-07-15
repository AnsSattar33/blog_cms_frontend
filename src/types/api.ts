export interface BackendPaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export interface BackendSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  pagination?: BackendPaginationMeta;
}

export interface BackendErrorResponse {
  success: false;
  message: string;
  errors: string[];
}
