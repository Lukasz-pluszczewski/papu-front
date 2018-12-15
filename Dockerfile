FROM node:latest
RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app/
COPY src/server.js /usr/src/app/src
COPY ./build /usr/src/app/build
CMD ["npm", "run", "serve"]
