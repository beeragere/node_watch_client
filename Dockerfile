# ----------------------------
#  Base image
# ----------------------------
FROM node:22-slim AS base
WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source
COPY . .

# ----------------------------
#  Development
# ----------------------------
FROM base AS dev
# Expose Vite dev server port
EXPOSE 5173
# Run vite in dev mode
CMD ["npm", "run", "dev", "--", "--host"]

# ----------------------------
#  Build stage
# ----------------------------
FROM base AS build
RUN npm run build

# ----------------------------
#  Production
# ----------------------------
FROM nginx:alpine AS prod
# Copy built app to nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
