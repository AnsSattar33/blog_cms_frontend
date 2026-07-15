const STATUS_MESSAGES: Record<number, string> = {
  401: "Please sign in to continue.",
  403: "You do not have permission to perform this action.",
  404: "The requested resource was not found.",
  422: "Please check your input and try again.",
  500: "Something went wrong. Please try again later.",
};

export class ApiClientError extends Error {
  readonly status: number;
  readonly errors: string[];

  constructor(status: number, message: string, errors: string[] = []) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.errors = errors;
  }
}

export function getErrorMessage(status: number, fallback?: string): string {
  return STATUS_MESSAGES[status] ?? fallback ?? "An unexpected error occurred.";
}

export function parseApiError(error: unknown): ApiClientError {
  if (error instanceof ApiClientError) {
    return error;
  }

  if (typeof error === "object" && error !== null && "response" in error) {
    const axiosError = error as {
      response?: {
        status?: number;
        data?: { message?: string; errors?: string[] };
      };
    };

    const status = axiosError.response?.status ?? 500;
    const data = axiosError.response?.data;
    const backendMessage = data?.message;
    const errors = data?.errors ?? [];

    const message =
      status === 422 && errors.length > 0
        ? errors[0]
        : getErrorMessage(status, backendMessage);

    return new ApiClientError(status, message, errors);
  }

  if (error instanceof Error) {
    return new ApiClientError(500, getErrorMessage(500));
  }

  return new ApiClientError(500, getErrorMessage(500));
}
