FROM node:14-alpine

WORKDIR /src

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

CMD ["yarn", "dev"]
