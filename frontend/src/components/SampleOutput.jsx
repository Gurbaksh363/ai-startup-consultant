import React from 'react';

const SampleOutput = () => {
  const sampleData = {
    user_id: "demo_user",
    idea: "AI-powered fitness app",
    market: {
      market_analysis: "The global fitness app market is experiencing robust growth, valued at approximately $4.4 billion in 2023 and projected to reach $10.9 billion by 2028. Key growth drivers include increased health consciousness, smartphone penetration, and demand for personalized fitness solutions. The AI fitness segment specifically is emerging as a high-growth sub-market with significant opportunities for differentiation."
    },
    competitors: {
      competitor_analysis: "Main competitors include MyFitnessPal (nutrition tracking), Nike Training Club (workout programs), and Fitbod (AI-powered workout planning). However, there's a gap in the market for comprehensive AI-powered personal training that combines real-time form correction, adaptive programming, and holistic health insights. Key differentiators should focus on advanced computer vision, personalized coaching, and integration with wearable devices."
    },
    validation: {
      validation: "✅ STRONG VALIDATION SCORE: 8.5/10\n\n• Market Size: Large and growing ($4.4B+)\n• Problem-Solution Fit: High demand for personalized fitness\n• Technical Feasibility: AI/ML technologies are mature\n• Monetization Potential: Multiple revenue streams (subscriptions, premium features, partnerships)\n• Scalability: Cloud-based SaaS model\n\nRecommendation: PROCEED with development. Focus on MVP with core AI features first."
    },
    pitch: {
      pitch: "🚀 **FitAI - Your Personal AI Fitness Coach**\n\n**The Problem:**\n• 73% of people abandon fitness routines within 6 months\n• Lack of personalized guidance leads to poor form and injuries\n• Generic workout plans don't adapt to individual progress\n\n**Our Solution:**\n• AI-powered form correction using computer vision\n• Adaptive workout plans that evolve with your progress\n• Real-time coaching and motivation\n\n**Market Opportunity:**\n• $4.4B fitness app market growing at 20% CAGR\n• 230M+ potential users globally\n\n**Business Model:**\n• Freemium: Basic workouts free, AI coaching premium ($9.99/month)\n• B2B partnerships with gyms and corporate wellness\n\n**Ask:** $2M seed funding for 18-month runway to launch and scale"
    },
    outreach: {
      outreach: "Subject: 🚀 Revolutionizing Fitness with AI - Partnership Opportunity\n\nHi [Name],\n\nI hope this email finds you well! I'm reaching out because I believe FitAI could be a perfect fit for [Company/Gym Name]'s commitment to member success and innovation.\n\nFitAI is an AI-powered fitness app that provides personalized coaching, real-time form correction, and adaptive workout plans. We're seeing incredible results:\n• 40% higher workout completion rates\n• 60% reduction in form-related injuries\n• 85% user satisfaction score\n\nI'd love to explore how we could partner to:\n✓ Enhance your members' workout experience\n✓ Reduce trainer workload with AI assistance\n✓ Generate additional revenue streams\n\nWould you be available for a 15-minute call next week to discuss how FitAI could benefit [Company Name]?\n\nBest regards,\n[Your Name]\nFounder, FitAI\n📧 [email] | 📱 [phone]\n\nP.S. I'd be happy to provide a free demo for your team!"
    }
  };

  return (
    <div className="sample-output-container">
      <div className="demo-banner">
        <h3>🎯 Sample Analysis Output</h3>
        <p>Here's what you can expect when you submit your startup idea:</p>
      </div>
      
      <div className="ai-response">
        <div className="response-header">
          <h3>🚀 AI Analysis for: "{sampleData.idea}"</h3>
        </div>
        
        <div className="analysis-sections">
          <div className="analysis-card market">
            <div className="card-header">
              <span className="icon">📊</span>
              <h4>Market Analysis</h4>
            </div>
            <div className="card-content">
              <p>{sampleData.market.market_analysis}</p>
            </div>
          </div>

          <div className="analysis-card competitors">
            <div className="card-header">
              <span className="icon">🏢</span>
              <h4>Competitor Analysis</h4>
            </div>
            <div className="card-content">
              <p>{sampleData.competitors.competitor_analysis}</p>
            </div>
          </div>

          <div className="analysis-card validation">
            <div className="card-header">
              <span className="icon">✅</span>
              <h4>Idea Validation</h4>
            </div>
            <div className="card-content">
              <pre className="validation-content">{sampleData.validation.validation}</pre>
            </div>
          </div>

          <div className="analysis-card pitch">
            <div className="card-header">
              <span className="icon">💡</span>
              <h4>Pitch Outline</h4>
            </div>
            <div className="card-content">
              <pre className="pitch-content">{sampleData.pitch.pitch}</pre>
            </div>
          </div>

          <div className="analysis-card outreach">
            <div className="card-header">
              <span className="icon">📧</span>
              <h4>Outreach Email</h4>
            </div>
            <div className="card-content">
              <div className="email-template">
                <pre className="email-content">{sampleData.outreach.outreach}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleOutput;
