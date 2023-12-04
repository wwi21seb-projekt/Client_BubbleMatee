# Node.js Basisimage
FROM node:latest

# Arbeitsverzeichnis im Container
WORKDIR /app

# package.json und package-lock.json (falls vorhanden)
COPY package*.json ./

# Installieren Projekt-Abhängigkeiten
RUN npm install

# Kopieren Projektdateien in das Arbeitsverzeichnis
COPY . .

# Bauen der Anwendung für die Produktion
RUN npm run build

# Starten der App
CMD ["npm", "run", "start"]
