FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod --save

COPY . .

CMD ["npm" , "start"]