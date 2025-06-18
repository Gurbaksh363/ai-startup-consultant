#!/bin/bash

# Quick setup script for AI Startup Consultant
echo "🚀 Setting up AI Startup Consultant..."

# Check if we're in the right directory
if [ ! -f "DEPLOYMENT.md" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Backend setup
echo "📦 Setting up backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env and add your API keys!"
fi

echo "📚 Installing Python dependencies..."
pip install -r requirements.txt

# Frontend setup
echo "📦 Setting up frontend..."
cd ../frontend

echo "📚 Installing Node.js dependencies..."
npm install

echo "✅ Setup complete!"
echo ""
echo "🔧 Next steps:"
echo "1. Edit backend/.env and add your API keys"
echo "2. Run 'cd backend && uvicorn main:app --reload --port 8002' in one terminal"
echo "3. Run 'cd frontend && npm run dev' in another terminal"
echo "4. Visit http://localhost:5173"
echo ""
echo "📋 For deployment instructions, see DEPLOYMENT.md"
