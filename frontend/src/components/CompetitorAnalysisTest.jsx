import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';

const CompetitorAnalysisTest = () => {
  const testContent = `Market Analysis: AR/VR Platform for Remote Team Collaboration **Market Size & Growth:** * Total Addressable Market (TAM): $1.34 billion (by 2027) * Compound Annual Growth Rate (CAGR): 23.1% (2023-2027) * Market projections for next 5 years: + 2023: $32.5 billion (current market size) + 2024: $41.6 billion (18.3% growth) + 2025: $53.3 billion (28.4% growth) + 2026: $68.9 billion (29.5% growth) + 2027: $1.34 billion (94.6% growth) **Target Customers:** * Primary customer segments: + Remote teams and organizations in industries such as software development, marketing, finance, and consulting + Companies with distributed workforces or teams working on collaborative projects * Demographics and characteristics: + Mid-to-large-sized enterprises with 50+ employees + Tech-savvy teams with a focus on innovation and collaboration * Customer pain points and needs: + Effective communication and collaboration across remote teams + Improved productivity and efficiency in remote work environments + Enhanced team engagement and motivation + Secure and reliable platform for remote team collaboration **Market Trends:** * Key industry trends driving growth: + Increasing adoption of remote work and digital collaboration tools + Growing demand for immersive and interactive experiences in the workplace + Advancements in AR/VR technologies, including improved hardware and software * Emerging opportunities:`;

  const pitchTestContent = `## Phase 1: Foundation (Months 1-3)

### Team Building

- Hire 3 senior AI consultants
- Recruit VP of Sales  
- Onboard technical lead

### Product Development

- Complete MVP of consulting platform
- Develop standardized methodology
- Create assessment frameworks

### Market Validation

- Launch pilot with 5 enterprise clients
- Gather feedback and iterate
- Establish pricing models

### Investment Requirements

1. Series A funding target: $2M
2. Use of funds breakdown:
   - Team expansion: 40%
   - Product development: 30%
   - Marketing and sales: 20%
   - Operations: 10%

### Expected Outcomes

1. Validated business model
2. Initial client base established
3. Proven methodology developed`;

  return (
    <div style={{ 
      maxWidth: '1000px', 
      margin: '2rem auto', 
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ marginBottom: '2rem', color: '#1e40af' }}>
        🔧 AI Output Formatting Test (Real Example)
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem', color: '#dc2626' }}>
            ❌ Raw AI Output (Before)
          </h3>
          <div style={{
            padding: '1rem',
            backgroundColor: '#fef2f2',
            border: '2px solid #fee2e2',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {testContent}
            </pre>
          </div>
          <p style={{ 
            marginTop: '0.5rem', 
            fontSize: '0.8rem', 
            color: '#dc2626',
            fontStyle: 'italic'
          }}>
            Issues: No proper headings, missing line breaks, poor formatting
          </p>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '1rem', color: '#059669' }}>
            ✅ Processed Output (After)
          </h3>
          <div style={{
            border: '2px solid #d1fae5',
            borderRadius: '8px',
            backgroundColor: '#f0fdf4',
            padding: '1rem',
            maxHeight: '450px',
            overflowY: 'auto'
          }}>
            <MarkdownRenderer content={testContent} className="market-content" />
          </div>
          <p style={{ 
            marginTop: '0.5rem', 
            fontSize: '0.8rem', 
            color: '#059669',
            fontStyle: 'italic'
          }}>
            Fixed: Proper headers, clean formatting, good spacing
          </p>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '1rem', color: '#1e40af' }}>
          🎯 What to Check:
        </h4>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li>✅ Numbered lists should display properly without breaking headers</li>
          <li>✅ No asterisk symbols should appear in formatted text</li>
          <li>✅ Headers should be properly spaced and formatted</li>
          <li>✅ Lists should be properly indented and styled</li>
          <li>✅ Compact spacing should be applied to pitch content</li>
        </ul>
      </div>
    </div>
  );
};

export default CompetitorAnalysisTest;
