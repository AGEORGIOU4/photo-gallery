# Step 1: Use the official Node.js image as the base image
FROM node:14-alpine AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Use the official Nginx image to serve the application
FROM nginx:alpine

# Step 8: Copy the build output from the previous stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80 to the outside world
EXPOSE 80

# Step 10: Set environment variables for Nginx
ENV PORT=3000
ENV CHOKIDAR_USEPOLLING=true
ENV REACT_APP_UNSPLASH_ACCESS_KEY=nJ5yvMWRDgLGKUeYhnLBBG4H-wZZgevvdVFXDaFeucM
ENV REACT_APP_UNSPLASH_SECRET_KEY=nJ5yvMWRDgLGKUeYhnLBBG4H-wZZgevvdVFXDaFeucM
ENV REACT_APP_API_NINJAS_KEY=kCVCZGwLehNyuXnhL1PdH2JPufffPCbyhBuziiGs
ENV REACT_APP_WORD_ASSOCIATIONS_KEY=d7a30844-c4bd-4a57-929c-4d6885b9acbc

# Step 11: Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
