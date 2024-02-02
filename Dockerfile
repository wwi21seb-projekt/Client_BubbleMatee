# Wählen des leichteren Node-Basisimage
#FROM node:18-alpine

# Installieren von Abhängigkeiten für nvm und Node.js
# Installiere nur die notwendigen Pakete. Alpine verwendet apk statt apt-get.
#RUN apk add --no-cache curl bash coreutils

# Installieren von nvm (Node Version Manager)
#ENV NVM_DIR /usr/local/nvm
#ENV NODE_VERSION 18.4.0

# Erstellen des NVM_DIR und Installieren von NVM
#RUN mkdir -p $NVM_DIR \
#    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
#    && . $NVM_DIR/nvm.sh \
#    && nvm install $NODE_VERSION \
#    && nvm use $NODE_VERSION \
#    && nvm alias default $NODE_VERSION

# Fügen Sie /usr/local/nvm/versions/node/v<$NODE_VERSION>/bin zum PATH hinzu
#ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH


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


# Installieren der Projekt-Abhängigkeiten
RUN npm install

# Kopieren der Projektdateien in das Arbeitsverzeichnis
COPY . .

# Bauen der Anwendung für die Produktion
RUN npm run build

# Der Port, auf dem der Container laufen soll
EXPOSE 4174

# Starten der App
CMD ["node", "-r", "dotenv/config", "build"]
