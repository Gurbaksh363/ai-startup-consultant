# AI Startup Consultant - Deployment Guide

This guide will help you deploy the AI Startup Consultant application using **Render** (for the backend) and **Netlify** (for the frontend).

## Prerequisites

1. **GitHub account** with your project repository
2. **Render account** (free at [render.com](https://render.com))
3. **Netlify account** (free at [netlify.com](https://netlify.com))
4. **Environment variables** from your local setup

## Backend Deployment on Render

### Step 1: Prepare Environment Variables

Before deploying, ensure you have these environment variables ready:

```bash
TOGETHER_API_KEY=your_together_ai_key
APPWRITE_ENDPOINT=your_appwrite_endpoint
APPWRITE_PROJECT_ID=your_appwrite_project_id
APPWRITE_API_KEY=your_appwrite_api_key
APPWRITE_DATABASE_ID=your_appwrite_database_id
OPENAI_MODEL_NAME=meta-llama-3-70b-instruct
LITELLM_MODEL=meta-llama-3-70b-instruct
```

### Step 2: Deploy Backend to Render

1. **Push your code to GitHub** (if not already done)

2. **Create a new Web Service on Render:**
   - Go to [render.com](https://render.com) and sign in
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your project

3. **Configure the service:**
   - **Name**: `ai-startup-consultant-backend` (or your preferred name)
   - **Environment**: `Python 3`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Python Version Configuration:**
   - Render will automatically detect Python 3.12 from the `runtime.txt` file
   - If you encounter Python version errors, ensure the `backend/runtime.txt` file contains: `python-3.12.3`

5. **Add Environment Variables:**
   - In the Render dashboard, go to your service
   - Click "Environment" tab
   - Add all the environment variables listed above

6. **Deploy:**
   - Click "Create Web Service"
   - Wait for the deployment to complete (this may take 10-15 minutes)
   - Note your backend URL (e.g., `https://your-service-name.onrender.com`)

### Step 3: Test Backend

Once deployed, test your backend:
```bash
curl https://your-backend-url.onrender.com/health
```

### 🔧 Troubleshooting Python Version Issues

If you see errors like "Could not find a version that satisfies the requirement crewai", it means Render is using an incompatible Python version:

1. **Check runtime.txt**: Ensure `backend/runtime.txt` contains `python-3.12.3`
2. **Update requirements**: The current requirements.txt uses `crewai>=0.130.0` which requires Python 3.10+
3. **Force rebuild**: In Render dashboard, go to "Manual Deploy" → "Clear build cache & deploy"

**Supported Python versions on Render:**
- Python 3.8, 3.9, 3.10, 3.11, 3.12
- We recommend Python 3.12.3 for best compatibility

## Frontend Deployment on Netlify

### Step 1: Update Frontend Configuration

1. **Update the API URL** in your frontend:
   - Edit `frontend/src/api/consult.js`
   - Replace `'https://your-backend-name.onrender.com'` with your actual Render backend URL

2. **Build the frontend locally** (optional, for testing):
   ```bash
   cd frontend
   npm install
   npm run build
   ```

### Step 2: Deploy Frontend to Netlify

**Option A: GitHub Integration (Recommended)**

1. **Push your updated frontend to GitHub**

2. **Create a new site on Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click "New site from Git"
   - Choose "GitHub" and authorize Netlify
   - Select your repository

3. **Configure build settings:**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

4. **Deploy:**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

**Option B: Manual Upload**

1. **Build locally:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy manually:**
   - Go to Netlify dashboard
   - Drag and drop the `frontend/dist` folder to Netlify

### Step 3: Configure Custom Domain (Optional)

- In Netlify dashboard, go to "Domain settings"
- Add your custom domain or use the provided Netlify subdomain

## Environment Configuration Summary

### Backend (.env file for local development)
```bash
TOGETHER_API_KEY=your_together_ai_key
APPWRITE_ENDPOINT=your_appwrite_endpoint
APPWRITE_PROJECT_ID=your_appwrite_project_id
APPWRITE_API_KEY=your_appwrite_api_key
APPWRITE_DATABASE_ID=your_appwrite_database_id
OPENAI_MODEL_NAME=meta-llama-3-70b-instruct
LITELLM_MODEL=meta-llama-3-70b-instruct
```

### Frontend (automatically configured)
- Production API URL points to your Render backend
- Development API URL points to `http://127.0.0.1:8002`

## Troubleshooting

### Backend Issues

1. **Build fails on Render:**
   - Check the build logs for specific errors
   - Ensure all dependencies are in `requirements.txt`
   - Verify Python version compatibility

2. **Backend returns 500 errors:**
   - Check environment variables are set correctly
   - Review application logs in Render dashboard
   - Ensure external services (Together AI, Appwrite) are accessible

3. **CORS errors:**
   - Verify frontend URL is allowed in CORS settings
   - Check that `*` is included in allowed origins for broad compatibility

### Frontend Issues

1. **API calls fail:**
   - Verify the backend URL in `consult.js` is correct
   - Check that backend is responding to health checks
   - Ensure CORS is properly configured on backend

2. **Build fails on Netlify:**
   - Check Node.js version compatibility
   - Verify all dependencies are in `package.json`
   - Review build logs for specific errors

## Monitoring and Logs

- **Render**: View logs in your service dashboard
- **Netlify**: Check function logs and deploy logs in site dashboard
- **Performance**: Both platforms provide basic analytics

## Scaling and Limits

### Render Free Tier
- 750 hours/month of runtime
- Service sleeps after 15 minutes of inactivity
- 512 MB RAM limit

### Netlify Free Tier
- 100 GB bandwidth/month
- 300 build minutes/month
- Unlimited personal and commercial projects

## Local Development

To run locally after deployment:

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8002

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173` with the backend at `http://127.0.0.1:8002`.
