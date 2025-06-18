# Competitor Analysis Agent using CrewAI and Tavily
from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI
import os
import requests

def run_competitor_agent(idea: str):
    openai_api_key = os.getenv("OPENAI_API_KEY")
    openai_api_base = os.getenv("OPENAI_API_BASE")
    tavily_api_key = os.getenv("TAVILY_API_KEY")
    
    if not openai_api_key:
        return {"error": "OpenAI/Together AI API key not set"}
    if not tavily_api_key:
        return {"error": "Tavily API key not set"}
    
    try:
        # Get competitor data from Tavily
        competitor_data = ""
        try:
            response = requests.post(
                "https://api.tavily.com/search",
                json={
                    "api_key": tavily_api_key,
                    "query": f"{idea} competitors analysis competitive landscape companies startups",
                    "search_depth": "advanced",
                    "max_results": 5
                },
                timeout=10
            )
            if response.status_code == 200:
                data = response.json()
                if 'results' in data:
                    competitor_data = "\n".join([f"- {result.get('title', '')}: {result.get('content', '')[:200]}..." 
                                               for result in data['results'][:3]])
        except Exception as e:
            competitor_data = f"Competitor research data unavailable: {str(e)}"
        
        # Create LLM instance for Together AI with provider prefix
        llm = ChatOpenAI(
            model="together_ai/meta-llama/Llama-3-8b-chat-hf",
            api_key=openai_api_key,
            base_url=openai_api_base,
            temperature=0.7,
            max_tokens=2000
        )
        
        agent = Agent(
            role="Competitive Intelligence Analyst",
            goal=f"Analyze the competitive landscape for '{idea}' and identify key competitors, their strategies, and market positioning.",
            backstory="You are a competitive intelligence specialist with 10+ years of experience. You excel at identifying competitors, analyzing their strategies, and finding market opportunities.",
            verbose=True,
            llm=llm,
            allow_delegation=False,
            max_iter=1
        )
        
        task = Task(
            description=f"""
            Analyze the competitive landscape for: "{idea}"
            
            Competitor research data: {competitor_data}
            
            REQUIRED OUTPUT FORMAT:
            **Direct Competitors:**
            - Company Name 1: Brief description, key features, market position
            - Company Name 2: Brief description, key features, market position
            - Company Name 3: Brief description, key features, market position
            
            **Indirect Competitors:**
            - Alternative solutions and substitute products
            - Traditional approaches being disrupted
            
            **Competitive Analysis:**
            - Strengths and weaknesses of each competitor
            - Pricing models and business strategies
            - Market share and funding information
            
            **Market Gaps:**
            - Underserved customer segments
            - Feature gaps in existing solutions
            - Opportunities for differentiation
            
            **Competitive Strategy:**
            - Recommended positioning strategy
            - Key differentiators to focus on
            - Competitive advantages to build
            
            Provide specific company names, concrete details, and actionable insights.
            """,
            expected_output="A detailed competitive analysis with specific competitor names, their strategies, market positioning, and clear opportunities for differentiation.",
            agent=agent
        )
        
        crew = Crew(
            agents=[agent], 
            tasks=[task],
            verbose=True
        )
        
        result = crew.kickoff()
        
        # Extract the actual output content
        if hasattr(result, 'raw'):
            output = result.raw
        elif hasattr(result, 'output'):
            output = result.output
        else:
            output = str(result)
            
        return {"competitor_analysis": output}
        
    except Exception as e:
        print(f"Error in competitor agent: {str(e)}")
        return {"competitor_analysis": f"Error analyzing competitors: {str(e)}"}
