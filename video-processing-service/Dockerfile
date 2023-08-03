# using base image 
FROM node:18

# set workring dir in the container to /app
WORKDIR /app

# copy package.json and package-lock.sjon into wd
COPY package*.json ./

# install ffmpeg into container
RUN apt-get update && apt-get install -y ffmpeg

# install any needed packages 
RUN npm install

# copy app source into docker image
COPY . .

# make port 3000 available outside this container 
EXPOSE 3000

# defind the command to run your app using cmd
CMD [ "npm", "start"]