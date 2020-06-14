FROM node AS build-common
WORKDIR /app
COPY web-common web-common
WORKDIR /app/web-common
#RUN apt install yarn
RUN yarn
RUN yarn build
FROM node AS build-admin
WORKDIR /app
COPY --from=build-common /app/web-common /app/web-common
RUN mkdir -p /app/web-admin
COPY web-admin/package.json web-admin/yarn.lock web-admin/
WORKDIR /app/web-admin
RUN yarn
COPY web-admin .
RUN yarn build
FROM node AS build-studi
WORKDIR /app
COPY --from=build-common /app/web-common /app/web-common
RUN mkdir -p /app/web-studi
COPY web-studi/package.json web-studi/yarn.lock web-studi/
WORKDIR /app/web-studi
RUN yarn
COPY web-studi .
RUN yarn build
FROM nginx AS runtime
RUN mkdir -p /app/web-admin/build
RUN mkdir -p /app/web-studi/build
COPY --from=build-admin /app/web-admin/build /app/web-admin/build
COPY --from=build-studi /app/web-studi/build /app/web-studi/build

COPY misc/site-react-docker.conf /etc/nginx/nginx.conf