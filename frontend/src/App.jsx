import React, { useState } from 'react';
import ChatUI from './components/ChatUI';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <header className="app-header">
        <div className="header-content">
          <h1 className="main-title">
            <span className="title-emoji">🚀</span>
            AI Startup Consultant
            <span className="title-emoji">💡</span>
          </h1>
          <p className="subtitle">
            Get comprehensive AI-powered analysis for your startup ideas
          </p>
        </div>
      </header>
      
      <ChatUI />
    </div>
  );
}

export default App;
