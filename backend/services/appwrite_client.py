import os
from appwrite.client import Client
from appwrite.services.databases import Databases

# Appwrite client integration 
def save_session(session: dict):
    try:
        endpoint = os.getenv("APPWRITE_ENDPOINT")
        project = os.getenv("APPWRITE_PROJECT_ID")
        api_key = os.getenv("APPWRITE_API_KEY")
        database_id = os.getenv("APPWRITE_DATABASE_ID")
        collection_id = os.getenv("APPWRITE_COLLECTION_ID")
        
        if not all([endpoint, project, api_key, database_id, collection_id]):
            print("Appwrite config missing. Session not saved.")
            return
            
        client = Client()
        client.set_endpoint(endpoint).set_project(project).set_key(api_key)
        db = Databases(client)
        
        # Create a simplified document structure
        document_data = {
            "userId": session.get("user_id", "default_user"),
            "idea": session.get("idea", ""),
            "results": str(session)  # Store the full session as a string
        }
        
        db.create_document(database_id, collection_id, document_id="unique()", data=document_data)
        print("Session saved to Appwrite.")
    except Exception as e:
        print(f"Failed to save session to Appwrite: {str(e)}")
        # Don't raise the exception - just log and continue
