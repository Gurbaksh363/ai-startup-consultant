# AI Startup Consultant 🚀

This project is a full-stack AI-powered startup consultant that provides comprehensive business analysis for startup ideas.

## Features
- 📊 **Market Research & Trends** - Real-time market analysis
- 🏢 **Competitor Analysis** - Identify and analyze competitors
- ✅ **Idea Validation & Scoring** - AI-powered validation
- 💡 **Investor Pitch Outline** - Generate compelling pitch decks
- 📧 **Outreach Email Templates** - Professional outreach content
- 📈 **Data Visualizations** - Charts and insights

## Tech Stack
- **Backend:** Python, FastAPI, CrewAI, Tavily, Appwrite
- **Frontend:** React, Vite, Chart.js, React-Markdown

## Deployment
This project is optimized for **Vercel** deployment with serverless functions.

### Environment Variables Required:
```env
TAVILY_API_KEY=your_tavily_key
OPENAI_API_KEY=your_together_ai_key
OPENAI_API_BASE=https://api.together.xyz/v1
APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_COLLECTION_ID=your_collection_id
```

## Local Development
```bash
# Backend
cd backend && uvicorn main:app --reload --port 8001

# Frontend  
cd frontend && npm run dev
```

See `/backend/README.md` and `/frontend/README.md` for detailed setup instructions.
