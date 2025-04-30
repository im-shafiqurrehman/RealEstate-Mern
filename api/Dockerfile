# Base image           node:alpine3.18
FROM node:20                     

# Set working directory inside the container
WORKDIR /server

# Copy package.json and package-lock.json
# COPY package*.json ./   as window cannot suppport ' * '
COPY package.json package-lock.json ./


# Install dependencies
RUN npm install

# Copy all files from server folder
COPY . .

# Expose the port your server runs on
EXPOSE 3000

# Run the Backend development server
CMD ["npm", "run", "dev"]