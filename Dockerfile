# Extending image
FROM node:18-alpine AS builder

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Env variables
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json /usr/src/app/package.json

RUN npm install --silent

# Bundle app sourcex
COPY . /usr/src/app

# Lint app
RUN CI=true npm run lint

# Run unit tests
RUN CI=true npm run test:ci

# Build application
RUN npm run build:prod

# uat environment
FROM nginx:1-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html/calendar-ui
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
