FROM node:10

WORKDIR /usr/app

COPY package*.json ./

RUN npm install 

COPY . .


EXPOSE 3050
CMD ["start"]
ENTRYPOINT [ "npm"]
