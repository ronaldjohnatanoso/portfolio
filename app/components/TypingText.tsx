'use client';

import { useEffect, useRef, useState } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number; // Delay before starting (ms)
  speed?: { min: number; max: number }; // Typing speed range (ms per token)
  tokenSize?: number; // Number of chars per "token"
}

export default function TypingText({
  text,
  className = '',
  delay = 0,
  speed = { min: 10, max: 30 },
  tokenSize = 3
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          setIsTyping(true);

          // Start typing after delay
          const startTyping = () => {
            // Split text into "tokens" (chunks of characters)
            const tokens: string[] = [];
            for (let i = 0; i < text.length; i += tokenSize) {
              tokens.push(text.slice(i, i + tokenSize));
            }

            let tokenIndex = 0;

            const streamNextToken = () => {
              if (tokenIndex < tokens.length) {
                setDisplayText(tokens.slice(0, tokenIndex + 1).join(''));
                tokenIndex++;
                // Random delay for realistic streaming
                const tokenDelay = Math.random() * (speed.max - speed.min) + speed.min;
                setTimeout(streamNextToken, tokenDelay);
              } else {
                setIsTyping(false);
              }
            };

            streamNextToken();
          };

          if (delay > 0) {
            setTimeout(startTyping, delay);
          } else {
            startTyping();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [text, tokenSize, speed, delay]); // Removed displayText and isTyping from deps

  return (
    <span ref={ref} className={className}>
      {displayText}
      {isTyping && displayText.length < text.length && displayText.length > 0 && (
        <span className="cursor-blink" />
      )}
    </span>
  );
}
