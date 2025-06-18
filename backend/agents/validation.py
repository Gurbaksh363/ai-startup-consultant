from langchain_openai import ChatOpenAI
import os

def run_validation_agent(idea: str):
    openai_api_key = os.getenv("OPENAI_API_KEY")
    openai_api_base = os.getenv("OPENAI_API_BASE")
    if not openai_api_key:
        return {"error": "OpenAI/Together AI API key not set"}
    
    try:
        # Create LLM instance for Together AI with provider prefix
        llm = ChatOpenAI(
            model="meta-llama/Llama-3-8b-chat-hf",
            api_key=openai_api_key,
            base_url=openai_api_base,
            temperature=0.7,
            max_tokens=2000
        )
        
        prompt = f"""
        You are an experienced startup consultant and venture capitalist with 15+ years of experience evaluating startup ideas.
        
        Validate the startup idea: "{idea}"
        
        REQUIRED OUTPUT FORMAT:
        **Idea Overview:**
        - Clear problem statement being solved
        - Target customer and use case
        - Proposed solution summary
        
        **Market Validation (Score: X/10):**
        - Market size and growth potential
        - Customer demand evidence
        - Market timing assessment
        
        **Technical Feasibility (Score: X/10):**
        - Technical complexity assessment
        - Required resources and expertise
        - Development timeline estimate
        
        **Business Model (Score: X/10):**
        - Revenue model viability
        - Unit economics potential
        - Scalability assessment
        
        **Competition & Differentiation (Score: X/10):**
        - Competitive advantage analysis
        - Barriers to entry
        - Defensibility factors
        
        **Risk Assessment:**
        - Top 3 risks and mitigation strategies
        - Regulatory or compliance considerations
        - Market adoption challenges
        
        **Overall Validation Score: X/10**
        **Recommendation:** PROCEED/PIVOT/STOP with specific reasoning
        
        **Next Steps:**
        - 3 specific actions to validate further
        - Key metrics to track
        - Timeline for validation
        
        Provide specific scores, concrete recommendations, and actionable insights.
        """
        
        response = llm.invoke(prompt)
        return {"validation": response.content}
        
    except Exception as e:
        print(f"Error in validation agent: {str(e)}")
        return {"validation": f"Error analyzing idea: {str(e)}"}
