/**
 * Options you can pass to a “list” endpoint.
 * All fields come in as strings via req.query.
 */
export interface ListQuery {
  limit?: string; // how many items per page
  page?: string; // 1-based page number
}

/**
 * Generic paginated response shape.
 * T = item type (so data: T[]).
 */
export interface PaginatedResponse<T> {
  success: true; // always true on pages
  data: T[];
  meta: {
    total: number; // total items in collection
    limit: number; // items this page
    page: number; // current page
    pages: number; // total pages
  };
}

/**
 * Pagination options for listUsers.
 */
export interface ListOptions {
  limit: number;
  page: number;
}
