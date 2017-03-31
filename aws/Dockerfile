FROM node:7.7.4-slim

WORKDIR /app

COPY ./idock /app/idock
COPY ./openbabel /app/openbabel

ENV BABEL_DATADIR /app/openbabel/share/openbabel
ENV BABEL_LIBDIR /app/openbabel/lib/openbabel
ENV BABEL_PATH /app/openbabel/bin
ENV IDOCK_PATH /app/idock/bin

COPY ./package.json /app/package.json
COPY ./node_modules /app/node_modules
COPY ./*.js /app/

CMD ["node", "docking.js"]
