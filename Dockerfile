# 🔹 Usa a imagem oficial do Node.js versão 18 como base
FROM node:18

# 🔹 Define o diretório de trabalho dentro do container
# Tudo que acontecer no container estará dentro da pasta /app
WORKDIR /app

# 🔹 Copia os arquivos package.json e package-lock.json (se existir) para o container
# Isso é feito antes do código-fonte para aproveitar o cache do Docker no npm install
COPY package*.json ./

# 🔹 Instala as dependências do projeto (express, sqlite3)
RUN npm install

# 🔹 Copia todo o restante dos arquivos do projeto (app.js, etc.) para dentro do container
COPY . .

# 🔹 Expõe a porta 3000 para que possa ser acessada externamente
EXPOSE 3000

# 🔹 Comando que será executado quando o container iniciar
CMD ["node", "app.js"]
