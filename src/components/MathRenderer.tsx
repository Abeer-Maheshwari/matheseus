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
      className={`katex-rendered inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

// Sub-component to render text that may contain markdown bold (**...**), italics (*...*), or code (`...`)
const RenderTextWithMarkdown: React.FC<{ content: string }> = ({ content }) => {
  // Regex to match **bold**, `code`, or regular text
  const parts = useMemo(() => {
    const tokens = content.split(/(\*\*[^\*]+?\*\*|`[^`]+?`|\*[^\*]+?\*)/g);
    return tokens.map((token, i) => {
      if (token.startsWith('**') && token.endsWith('**')) {
        const inner = token.slice(2, -2);
        // Highlight mark scheme codes like M1, A1, B1, SC
        const isMarkCode = /^(M\d|A\d|B\d|SC|M\d\s*A\d|dM\d|A\d\s*ft)/i.test(inner);
        return (
          <strong
            key={i}
            className={
              isMarkCode
                ? 'font-bold text-[#FAF6F0] bg-[#865D36] px-1.5 py-0.5 rounded border border-[#93785B]/40 mr-1 text-[11px]'
                : 'font-bold text-[#FAF6F0]'
            }
          >
            {inner}
          </strong>
        );
      }
      if (token.startsWith('`') && token.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-[#2C2620] text-[#865D36] text-xs border border-[#93785B]/40">
            {token.slice(1, -1)}
          </code>
        );
      }
      if (token.startsWith('*') && token.endsWith('*')) {
        return <em key={i} className="italic text-[#AC8968]">{token.slice(1, -1)}</em>;
      }
      return <span key={i}>{token}</span>;
    });
  }, [content]);

  return <>{parts}</>;
};

// Helper component that parses markdown-style text with inline $...$ or display $$...$$ math
export const FormattedMathText: React.FC<{ text: string; className?: string }> = ({
  text,
  className = '',
}) => {
  const renderedContent = useMemo(() => {
    if (!text) return null;

    // Split by $$...$$ or $...$
    const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const math = part.slice(2, -2).trim();
        try {
          const html = katex.renderToString(math, { 
            displayMode: true, 
            throwOnError: false,
            strict: false 
          });
          return (
            <div
              key={idx}
              className="my-3 overflow-x-auto py-1 text-center"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <pre key={idx} className="font-mono text-xs text-rose-300">{math}</pre>;
        }
      } else if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1).trim();
        try {
          const html = katex.renderToString(math, { 
            displayMode: false, 
            throwOnError: false,
            strict: false 
          });
          return (
            <span
              key={idx}
              className="inline-block px-0.5 align-baseline"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return <code key={idx} className="font-mono text-xs text-rose-300">{math}</code>;
        }
      }
      // Process markdown bold/code on non-math portions
      return <RenderTextWithMarkdown key={idx} content={part} />;
    });
  }, [text]);

  return <div className={`leading-relaxed whitespace-pre-wrap ${className}`}>{renderedContent}</div>;
};
