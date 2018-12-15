FROM node:latest
RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app/
COPY server.js /usr/src/app/
COPY ./build /usr/src/app/build
CMD ["npm", "run", "serve"]
