# Use the official Node.js image with version 20 as the base for development
FROM node:20 as development

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies based on the package files
RUN npm install

# Copy the entire local directory to the working directory in the container
COPY . .

# Specify the command to run when the container starts
CMD ["node", "index.js"]
