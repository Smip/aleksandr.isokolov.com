FROM node:18 AS builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm nx run app:build:production

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY --from=builder /app/dist/apps/app/analog/public /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
