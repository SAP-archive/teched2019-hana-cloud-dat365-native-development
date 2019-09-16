FROM node:10.16.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY /dat365-tpj_appRouter/package*.json ./
COPY /srv/.npmrc .npmrc

RUN npm install

# Bundle app source
COPY /dat365-tpj_appRouter/. .
COPY /ui /usr/src/ui
RUN rm default-env.json

EXPOSE 5000

CMD [ "node", "node_modules/@sap/approuter/approuter.js" ]
