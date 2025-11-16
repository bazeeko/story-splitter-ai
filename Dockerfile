FROM node:24.11.1 AS development
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci
RUN npm install
RUN npm install -g typescript tsc-alias

COPY . .

RUN npm run build-express

FROM node:24.11.1-alpine3.22 AS runtime
WORKDIR /app
COPY --from=development /app /app

EXPOSE 3000
CMD ["npm", "run", "start-express"]
