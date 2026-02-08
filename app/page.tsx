"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSplash from '@/components/LoadingSplash';

interface Heart {
  id: number;
  x: number;
  delay: number;
}

export default function ValentineLanding() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isHoveringNo, setIsHoveringNo] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sadEmojis = ['😢', '🥺', '💔', '😭', '🙁'];
  const happyEmojis = ['😍', '💖', '🥰', '💕', '✨'];

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    const maxX = container.width - button.width - 40;
    const maxY = container.height - button.height - 40;
    
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    
    setNoButtonPosition({ x: newX, y: newY });
    setIsHoveringNo(true);
    
    setTimeout(() => setIsHoveringNo(false), 800);
  };

  const handleYesClick = () => {
    setShowCelebration(true);
    // Create multiple hearts
    const newHearts: Heart[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setHearts(newHearts);
  };

  

  if (isLoading) {
    return (
      <LoadingSplash
        duration={60}
        message="Welcome — will you be my Valentine?"
        onFinish={() => setIsLoading(false)}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-pink-300 via-purple-300 to-indigo-400 overflow-hidden px-4"
    >
      {/* Animated background hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 20}px`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="relative z-10 text-center max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-6"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          Will you be my Valentine? 💝
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-600 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          I promise to make it the most special day ever! ✨
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative min-h-30">
          {/* Yes Button */}
          <motion.button
            className="relative bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg group overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYesClick}
          >
            <motion.div 
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
              initial={false}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <span className="relative z-10">Yes! 💕</span>
            
            {/* Hover emojis */}
            <motion.div 
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            >
              {happyEmojis.slice(0, 3).map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-2xl"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: i * 0.1,
                    repeat: Infinity
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </motion.button>

          {/* No Button - Escapes cursor */}
          <motion.button
            ref={noButtonRef}
            className="relative bg-white border-2 border-purple-400 text-purple-500 font-bold py-4 px-12 rounded-full text-xl shadow-lg hover:border-purple-500 transition-colors"
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            animate={noButtonPosition}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 20
            }}
          >
            No 😔
          </motion.button>

          {/* Sad emojis when hovering No */}
          <AnimatePresence>
            {isHoveringNo && (
              <motion.div 
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {sadEmojis.slice(0, 3).map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.p 
          className="text-sm text-gray-400 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Hint: The "No" button is a little shy 😉
        </motion.p>
      </motion.div>
    </div>
  );
}

