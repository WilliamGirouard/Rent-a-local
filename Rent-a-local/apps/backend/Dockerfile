FROM node:20-alpine AS builder

WORKDIR /app/Rent-a-local/apps/backend

COPY Rent-a-local/apps/backend ./
RUN npm install
RUN npm run build

FROM node:20-alpine

WORKDIR /app/Rent-a-local/apps/backend

COPY --from=builder /app/Rent-a-local/apps/backend/node_modules ./node_modules
COPY --from=builder /app/Rent-a-local/apps/backend/dist ./dist

CMD ["node", "dist/main.js"]