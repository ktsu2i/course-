FROM node:latest

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

# Probably don't need this
RUN apt-get update && apt-get install -y \
    curl \
    iputils-ping \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]