FROM node:10.16.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY /srv/package*.json ./
COPY /srv/.npmrc .npmrc

RUN npm install

# Bundle app source
COPY /srv/. .
COPY /db /usr/src/db
RUN rm default-env.json

EXPOSE 3100

CMD [ "node", "server.js" ]
