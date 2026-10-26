
# Stage 1: Build the React application
FROM node:24-alpine AS builder

WORKDIR /app

# Install dependencies first to improve build caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and create the production build
COPY . .
RUN npm run build


# Stage 2: Serve the built application
FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx/frontend.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
