# Backend for AI Startup Consultant

This backend uses FastAPI, CrewAI, Tavily, and Appwrite SDK to orchestrate intelligent agents for startup consulting tasks.

## Features
- Receives startup ideas from frontend
- Runs agents (Market Research, Competitor Analysis, Validation, Pitch, Outreach)
- Uses Tavily for real-time web data
- Stores results in Appwrite
- Exposes REST API endpoints for frontend

## Setup
1. Create a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install fastapi uvicorn appwrite crewai tavily-sdk
   ```
3. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

## Project Structure
- `main.py`: FastAPI app entry point
- `agents/`: Agent definitions
- `services/`: Tavily & Appwrite integration
- `models/`: Pydantic models
