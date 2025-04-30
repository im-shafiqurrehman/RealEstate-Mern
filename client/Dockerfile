# ⚡ First Stage: Build the React App using Vite
FROM node:18 AS build

# Set the working directory inside the container (frontend directory)
WORKDIR /client

# Copy package.json and package-lock.json first (for efficient caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all project files into the container
COPY . .

# Build the React app using Vite (output will be placed in the 'dist' folder)
RUN npm run build

# ⚡ Second Stage: Serve React App with Nginx
FROM nginx:1.23

# Set the working directory for Nginx (where React will be served from)
WORKDIR /usr/share/nginx/html

# Remove default Nginx files (if any)
RUN rm -rf ./*

# Copy the built React app from the first stage (from /client/dist to Nginx's serving directory)
COPY --from=build /client/dist . 

# Expose port 80 (since Nginx serves on port 80 by default)
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
