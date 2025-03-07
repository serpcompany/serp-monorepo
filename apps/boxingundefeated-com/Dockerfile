# Stage 1: Builder
FROM node:21-slim as builder
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y git make g++ python3

# install pnpm
RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --shamefully-hoist && pnpm store prune
COPY . .
RUN pnpm run build

# Stage 2: Deploy
FROM node:21-slim as deploy
COPY --from=builder /app/.output /app/output
ENV HOST=0.0.0.0
ENV PORT=80
EXPOSE 80
ENTRYPOINT ["node", "/app/output/server/index.mjs"]
