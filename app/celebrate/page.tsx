"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import LoadingSplash from '@/components/LoadingSplash';
import Image from 'next/image';

interface FallingEmoji {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

const Page = () => {
  const router = useRouter();
  const [fallingEmojis, setFallingEmojis] = useState<FallingEmoji[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loveEmojis = ['❤️', '💕', '💖', '💘', '💝', '💗', '💓', '💞'];

  useEffect(() => {
    // Generate falling emojis continuously
    const generateEmoji = () => {
      const newEmoji: FallingEmoji = {
        id: Date.now() + Math.random(),
        emoji: loveEmojis[Math.floor(Math.random() * loveEmojis.length)],
        x: Math.random() * 100,
        delay: 0,
        duration: 4 + Math.random() * 3,
        size: 16 + Math.random() * 16,
      };

      setFallingEmojis((prev) => [...prev, newEmoji]);

      // Remove emoji after it falls
      setTimeout(() => {
        setFallingEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
      }, (newEmoji.duration + 1) * 1000);
    };

    // Generate emojis at intervals
    const interval = setInterval(generateEmoji, 400);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <LoadingSplash
        duration={5}
        message="Preparing your celebration"
        onFinish={() => setIsLoading(false)}
      />
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-rose-50 via-pink-50 to-red-50">
        <div className="absolute inset-0 bg-linear-to-tr from-pink-100/40 via-transparent to-rose-100/40" />
        <div className="absolute inset-0 bg-linear-to-bl from-transparent via-pink-50/30 to-transparent" />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Falling emoji rain - more subtle */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {fallingEmojis.map((emoji) => (
          <motion.div
            key={emoji.id}
            className="absolute opacity-30"
            style={{
              left: `${emoji.x}%`,
              fontSize: `${emoji.size}px`,
            }}
            initial={{ y: -50, opacity: 0, rotate: 0 }}
            animate={{
              y: '110vh',
              opacity: [0, 0.3, 0.3, 0],
              rotate: 360,
            }}
            transition={{
              duration: emoji.duration,
              ease: 'linear'
            }}
          >
            {emoji.emoji}
          </motion.div>
        ))}
      </div>

      {/* Subtle animated sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" 
                fill="url(#sparkleGradient)" 
              />
              <defs>
                <linearGradient id="sparkleGradient">
                  <stop offset="0%" stopColor="#fda4af" />
                  <stop offset="100%" stopColor="#fb7185" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Celebration header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative top element */}
          <motion.div
            className="flex items-center justify-center gap-6 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="h-px w-24 bg-linear-to-r from-transparent via-rose-400/60 to-rose-400/60" />
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="url(#celebrationGradient)"
                />
                <defs>
                  <linearGradient id="celebrationGradient" x1="2" y1="3" x2="22" y2="21">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <div className="h-px w-24 bg-linear-to-l from-transparent via-rose-400/60 to-rose-400/60" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-linear-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              You Said Yes!
            </span>
          </motion.h1>

          <motion.div
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {['💖', '✨', '🎉', '✨', '💖'].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-3xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, i % 2 === 0 ? 10 : -10, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 + i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Main split content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl">
              {/* Image container with gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-rose-500/10 to-pink-500/10 z-10" />
              
              <Image
                src="/vale.png"
                alt="Valentine celebration"
                fill
                className="object-cover"
                priority
              />
              
              {/* Floating hearts around image */}
              <div className="absolute inset-0 pointer-events-none">
                {[
                  { top: '10%', left: '5%', delay: 0 },
                  { top: '20%', right: '8%', delay: 0.3 },
                  { bottom: '25%', left: '10%', delay: 0.6 },
                  { bottom: '15%', right: '5%', delay: 0.9 },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={pos}
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      delay: pos.delay,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill="rgba(251, 113, 133, 0.4)"
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative corner accent */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-rose-400 to-pink-400 rounded-full blur-3xl opacity-40"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-linear-to-tr from-pink-400 to-red-400 rounded-full blur-3xl opacity-30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>

          {/* Right: Message and CTA */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Main message */}
            <div className="space-y-6">
              <motion.div
                className="inline-block"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-1 w-12 bg-linear-to-r from-rose-500 to-pink-500 rounded-full" />
                  <span className="text-rose-600 font-semibold text-sm tracking-widest uppercase">
                    For My Love
                  </span>
                </div>
              </motion.div>

              <motion.blockquote
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <span className="bg-linear-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                  "Every day, I wake up knowing that my heart belongs to you
                </span>{' '}
                <span className="text-gray-600 italic font-light">
                  across the miles"
                </span>
              </motion.blockquote>

              <motion.div
                className="flex items-start gap-3 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-1">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="url(#quoteGradient)"
                  />
                  <defs>
                    <linearGradient id="quoteGradient">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Distance may separate us physically, but our love transcends space and time. 
                  This Valentine's Day is just the beginning of our beautiful story together.
                </p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              <button
                onClick={() => router.push('/message')}
                className="group relative px-10 py-5 rounded-full text-lg md:text-xl font-bold text-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
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
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    💌
                  </motion.span>
                  Open Your Special Message
                  <motion.svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </span>
              </button>

              {/* Hint text */}
              <motion.p
                className="text-sm text-gray-400 text-center mt-4 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                A heartfelt letter awaits you inside ✨
              </motion.p>
            </motion.div>

            {/* Decorative emoji row */}
            <motion.div
              className="flex items-center justify-center gap-6 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              {['💑', '🌹', '💐', '🎁', '🍫'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-3xl"
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 15, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut"
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom decorative dots */}
        <motion.div
          className="flex justify-center gap-2 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-rose-300"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
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
      </div>
    </div>
  );
};

export default Page;