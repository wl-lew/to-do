FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG SERVER_PORT
ENV SERVER_PORT=${SERVER_PORT}

EXPOSE ${SERVER_PORT}

CMD ["npm", "start"]