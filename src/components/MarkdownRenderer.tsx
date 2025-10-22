import React from 'react';
import { Image } from 'antd';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Parse markdown content and render images
  const parseMarkdown = (text: string) => {
    if (!text || text.trim() === '') {
      return (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          <div style={{ fontSize: '16px' }}>
            📝 Chưa có nội dung
          </div>
        </div>
      );
    }

    // Parse markdown content directly
    const parsedText = text;
    
    const lines = parsedText.split('\n');
    const elements: React.ReactNode[] = [];
    
    lines.forEach((line, index) => {
      // Check if line contains markdown image syntax: ![alt](url)
      const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      
      if (imageMatch) {
        const [, alt, url] = imageMatch;
        elements.push(
          <div key={`image-${index}`} style={{ 
            margin: '8px 0', 
            display: 'flex', 
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <Image
              src={url}
              alt={alt}
              style={{
                width: '180px',
                height: '120px',
                borderRadius: '6px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                objectFit: 'cover',
                flexShrink: 0
              }}
              preview={true}
            />
          </div>
        );
      } else if (line.trim()) {
        // Regular text line
        elements.push(
          <div key={`text-${index}`} style={{ marginBottom: '8px' }}>
            {line}
          </div>
        );
      } else {
        // Empty line
        elements.push(<div key={`empty-${index}`} style={{ height: '16px' }} />);
      }
    });
    
    return elements;
  };

  return (
    <div style={{ 
      fontSize: '16px',
      lineHeight: '1.8',
      color: '#333'
    }}>
      {parseMarkdown(content)}
    </div>
  );
};

export default MarkdownRenderer;
