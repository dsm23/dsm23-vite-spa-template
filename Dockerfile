# syntax=docker.io/docker/dockerfile:1@sha256:87999aa3d42bdc6bea60565083ee17e86d1f3339802f543c0d03998580f9cb89

FROM ghcr.io/pnpm/pnpm:11.9.0@sha256:ea4a0c09e686d3a81e1f2b606d99cad200f4c5f9053c20599820e0fc812a1c67 AS base
FROM nginx:1.31.2-alpine-slim@sha256:dd722b8ee8794f3c273bfaf8b5351b0652a68ccd73c17e5f0d029857a58f25ef AS runtime

# renovate: datasource=node-version depName=node
ARG NODE_VERSION="26.3.1"

# Stage 1: Install dependencies only when needed
FROM base AS deps

WORKDIR /app

ENV LEFTHOOK=0

# Copy package manager lock files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm runtime set node "$NODE_VERSION" -g && pnpm install --frozen-lockfile

# Stage 2: Build stage
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Vite project
RUN pnpm runtime set node "$NODE_VERSION" -g \
  && pnpm run build

# Stage 3: Production image
FROM runtime

# Copy built static files to nginx's default public folder
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/templates/default.conf.template

# implement changes required to run NGINX as an unprivileged user
RUN sed -i '/user  nginx;/d' /etc/nginx/nginx.conf \
  && sed -i 's,\(/var\)\{0\,1\}/run/nginx.pid,/tmp/nginx.pid,' /etc/nginx/nginx.conf \
  # nginx user must own the cache and etc directory to write cache and tweak the nginx config
  && chown -R nginx /var/cache/nginx \
  && chmod -R g+w /var/cache/nginx \
  && chown -R nginx /etc/nginx \
  && chmod -R g+w /etc/nginx

USER nginx

# ENTRYPOINT [ "20-envsubst-on-templates.sh" ]

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
