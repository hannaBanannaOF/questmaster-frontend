# Estágio 1: Instalação de dependências
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Estágio 2: Build da aplicação (Agnóstico de variáveis NEXT_PUBLIC)
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN yarn build

# Estágio 3: Runner (Imagem final)
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache bash

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# GARANTIA: Criar a pasta public e dar permissão ao usuário nextjs
RUN mkdir -p public && chown nextjs:nodejs public

# Copiar os arquivos
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copiar entrypoint
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh && chown nextjs:nodejs entrypoint.sh

# Rodar como o usuário criado
USER nextjs

ENTRYPOINT ["./entrypoint.sh"]