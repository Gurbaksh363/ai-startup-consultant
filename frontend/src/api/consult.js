// API call to backend for consulting
const API_URL = import.meta.env.PROD 
  ? 'https://your-backend-name.onrender.com'  // Replace with your Render backend URL
  : 'http://127.0.0.1:8002';

export async function submitIdea(idea) {
  try {
    const res = await fetch(`${API_URL}/consult`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea, user_id: 'demo-user' })
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
