# AI Startup Consultant 🚀

A full-stack AI-powered startup consultant that provides comprehensive business analysis and actionable insights for startup ideas using CrewAI agents.

## 🎯 What It Does

Enter your startup idea and get:
- 📊 **Market Research & Analysis** - Current trends, size, and opportunities
- 🏢 **Competitor Analysis** - Identify competitors and market positioning
- ✅ **Idea Validation & Scoring** - AI-powered feasibility assessment
- 💡 **Investor Pitch Outline** - Professional pitch deck structure
- 📧 **Outreach Templates** - Email templates for investors and partners
- 📈 **Visual Insights** - Charts and data visualizations

## 🛠️ Tech Stack

### Backend
- **FastAPI** - High-performance Python web framework
- **CrewAI** - Multi-agent AI system orchestration
- **Together AI** - LLM inference (Llama 3 70B)
- **Tavily** - Real-time web search and research
- **Appwrite** - Backend-as-a-Service for data persistence

### Frontend  
- **React + Vite** - Modern frontend development
- **Chart.js** - Interactive data visualizations
- **React-Markdown** - Rich markdown rendering
- **Modern CSS** - Responsive, professional UI

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- API keys for Together AI, Tavily, and Appwrite

### Local Development
```bash
# Clone and setup backend
cd backend
pip install -r requirements.txt
cp .env.example .env  # Add your API keys
uvicorn main:app --reload --port 8002

# Setup frontend (new terminal)
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to use the application.

## 🌐 Deployment

This project is optimized for deployment on:
- **Backend**: Render (free tier)
- **Frontend**: Netlify (free tier)

**📋 See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.**

## 🔧 Configuration

Create a `.env` file in the backend directory:
```env
TOGETHER_API_KEY=your_together_ai_key
APPWRITE_ENDPOINT=your_appwrite_endpoint  
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
APPWRITE_DATABASE_ID=your_database_id
```
