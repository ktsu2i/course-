FROM node:latest

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

RUN apt-get update && apt-get install -y \
    curl \
    iputils-ping \
    vim \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]