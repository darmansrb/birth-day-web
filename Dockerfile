# Stage 1: Build Vite React static assets
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files & install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy all source code & assets
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Production Server (Node.js Express + Static Dist)
FROM node:20-alpine AS runner

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy build artifacts & server file
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
COPY --from=build /app/server.js ./server.js

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "server.js"]
