FROM node:22

WORKDIR /app

COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY shared/package*.json ./shared/
COPY backend/package*.json ./backend/

RUN npm ci --include=optional

RUN npm install --force @rolldown/binding-linux-arm64-gnu
RUN npm install --no-save lightningcss-linux-arm64-gnu

COPY frontend ./frontend
COPY shared ./shared

RUN npm run build --workspace frontend

EXPOSE 5173

CMD ["npm", "run", "dev", "--workspace", "frontend", "--", "--host", "0.0.0.0"]