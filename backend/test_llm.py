import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

def test_direct_llm():
    load_dotenv()
    openai_api_key = os.getenv("OPENAI_API_KEY")
    openai_api_base = os.getenv("OPENAI_API_BASE")
    
    print(f"API Key: {openai_api_key[:10] if openai_api_key else 'None'}...")
    print(f"API Base: {openai_api_base}")
    
    if not openai_api_key:
        print("API key not found!")
        return
    
    llm = ChatOpenAI(
        model="meta-llama/Llama-3-8b-chat-hf",
        api_key=openai_api_key,
        base_url=openai_api_base,
        temperature=0.7,
        max_tokens=1000
    )
    
    try:
        response = llm.invoke("Analyze the market opportunity for an AI food delivery optimization app. Provide specific market size data, target customers, and growth projections.")
        print("LLM Response:")
        print(response.content)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_direct_llm()
