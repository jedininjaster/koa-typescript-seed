FROM node:5

ADD ./package.json ./package.json
RUN npm install

ADD . .

EXPOSE 3000

CMD npm start