from langchain_openai import ChatOpenAI
import os

def run_outreach_agent(idea: str):
    openai_api_key = os.getenv("OPENAI_API_KEY")
    openai_api_base = os.getenv("OPENAI_API_BASE")
    if not openai_api_key:
        return {"error": "OpenAI/Together AI API key not set"}
    
    try:
        # Create LLM instance for Together AI
        llm = ChatOpenAI(
            model="meta-llama/Llama-3-8b-chat-hf",
            api_key=openai_api_key,
            base_url=openai_api_base,
            temperature=0.7,
            max_tokens=2000
        )
        
        prompt = f"""
        You are a growth marketing expert and sales professional with 8+ years of experience at high-growth startups. You've written thousands of outreach emails with consistently high response rates (25%+). Create professional outreach email templates for: "{idea}"
        
        REQUIRED OUTPUT FORMAT:
        **CUSTOMER OUTREACH EMAIL TEMPLATE:**
        Subject: [compelling subject line]
        
        Hi [First Name],
        
        [Email body that identifies pain points, introduces solution, shows value, and includes clear CTA]
        
        Best regards,
        [Your Name]
        
        **PARTNERSHIP OUTREACH EMAIL TEMPLATE:**
        Subject: [compelling subject line]
        
        Hi [First Name],
        
        [Email body focused on mutual benefits, partnership opportunities, and collaboration]
        
        Best regards,
        [Your Name]
        
        **INVESTOR OUTREACH EMAIL TEMPLATE:**
        Subject: [compelling subject line]
        
        Hi [First Name],
        
        [Email body highlighting market opportunity, traction, and investment potential]
        
        Best regards,
        [Your Name]
        
        Make each email template compelling, concise, action-oriented, and personalized for its target audience.
        """
        
        response = llm.invoke(prompt)
        return {"outreach": response.content}
        
    except Exception as e:
        print(f"Error in outreach agent: {str(e)}")
        return {"outreach": f"Error creating outreach emails: {str(e)}"}
