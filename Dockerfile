FROM node:16.14.2-alpine
WORKDIR /app
ADD package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "./index.js" ]