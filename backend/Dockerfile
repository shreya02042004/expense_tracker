# Step 1: Use official Node.js image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy rest of the backend files
COPY . .

# Step 6: Expose backend port (example: 5000)
EXPOSE 5000

# Step 7: Run the app
CMD ["npm", "start"]
