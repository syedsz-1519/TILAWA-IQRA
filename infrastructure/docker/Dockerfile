# TILAWA Backend Dockerfile
# Multi-stage build for optimized production image

# Stage 1: Builder
FROM node:18-alpine AS builder

WORKDIR /build

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY apps/backend/server/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY apps/backend/server/src ./src
COPY apps/backend/server/tsconfig.json ./

# Build TypeScript
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy from builder
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/package*.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:${PORT:-8000}/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Expose port
EXPOSE 8000

# Run app with dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]

# Metadata
LABEL maintainer="TILAWA Team <dev@tilawa.app>" \
      version="1.0.0" \
      description="TILAWA - Multilingual Islamic Quranic Learning Platform"
