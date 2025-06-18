from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os
import requests

def run_market_agent_simple(idea: str):
    load_dotenv()
    openai_api_key = os.getenv("OPENAI_API_KEY")
    openai_api_base = os.getenv("OPENAI_API_BASE")
    tavily_api_key = os.getenv("TAVILY_API_KEY")
    
    if not openai_api_key:
        return {"error": "OpenAI/Together AI API key not set"}
    if not tavily_api_key:
        return {"error": "Tavily API key not set"}
    
    try:
        # Get market research data from Tavily
        market_data = ""
        try:
            response = requests.post(
                "https://api.tavily.com/search",
                json={
                    "api_key": tavily_api_key,
                    "query": f"market research analysis for {idea} startup industry trends size growth",
                    "search_depth": "advanced",
                    "max_results": 5
                },
                timeout=10
            )
            if response.status_code == 200:
                data = response.json()
                if 'results' in data:
                    market_data = "\n".join([f"- {result.get('title', '')}: {result.get('content', '')[:200]}..." 
                                           for result in data['results'][:3]])
        except Exception as e:
            market_data = f"Market research data unavailable: {str(e)}"
        
        # Create LLM instance
        llm = ChatOpenAI(
            model="meta-llama/Llama-3-8b-chat-hf",
            api_key=openai_api_key,
            base_url=openai_api_base,
            temperature=0.7,
            max_tokens=2000
        )
        
        prompt = f"""
        You are a senior market research analyst. Analyze the market opportunity for: "{idea}"
        
        Market research data: {market_data}
        
        REQUIRED OUTPUT FORMAT:
        **Market Size & Growth:**
        - Total Addressable Market (TAM): $X billion
        - Compound Annual Growth Rate (CAGR): X%
        - Market projections for next 5 years
        
        **Target Customers:**
        - Primary customer segments
        - Demographics and characteristics
        - Customer pain points and needs
        
        **Market Trends:**
        - Key industry trends driving growth
        - Emerging opportunities
        - Technology disruptions
        
        **Market Entry:**
        - Main barriers to entry
        - Competitive landscape overview
        - Geographic opportunities
        
        **Revenue Potential:**
        - Pricing models in the market
        - Revenue streams potential
        - Market timing assessment
        
        Provide specific numbers, percentages, and concrete data points where possible.
        """
        
        response = llm.invoke(prompt)
        return {"market_analysis": response.content}
        
    except Exception as e:
        print(f"Error in market agent: {str(e)}")
        return {"market_analysis": f"Error analyzing market: {str(e)}"}
