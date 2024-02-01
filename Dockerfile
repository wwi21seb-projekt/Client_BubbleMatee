# Wählen des Ubuntu Basisimage mit Node.js
FROM ubuntu:latest

# Node.js und npm installieren
RUN apt-get update && apt-get install -y curl software-properties-common && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Setzen des Arbeitsverzeichnis im Container
WORKDIR /app

# Kopieren der package.json und package-lock.json
COPY package.json ./
COPY package-lock.json ./


# Installieren der Projekt-Abhängigkeiten
RUN npm install

# Kopieren der Projektdateien in das Arbeitsverzeichnis
COPY . .

# Bauen der Anwendung für die Produktion
RUN npm run build

# Der Port, auf dem der Container laufen soll
EXPOSE 4173

# Starten der App
CMD ["npm", "run", "preview"]
