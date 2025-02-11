# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Add environment variables
ARG FIREBASE_PRIVATE_KEY
ENV FIREBASE_PRIVATE_KEY=$FIREBASE_PRIVATE_KEY

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 