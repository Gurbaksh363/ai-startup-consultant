import os
import requests
from openai import OpenAI

def run_market_agent(idea: str):
    """Lightweight market research agent using direct OpenAI API calls"""
    
    api_key = os.getenv("OPENAI_API_KEY")
    api_base = os.getenv("OPENAI_API_BASE", "https://api.together.xyz/v1")
    tavily_key = os.getenv("TAVILY_API_KEY")
    
    if not api_key:
        return {"error": "OpenAI API key not configured"}
    
    # Get market data from Tavily
    market_data = ""
    if tavily_key:
        try:
            response = requests.post(
                "https://api.tavily.com/search",
                json={
                    "api_key": tavily_key,
                    "query": f"market research {idea} startup industry trends growth size",
                    "search_depth": "basic",
                    "max_results": 3
                },
                timeout=10
            )
            if response.status_code == 200:
                data = response.json()
                if 'results' in data:
                    market_data = "\n".join([f"• {r.get('title', '')}: {r.get('content', '')[:150]}..." 
                                           for r in data['results'][:3]])
        except Exception as e:
            market_data = f"Market data unavailable: {str(e)}"
    
    # Create OpenAI client
    client = OpenAI(
        api_key=api_key,
        base_url=api_base
    )
    
    prompt = f"""
    As a senior market research analyst, provide a comprehensive market analysis for: "{idea}"

    Available market data: {market_data}

    Please provide analysis in this exact format:

    ## Market Analysis

    ### Market Size & Opportunity
    [Analyze total addressable market, growth potential, market trends]

    ### Target Demographics  
    [Identify primary customer segments and their characteristics]

    ### Market Trends
    [Key industry trends driving growth and adoption]

    ### Revenue Potential
    [Estimated revenue projections and monetization strategies]

    Keep responses professional, data-driven, and actionable.
    """
    
    try:
        response = client.chat.completions.create(
            model="meta-llama/Llama-3-8b-chat-hf",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1500,
            temperature=0.7
        )
        
        return {
            "analysis": response.choices[0].message.content,
            "market_data": market_data,
            "status": "success"
        }
        
    except Exception as e:
        return {
            "error": f"Analysis failed: {str(e)}",
            "status": "error"
        }
