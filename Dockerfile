FROM node:20-alpine AS build
WORKDIR /app
ENV CI=true

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM nginx:alpine

RUN apk add --no-cache gettext

COPY --from=build /app/.next /usr/share/nginx/html

COPY env-config.js.template /usr/share/nginx/html/env-config.js.template
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]