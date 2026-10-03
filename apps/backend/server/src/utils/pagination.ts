export interface PaginationOptions {
  page?: number
  limit?: number
  maxLimit?: number
}

export interface PaginationResult {
  page: number
  limit: number
  skip: number
}

export function parsePagination(options: PaginationOptions): PaginationResult {
  const defaultLimit = 20
  const maxLimit = options.maxLimit || 100

  let page = parseInt(String(options.page || 1), 10)
  let limit = parseInt(String(options.limit || defaultLimit), 10)

  if (isNaN(page) || page < 1) page = 1
  if (isNaN(limit) || limit < 1) limit = defaultLimit
  if (limit > maxLimit) limit = maxLimit

  const skip = (page - 1) * limit

  return { page, limit, skip }
}

export function buildMeta(page: number, limit: number, total: number) {
  const totalPages = Math.ceil(total / limit) || 1
  return {
    page,
    limit,
    total,
    totalPages,
    hasMore: page < totalPages,
  }
}
