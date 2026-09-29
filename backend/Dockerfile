FROM node:22

WORKDIR /app

COPY package*.json ./
COPY backend/package*.json ./backend/
COPY shared/package*.json ./shared/

RUN npm ci --include=optional

COPY backend ./backend
COPY shared ./shared
COPY database ./database

RUN npm install --no-save @typescript/typescript-linux-x64@7.0.2

RUN npm run build --workspace backend

EXPOSE 4005

CMD ["npm", "run", "start", "--workspace", "backend"]