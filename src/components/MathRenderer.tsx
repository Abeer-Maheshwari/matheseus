import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
  math,
  displayMode = false,
  className = '',
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode,
        throwOnError: false,
        strict: false,
      });
    } catch (e) {
      console.warn('KaTeX render error:', e);
      return math;
    }
  }, [math, displayMode]);

  return (
    <span
      className={`katex-rendered ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

// Helper component that parses markdown-style text with inline $...$ or display $$...$$ math
export const FormattedMathText: React.FC<{ text: string; className?: string }> = ({
  text,
  className = '',
}) => {
  const renderedContent = useMemo(() => {
    // Split by $$...$$ or $...$
    const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const math = part.slice(2, -2).trim();
        try {
          const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
          return (
            <div
              key={idx}
              className="my-3 overflow-x-auto py-1"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <pre key={idx} className="font-mono text-xs">{math}</pre>;
        }
      } else if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1).trim();
        try {
          const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
          return (
            <span
              key={idx}
              className="inline-block"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <code key={idx} className="font-mono text-xs">{math}</code>;
        }
      }
      return <span key={idx}>{part}</span>;
    });
  }, [text]);

  return <div className={`leading-relaxed whitespace-pre-wrap ${className}`}>{renderedContent}</div>;
};
