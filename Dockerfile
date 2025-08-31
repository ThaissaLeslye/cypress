# Use an official Node.js image.
# Using a specific version is recommended for consistency.
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies (including Cypress)
RUN npm install

# Copy the rest of your application code
COPY . .

# The CMD is not strictly needed for Jenkins, but good practice
CMD ["npx", "cypress", "run"]