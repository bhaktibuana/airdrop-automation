FROM node:18

# define work directory
WORKDIR /app

# install packages
COPY package*.json ./
RUN npm install

# collect all required files
COPY . .

# compile app to binary file
RUN npm run build:dev

CMD ["npm", "start"]
