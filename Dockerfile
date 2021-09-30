FROM node:12.9.1 as base
WORKDIR /usr/src/app

FROM base AS builddependencies
COPY package*.json ./
COPY .babelrc ./
RUN npm install

FROM builddependencies AS build
WORKDIR /usr/src/app
COPY src ./src
RUN npm run dist

FROM build AS dependencies
WORKDIR /usr/src/app
COPY --from=builddependencies /usr/src/app/package.json ./
RUN npm install --production
# RUN cd node_modules/geoip-lite && npm run-script updatedb

FROM node:12.9.1-alpine AS release
EXPOSE 8080
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/package.json ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
ENTRYPOINT ["node", "dist/index.js"]
