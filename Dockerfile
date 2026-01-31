# Multi-stage build for a Vite (React) app
#
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Install deps separately to leverage layer caching
COPY package*.json ./
RUN npm ci --omit=dev=false

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.27-alpine

# Remove default config and add our own
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Keep foreground for container runtime
CMD ["nginx", "-g", "daemon off;"]
