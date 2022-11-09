# build environment
FROM node:16.18.0-buster AS builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
COPY . /usr/src/app
RUN npm run build:prod

# uat environment
FROM nginx:1-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html/calendar-ui
COPY nginx/default.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
