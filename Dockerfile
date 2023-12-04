# Wählen Sie ein Ubuntu Basisimage mit Node.js
FROM ubuntu:latest

# Node.js und npm installieren
RUN apt-get update && apt-get install -y curl software-properties-common && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Setzen Sie das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopieren Sie die package.json und package-lock.json
COPY package*.json ./

# Installieren Sie die Projekt-Abhängigkeiten
RUN npm install

# Kopieren Sie die Projektdateien in das Arbeitsverzeichnis
COPY . .

# Bauen Sie die Anwendung für die Produktion
RUN npm run build

# Der Port, auf dem der Container laufen soll
EXPOSE 5173

# Starten Sie die App
CMD ["npm", "run", "dev"]
