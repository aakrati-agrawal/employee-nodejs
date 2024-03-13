FROM node:slim
WORKDIR /app
ADD package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "./index.js" ]