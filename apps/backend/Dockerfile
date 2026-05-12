# Backend Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files first
COPY package*.json ./
RUN npm install

# Copy backend source
COPY Rent-a-local/apps/backend ./Rent-a-local/apps/backend

WORKDIR /app/Rent-a-local/apps/backend
RUN npm install
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine

WORKDIR /app

# Copy node_modules from builder (already has all deps including NestJS)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/Rent-a-local/apps/backend/node_modules ./Rent-a-local/apps/backend/node_modules
COPY --from=builder /app/Rent-a-local/apps/backend/dist ./Rent-a-local/apps/backend/dist

WORKDIR /app/Rent-a-local/apps/backend

CMD ["node", "dist/main.js"]