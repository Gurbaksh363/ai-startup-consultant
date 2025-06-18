import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';

const CompetitorAnalysisTest2 = () => {
  const testContent = `## Competitor Analysis

### Major Competitors

Company Name: Netflix
• Brief description: Leading global streaming service with extensive content library and original programming.
• Market share: Approximately 15% of global streaming market
• Key strengths: Original content, global reach, user experience
• Weaknesses: High content costs, increasing competition

Company Name: Amazon Prime Video
• Brief description: Streaming service bundled with Amazon Prime membership, offering movies, TV shows, and originals.
• Market share: Approximately 12% of global streaming market
• Key strengths: Integration with Prime ecosystem, competitive pricing
• Weaknesses: Complex interface, content discovery challenges

Company Name: Disney+
• Brief description: Family-focused streaming platform featuring Disney, Marvel, Star Wars, and National Geographic content.
• Market share: Approximately 10% of global streaming market
• Key strengths: Premium brand content, family appeal, global franchises
• Weaknesses: Limited adult content, narrow target demographic`;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Competitor Analysis Test 2</h1>
      <div style={{ 
        border: '2px solid #e5e7eb', 
        borderRadius: '8px', 
        padding: '1.5rem',
        backgroundColor: '#f9fafb'
      }}>
        <MarkdownRenderer content={testContent} />
      </div>
    </div>
  );
};

export default CompetitorAnalysisTest2;
