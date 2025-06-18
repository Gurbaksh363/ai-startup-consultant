import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

const MarkdownRenderer = ({ content, className = '' }) => {
  // Simple preprocessing to clean up AI output
  const preprocessToMarkdown = (text) => {
    return text
      // Handle "Company Name:" patterns
      .replace(/Company Name:\s*([^\n]+)/g, '\n\n#### $1\n')
      
      // Convert **Bold Text:** patterns to proper headings
      .replace(/\*\*([^*]+?):\*\*/g, '\n\n### $1\n\n')
      
      // Handle section headers that end with colon
      .replace(/^([A-Z][^:\n]*):$/gm, '\n\n### $1\n')
      
      // Clean up bullet points
      .replace(/^\s*•\s*/gm, '- ')
      .replace(/^\s*[+•]\s*/gm, '- ')
      
      // Clean up multiple line breaks
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^\s+/gm, '')
      .replace(/\s+$/gm, '')
      .trim();
  };

  const markdownContent = preprocessToMarkdown(content);

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          h1: ({ children }) => (
            <h1 style={{ 
              fontSize: '1.8rem', 
              fontWeight: '700', 
              color: '#1e40af', 
              marginTop: '1.5rem', 
              marginBottom: '1rem',
              borderBottom: '2px solid #dbeafe',
              paddingBottom: '0.5rem'
            }}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              color: '#1e40af', 
              marginTop: '1.5rem', 
              marginBottom: '0.75rem',
              borderLeft: '4px solid #3b82f6',
              paddingLeft: '1rem'
            }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ 
              fontSize: '1.2rem', 
              fontWeight: '600', 
              color: '#1d4ed8', 
              marginTop: '1.25rem', 
              marginBottom: '0.5rem'
            }}>
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 style={{ 
              fontSize: '1.1rem', 
              fontWeight: '600', 
              color: '#2563eb', 
              marginTop: '1rem', 
              marginBottom: '0.5rem',
              backgroundColor: '#eff6ff',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              borderLeft: '3px solid #3b82f6'
            }}>
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p style={{ 
              marginBottom: '0.75rem', 
              lineHeight: '1.6',
              color: '#374151'
            }}>
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul style={{ 
              marginBottom: '1rem',
              marginTop: '0.25rem',
              paddingLeft: '1.5rem'
            }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol style={{ 
              marginBottom: '1rem',
              marginTop: '0.25rem',
              paddingLeft: '1.5rem'
            }}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li style={{ 
              marginBottom: '0.25rem',
              lineHeight: '1.6',
              color: '#4b5563'
            }}>
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong style={{ 
              fontWeight: '600',
              color: '#1f2937'
            }}>
              {children}
            </strong>
          )
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
