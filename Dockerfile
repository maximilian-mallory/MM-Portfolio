# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for both backend and frontend
COPY ./portfolio/package*.json ./portfolio/
COPY ./portfolio /app
# Install dependencies for the backend
RUN npm install --prefix ./backend

# Install dependencies for the frontend (if needed)
RUN npm install
# Copy the full app directory (both backend and frontend)
COPY ./portfolio /app

# Expose the port for your backend
EXPOSE 3000 5000

# Command to start your server (backend)
CMD ["npm", "start", "--prefix", "./backend"]
