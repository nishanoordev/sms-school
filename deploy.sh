#!/bin/bash

# School Management System Deployment Script
# Run this on your Raspberry Pi

echo "🚀 Starting Deployment..."

# 1. Install dependencies for Backend
echo "📦 Installing Backend dependencies..."
cd backend
npm install

# 2. Setup Database (Prisma)
echo "🗄️ Setting up Database..."
npx prisma generate
npx prisma db push

# 3. Build Backend
echo "🏗️ Building Backend..."
npm run build

# 4. Start/Restart Backend with PM2
echo "🔄 Starting Backend with PM2..."
pm2 delete school-backend || true
pm2 start dist/index.js --name school-backend

# 5. Install dependencies for Frontend
echo "📦 Installing Frontend dependencies..."
cd ..
npm install

# 6. Build Frontend
echo "🏗️ Building Frontend..."
npm run build

# 7. Update Nginx configuration (if needed)
# Assumes Nginx is already pointing to the /dist folder or similar
# sudo cp -r dist/* /var/www/html/

echo "✅ Deployment Complete!"
echo "Backend is running on port 5000"
echo "Frontend is built and ready in /dist"
