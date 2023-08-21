FROM --platform=linux/arm/v8 node:18-alpine AS dependencies

WORKDIR /app
COPY package*.json .
RUN npm ci

FROM --platform=linux/arm/v8 node:18-alpine AS builder

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

FROM --platform=linux/arm/v8 node:18-alpine AS deploy

WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
#get prisma files
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
#get start.sh
COPY --from=builder --chown=nextjs:nodejs /app/start.sh ./start.sh
RUN chmod +x ./start.sh
#get package.json
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
#get node_modules
COPY --from=builder /app/node_modules ./node_modules

#get public
COPY --from=builder /app/public ./public

EXPOSE 3000

ENV PORT 3000

CMD ["./start.sh"]