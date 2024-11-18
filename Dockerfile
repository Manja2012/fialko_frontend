#image 
FROM node:lts-alpine3.20 as dev

#repertoir
WORKDIR /www

#  Copier le package.json et le package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste de l'application
COPY src public index.html vite.config.js ./

# expose le porte
EXPOSE 5173

# demarrer l'application: node server.js
CMD ["npm","run","dev"]

FROM dev as build

RUN npm run build

FROM nginx:stable-alpine-perl

COPY --from=build ./dist /usr/share/nginx/html



