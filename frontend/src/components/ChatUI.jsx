import React, { useState } from 'react';
import { submitIdea } from '../api/consult';
import SampleOutput from './SampleOutput';
import MarkdownRenderer from './MarkdownRenderer';
import DataVisualization from './DataVisualization';

function ChatUI() {
  const [idea, setIdea] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSample, setShowSample] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idea.trim()) return;
    
    setLoading(true);
    const userMessage = { sender: 'user', text: idea, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const response = await submitIdea(idea);
      const aiMessage = { 
        sender: 'ai', 
        data: response, 
        timestamp: new Date(),
        idea: idea
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { 
        sender: 'ai', 
        error: true,
        text: 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    
    setIdea('');
    setLoading(false);
  };

  const formatAIResponse = (data, idea) => {
    if (!data) return null;

    return (
      <div className="ai-response">
        <div className="response-header">
          <h3>🚀 AI Analysis for: "{idea}"</h3>
        </div>
        
        <div className="analysis-sections">
          {data.market && (
            <div className="analysis-card market">
              <div className="card-header">
                <span className="icon">📊</span>
                <h4>Market Analysis</h4>
              </div>
              <div className="card-content">
                {data.market.market_analysis ? (
                  <MarkdownRenderer 
                    content={data.market.market_analysis} 
                    className="market-content"
                  />
                ) : (
                  <p className="no-data">No market analysis available</p>
                )}
              </div>
            </div>
          )}

          {data.competitors && (
            <div className="analysis-card competitors">
              <div className="card-header">
                <span className="icon">🏢</span>
                <h4>Competitor Analysis</h4>
              </div>
              <div className="card-content">
                {data.competitors.competitor_analysis ? (
                  <MarkdownRenderer 
                    content={data.competitors.competitor_analysis} 
                    className="competitors-content"
                  />
                ) : (
                  <p className="no-data">No competitor analysis available</p>
                )}
              </div>
            </div>
          )}

          {data.validation && (
            <div className="analysis-card validation">
              <div className="card-header">
                <span className="icon">✅</span>
                <h4>Idea Validation</h4>
              </div>
              <div className="card-content">
                {data.validation.validation ? (
                  <MarkdownRenderer 
                    content={data.validation.validation} 
                    className="validation-content"
                  />
                ) : (
                  <p className="no-data">No validation analysis available</p>
                )}
              </div>
            </div>
          )}

          {data.pitch && (
            <div className="analysis-card pitch">
              <div className="card-header">
                <span className="icon">💡</span>
                <h4>Pitch Outline</h4>
              </div>
              <div className="card-content">
                {data.pitch.pitch ? (
                  <MarkdownRenderer 
                    content={data.pitch.pitch} 
                    className="pitch-content"
                  />
                ) : (
                  <p className="no-data">No pitch outline available</p>
                )}
              </div>
            </div>
          )}

          {data.outreach && (
            <div className="analysis-card outreach">
              <div className="card-header">
                <span className="icon">📧</span>
                <h4>Outreach Templates</h4>
              </div>
              <div className="card-content">
                {data.outreach.outreach ? (
                  <MarkdownRenderer 
                    content={data.outreach.outreach} 
                    className="outreach-content"
                  />
                ) : (
                  <p className="no-data">No outreach templates available</p>
                )}
              </div>
            </div>
          )}
        </div>
        
        <DataVisualization analysisData={data} idea={idea} />
      </div>
    );
  };

  return (
    <>
      <div className="chat-header">
        <h2>💬 AI Startup Consultant</h2>
        <p>Get comprehensive analysis for your startup idea</p>
      </div>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <div className="welcome-content">
              <h3>👋 Welcome to Your AI Startup Consultant!</h3>
              <p>Get comprehensive AI-powered analysis for your startup ideas in minutes.</p>
              <div className="features-grid">
                <div className="feature-item">
                  <span className="feature-icon">📊</span>
                  <span>Market Research & Trends</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🏢</span>
                  <span>Competitor Analysis</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span>Idea Validation & Scoring</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💡</span>
                  <span>Investor Pitch Outline</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📧</span>
                  <span>Outreach Email Templates</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🤖</span>
                  <span>Powered by Advanced AI</span>
                </div>
              </div>
              
              <div className="sample-toggle">
                <button 
                  onClick={() => setShowSample(!showSample)}
                  className="sample-button"
                >
                  {showSample ? '🔼 Hide Sample Analysis' : '🔽 View Sample Analysis'}
                </button>
              </div>
              
              {showSample && <SampleOutput />}
              
              <div className="getting-started">
                <h4>🚀 Ready to get started?</h4>
                <p>Simply describe your startup idea below and let our AI agents analyze it for you!</p>
                <div className="example-ideas">
                  <strong>Example ideas:</strong>
                  <ul>
                    <li>"AI-powered personal fitness coach app"</li>
                    <li>"Sustainable food delivery service for urban areas"</li>
                    <li>"Blockchain-based freelancer marketplace"</li>
                    <li>"AR/VR platform for remote team collaboration"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.sender === 'user' ? (
                  <div className="user-message">
                    <div className="message-content">
                      <p>{msg.text}</p>
                    </div>
                    <div className="message-time">
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ) : (
                  <div className="ai-message">
                    {msg.error ? (
                      <div className="error-message">
                        <span className="error-icon">⚠️</span>
                        <p>{msg.text}</p>
                      </div>
                    ) : (
                      formatAIResponse(msg.data, msg.idea)
                    )}
                    <div className="message-time">
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {loading && (
          <div className="loading-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>AI agents are analyzing your startup idea...</p>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <textarea
            value={idea}
            onChange={e => setIdea(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="💡 Describe your startup idea in detail... (e.g., AI-powered fitness app, sustainable food delivery service, blockchain marketplace)"
            disabled={loading}
            className="idea-input"
            rows="3"
          />
          <button type="submit" disabled={loading || !idea.trim()} className="send-button">
            <span className="button-icon">{loading ? '⏳' : '🚀'}</span>
            <span className="button-text">{loading ? 'Analyzing...' : 'Analyze Idea'}</span>
          </button>
        </div>
      </form>
    </>
  );
}

export default ChatUI;
