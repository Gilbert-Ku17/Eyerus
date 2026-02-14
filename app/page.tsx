"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import LoadingSplash from '@/components/LoadingSplash';

interface Heart {
  id: number;
  x: number;
  delay: number;
}

export default function ValentineLanding() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isHoveringNo, setIsHoveringNo] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const router = useRouter();
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sadEmojis = ['😢', '🥺', '💔', '😭', '🙁'];
  const happyEmojis = ['😍', '💖', '🥰', '💕', '✨'];
  
  const noButtonTexts = [
    "No 😔",
    "Are you sure? 🥺",
    "Really? 💔",
    "Think again... 😢",
    "Please? 🙏"
  ];

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
    setNoClickCount(prev => Math.min(prev + 1, noButtonTexts.length - 1));

    setTimeout(() => setIsHoveringNo(false), 800);
  };

  const handleYesClick = () => {
    router.push('/celebrate');
  };

  if (isLoading) {
    return (
      <LoadingSplash
        duration={15}
        onFinish={() => setIsLoading(false)}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      {/* Romantic gradient background with depth */}
      <div className="absolute inset-0 bg-linear-to-br from-rose-100 via-pink-50 to-red-50">
        {/* Layered gradient overlays for depth */}
        <div className="absolute inset-0 bg-linear-to-tr from-pink-200/30 via-transparent to-rose-200/30" />
        <div className="absolute inset-0 bg-linear-to-bl from-transparent via-pink-100/20 to-transparent" />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Floating hearts - more subtle and elegant */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.15, 0],
              y: [0, -100, -200],
              x: [0, Math.random() * 40 - 20, Math.random() * 80 - 40],
              scale: [0.5, 1, 0.8],
              rotate: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="currentColor"
                className="text-rose-400"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Main content - no card, fullscreen romantic layout */}
      <motion.div
        className="relative z-10 text-center max-w-4xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Decorative top element */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="h-px w-24 bg-linear-to-r from-transparent via-rose-400/60 to-rose-400/60" />
          <motion.svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="url(#heartGradient)"
            />
            <defs>
              <linearGradient id="heartGradient" x1="2" y1="3" x2="22" y2="21">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </motion.svg>
          <div className="h-px w-24 bg-linear-to-l from-transparent via-rose-400/60 to-rose-400/60" />
        </motion.div>

        {/* Main heading with beautiful typography */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4 leading-none">
            <span className="block bg-linear-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              Will you be
            </span>
            <span className="block bg-linear-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
              my Valentine?
            </span>
          </h1>
          
          {/* Animated heart accent */}
          <motion.div
            className="inline-flex mt-4"
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="url(#accentGradient)"
              />
              <defs>
                <linearGradient id="accentGradient" x1="2" y1="3" x2="22" y2="21">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-600 mb-16 font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          I promise to make it the most special day ever
        </motion.p>

        {/* Buttons container */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center relative min-h-50 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {/* Yes Button - Premium design */}
          <motion.button
            className="group relative px-16 py-5 rounded-full text-xl md:text-2xl font-bold text-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleYesClick}
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-linear-to-r from-rose-500 via-pink-500 to-red-500" />
            
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-pink-400 via-rose-400 to-red-400 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-200%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <span className="relative z-10 flex items-center gap-3">
              Yes! 
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                💕
              </motion.span>
            </span>

            {/* Floating hearts on hover */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {happyEmojis.slice(0, 4).map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-3xl"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, i % 2 === 0 ? 10 : -10, 0]
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    repeat: Infinity
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.button>

          {/* No Button - Playful escape */}
          <motion.button
            ref={noButtonRef}
            className="relative px-12 py-4 rounded-full text-lg md:text-xl font-semibold bg-white border-2 border-rose-200 text-rose-500 hover:border-rose-300 hover:bg-rose-50/50 transition-all duration-200 shadow-lg"
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            animate={noButtonPosition}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25
            }}
            whileHover={{ scale: 1.02 }}
          >
            {noButtonTexts[noClickCount]}
          </motion.button>

          {/* Sad emojis when trying to click No */}
          <AnimatePresence>
            {isHoveringNo && (
              <motion.div
                className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex gap-3"
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {sadEmojis.map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="text-3xl"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ 
                      scale: 1, 
                      rotate: 0,
                      y: [0, -5, 0]
                    }}
                    transition={{ 
                      delay: i * 0.1,
                      y: {
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1
                      }
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom hint with elegant styling */}
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="h-px w-12 bg-linear-to-r from-transparent to-gray-300" />
          <p className="text-sm text-gray-400 italic font-light">
            Hint: The "No" button is a little shy
          </p>
          <div className="h-px w-12 bg-linear-to-l from-transparent to-gray-300" />
        </motion.div>

        {/* Decorative bottom dots */}
        <motion.div
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-rose-300"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Custom styles for smoother gradients */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}