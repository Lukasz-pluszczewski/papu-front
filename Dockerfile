FROM node:latest
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/src
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install --only=prod
COPY ./src/server.js /usr/src/app/src
COPY ./build /usr/src/app/build
CMD ["npm", "run", "serve"]
