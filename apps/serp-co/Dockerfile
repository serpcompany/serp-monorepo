# Stage 1: Builder
FROM node:21-slim as builder
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y git make g++ python3

# install pnpm
RUN npm install -g pnpm

ARG NUXT_UI_PRO_LICENSE

WORKDIR /app
COPY . .
RUN pnpm --filter @serp-co install --shamefully-hoist
RUN pnpm store prune
RUN pnpm --filter @serp-co run build

# Stage 2: Deploy
FROM node:21-slim as deploy
COPY --from=builder /app/apps/serp-co/.output /app/output
ENV HOST=0.0.0.0
ENV PORT=80
EXPOSE 80
ENTRYPOINT ["node", "/app/output/server/index.mjs"]
