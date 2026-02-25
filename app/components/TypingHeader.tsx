'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TypingHeaderProps {
  prefix: string; // The terminal-style constant like "CAREER_JOURNEY"
  title: string; // The main title like "Experience"
  suffix?: string; // Optional suffix like "& Stack"
  className?: string;
}

export default function TypingHeader({ prefix, title, suffix, className = '' }: TypingHeaderProps) {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [prefixVisible, setPrefixVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);

  const fullTitle = suffix ? `${title} ${suffix}` : title;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          setPrefixVisible(true);
          setIsTyping(true);

          // Start typing after a short delay
          setTimeout(() => {
            let index = 0;

            const typeNextChar = () => {
              if (index < fullTitle.length) {
                setTypedText(fullTitle.slice(0, index + 1));
                index++;
                // Random typing speed for realism (30ms to 80ms per character)
                const delay = Math.random() * 50 + 30;
                setTimeout(typeNextChar, delay);
              } else {
                setIsTyping(false);
              }
            };

            typeNextChar();
          }, 300);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [fullTitle]); // Only depend on fullTitle

  return (
    <div ref={ref} className={className}>
      <motion.p
        className="font-mono text-xs mb-4"
        style={{ color: 'var(--cyan)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: prefixVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {prefix}
      </motion.p>
      <h2 className="text-5xl font-display font-bold">
        <span className="text-gray-400">
          {typedText}
          {isTyping && typedText.length < fullTitle.length && typedText.length > 0 && (
            <span className="cursor-blink" />
          )}
        </span>
      </h2>
    </div>
  );
}
