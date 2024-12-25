# Utilisation d'une image Node pour la construction
FROM node:18 as build

WORKDIR /app

# Copier uniquement package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet (mais pas node_modules)
COPY . .

# Construire l'application
RUN npm run build

# Phase Nginx pour servir les fichiers
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
