# Use uma imagem Node.js oficial como base
FROM node:18-slim

# Instale as dependências do sistema operacional que o Cypress precisa
RUN apt-get update && apt-get install -y \
  libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 \
  xvfb \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração e de dependências do seu projeto
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o resto dos arquivos do seu projeto
COPY . .