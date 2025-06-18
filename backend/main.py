import os
# Force the model to Together AI supported model
os.environ["OPENAI_MODEL_NAME"] = "meta-llama-3-70b-instruct"
os.environ["LITELLM_MODEL"] = "meta-llama-3-70b-instruct"

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncio
from concurrent.futures import ThreadPoolExecutor
from agents.market import run_market_agent
from agents.competitor import run_competitor_agent
from agents.validation import run_validation_agent
from agents.pitch import run_pitch_agent
from agents.outreach import run_outreach_agent
from services.appwrite_client import save_session
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Thread pool for running sync agents
executor = ThreadPoolExecutor(max_workers=5)

# Allow frontend (multiple ports for development + Vercel) to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5177",
        "http://localhost:5178",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174", 
        "http://127.0.0.1:5175",
        "http://127.0.0.1:5176",
        "http://127.0.0.1:5177",
        "http://127.0.0.1:5178",
        "http://127.0.0.1:3000",
        "*"  # Allow all origins for Vercel deployment
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class IdeaRequest(BaseModel):
    idea: str
    user_id: str = "default_user"  # Make user_id optional with default value

@app.get("/")
async def read_root():
    return {"message": "AI Startup Consultant API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "AI Startup Consultant"}

@app.post("/consult")
async def consult_idea(request: IdeaRequest):
    try:
        loop = asyncio.get_event_loop()
        
        # Run all agents concurrently using thread pool
        market_task = loop.run_in_executor(executor, run_market_agent, request.idea)
        competitor_task = loop.run_in_executor(executor, run_competitor_agent, request.idea)
        validation_task = loop.run_in_executor(executor, run_validation_agent, request.idea)
        pitch_task = loop.run_in_executor(executor, run_pitch_agent, request.idea)
        outreach_task = loop.run_in_executor(executor, run_outreach_agent, request.idea)
        
        # Wait for all results
        market = await market_task
        competitors = await competitor_task
        validation = await validation_task
        pitch = await pitch_task
        outreach = await outreach_task
        
        session = {
            "user_id": request.user_id,
            "idea": request.idea,
            "market": market,
            "competitors": competitors,
            "validation": validation,
            "pitch": pitch,
            "outreach": outreach
        }
        save_session(session)
        return session
    except Exception as e:
        import traceback
        print(f"Error in consult_idea: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# API routes for Vercel
@app.post("/api/consult")
async def api_consult_idea(request: IdeaRequest):
    return await consult_idea(request)

@app.get("/test")
async def test_endpoint():
    return {"status": "Backend is working!", "timestamp": "2024-01-01"}

# Export for Vercel
handler = app
