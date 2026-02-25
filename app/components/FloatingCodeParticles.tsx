'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

const CODE_TOKENS = [
  'def', 'class', 'async', 'await', 'import', 'from', 'return',
  'tensor', 'embed', 'transform', 'layer', 'neural', 'forward',
  'model', 'train', 'optimize', 'gradient', 'backprop',
  '<AI>', '</AI>', '[]', '{}', '=>', '...', '||',
  'vLLM', 'LangGraph', 'Milvus', 'Next.js', 'PyTorch',
  'attention', 'tokens', 'softmax', 'embedding',
  '0x1a', '0xff', 'async/await', 'RAG', 'LLM',
  'GPU', 'tensor', 'vector', 'query', 'prompt',
];

// Use fewer tokens for better performance
const DISPLAY_TOKENS = CODE_TOKENS.slice(0, 25);

interface TokenPosition {
  left: string;
  top: string;
  opacity: number;
  fontSize: string;
  animationDelay: string;
}

function Token({ token, position, onMouseMove }: {
  token: string;
  position: TokenPosition;
  onMouseMove: (e: React.MouseEvent<HTMLSpanElement>) => void;
}) {
  const style = {
    left: position.left,
    top: position.top,
    animationDelay: position.animationDelay,
    opacity: position.opacity,
    fontSize: position.fontSize,
  };

  return (
    <span
      className="absolute pointer-events-none transition-all duration-300 hover:scale-150 hover:opacity-100 cursor-default"
      style={style}
      onMouseMove={onMouseMove}
      data-token={token}
    >
      {token}
    </span>
  );
}

export default function FloatingCodeParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Generate positions once on client side only to avoid hydration mismatch
  const tokenPositions = useMemo(() => {
    if (!isMounted) return [];

    return DISPLAY_TOKENS.map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.3 + 0.1,
      fontSize: `${Math.random() * 8 + 12}px`,
      animationDelay: `${i * 0.2}s`,
    }));
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const tokens = containerRef.current.querySelectorAll('span[data-token]');
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      tokens.forEach((token) => {
        const element = token as HTMLElement;
        const rect = element.getBoundingClientRect();
        const tokenX = rect.left + rect.width / 2;
        const tokenY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(mouseX - tokenX, 2) + Math.pow(mouseY - tokenY, 2)
        );

        // Repel effect when mouse is near
        if (distance < 150) {
          const force = (150 - distance) / 150;
          const angle = Math.atan2(tokenY - mouseY, tokenX - mouseX);
          const moveX = Math.cos(angle) * force * 30;
          const moveY = Math.sin(angle) * force * 30;

          element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.2)`;
          element.style.opacity = '1';
          element.style.color = '#818cf8';
          element.style.textShadow = '0 0 10px #6366f1';
        } else {
          element.style.transform = 'translate(0, 0) scale(1)';
          element.style.opacity = element.dataset.originalOpacity || '0.2';
          element.style.color = '';
          element.style.textShadow = '';
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleTokenMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    const element = e.currentTarget;
    element.dataset.originalOpacity = element.style.opacity;
  };

  // Don't render until mounted on client to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {DISPLAY_TOKENS.map((token, i) => (
        <Token
          key={token}
          token={token}
          position={tokenPositions[i] || {
            left: '50%',
            top: '50%',
            opacity: 0.2,
            fontSize: '14px',
            animationDelay: '0s',
          }}
          onMouseMove={handleTokenMouseEnter}
        />
      ))}
    </div>
  );
}
