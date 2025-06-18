from langchain_openai import ChatOpenAI
import os

def run_pitch_agent(idea: str):
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
        You are a former investment banker turned startup advisor who has helped 200+ startups raise over $500M in funding. Create a compelling pitch for: "{idea}"
        
        REQUIRED OUTPUT FORMAT:
        **1. Problem Statement**
        - Clear description of the problem being solved
        - Target customer pain points
        - Market size affected by this problem
        
        **2. Solution Overview**
        - How your product/service solves the problem
        - Unique value proposition
        - Key features and benefits
        
        **3. Market Opportunity**
        - Total Addressable Market (TAM): $X billion
        - Serviceable Addressable Market (SAM): $X billion
        - Market growth rate and trends
        
        **4. Business Model**
        - Revenue streams (subscription, transaction, etc.)
        - Pricing strategy and unit economics
        - Customer acquisition cost and lifetime value
        
        **5. Competitive Advantage**
        - What makes this solution unique
        - Barriers to entry and defensibility
        - Intellectual property or moats
        
        **6. Go-to-Market Strategy**
        - Customer acquisition channels
        - Sales and marketing approach
        - Partnership opportunities
        
        **7. Financial Projections**
        - 3-year revenue projections
        - Key financial metrics and milestones
        - Path to profitability
        
        **8. Team & Execution**
        - Key team roles needed
        - Expertise required
        - Execution timeline and milestones
        
        **9. Funding Requirements**
        - Funding amount needed
        - Use of funds breakdown
        - Expected ROI for investors
        
        **10. Call to Action**
        - Next steps for interested investors
        - Contact information and follow-up
        
        Make it compelling, specific, and investor-focused with concrete numbers where possible.
        """
        
        response = llm.invoke(prompt)
        return {"pitch": response.content}
        
    except Exception as e:
        print(f"Error in pitch agent: {str(e)}")
        return {"pitch": f"Error creating pitch: {str(e)}"}
