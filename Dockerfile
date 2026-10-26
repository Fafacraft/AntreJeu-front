
# Stage 1: Build the React application
FROM node:24-alpine AS builder

WORKDIR /app

# Install dependencies first to improve build caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and create the production build
COPY . .

# Set environment variables for vite build-time configuration
ARG VITE_SENTRY_DSN
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN

RUN npm run build


# Stage 2: Serve the built application
FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
