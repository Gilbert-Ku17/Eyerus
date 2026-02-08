
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import LoadingSplash from '@/components/LoadingSplash';

interface FallingEmoji {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

const Page = () => {
  const [showMessage, setShowMessage] = useState(false);
  const router = useRouter();
  const [fallingEmojis, setFallingEmojis] = useState<FallingEmoji[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loveEmojis = ['❤️', '💕', '💖', '💘', '💝', '💗', '💓', '💞'];

  // Romantic images (you can replace these with your own images)
  const romanticImages = [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80', // Couple holding hands
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80', // Heart balloons
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80', // Romantic dinner
  ];

  useEffect(() => {
    // Generate falling emojis continuously
    const generateEmoji = () => {
      const newEmoji: FallingEmoji = {
        id: Date.now() + Math.random(),
        emoji: loveEmojis[Math.floor(Math.random() * loveEmojis.length)],
        x: Math.random() * 100,
        delay: 0,
        duration: 3 + Math.random() * 2,
        size: 20 + Math.random() * 20,
      };

      setFallingEmojis((prev) => [...prev, newEmoji]);

      // Remove emoji after it falls
      const removeId = setTimeout(() => {
        setFallingEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
      }, (newEmoji.duration + 1) * 1000);

      return () => clearTimeout(removeId);
    };

    // Generate emojis at intervals
    const interval = setInterval(generateEmoji, 300);

    return () => clearInterval(interval);
  }, []);

  // Auto-rotate images
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % romanticImages.length);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, []);

  // show loading splash first
  useEffect(() => {
    const id = setTimeout(() => setIsLoading(false), 60 * 1000);
    return () => clearTimeout(id);
  }, []);

  if (isLoading) {
    return (
      <LoadingSplash
        duration={60}
        message="Celebration is warming up..."
        onFinish={() => setIsLoading(false)}
      />
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-rose-400 via-pink-400 to-red-400 overflow-hidden">
      {/* Falling emoji rain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {fallingEmojis.map((emoji) => (
          <motion.div
            key={emoji.id}
            className="absolute"
            style={{
              left: `${emoji.x}%`,
              fontSize: `${emoji.size}px`,
            }}
            initial={{ y: -50, opacity: 0, rotate: 0 }}
            animate={{
              y: '110vh',
              opacity: [0, 1, 1, 0],
              rotate: 360,
            }}
            transition={{
              duration: emoji.duration,
              delay: emoji.delay,
              ease: 'linear'
            }}
          >
            {emoji.emoji}
          </motion.div>
        ))}
      </div>

      {/* Animated sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          type: 'spring',
          stiffness: 100
        }}
      >
        {/* Celebration header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            You Said Yes! 🎉
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl text-white/90 mb-8 drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            This is going to be the best Valentine's Day ever!
          </motion.p>
        </motion.div>

        {/* Image carousel */}
        <motion.div
          className="relative w-full max-w-2xl mx-auto mb-8 rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="relative h-75 md:h-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={romanticImages[currentImageIndex]}
                alt="Romantic moment"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7 }}
              />
            </AnimatePresence>

            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {romanticImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                    }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Floating hearts around image */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${20 + (i % 4) * 20}%`,
                top: `${30 + Math.floor(i / 4) * 40}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                rotate: [-10, 10, -10],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + (i * 0.3),
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              💖
            </motion.div>
          ))}
        </div>

        {/* Special message button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {!showMessage && (
            <motion.button
              className="bg-white text-rose-500 font-bold py-5 px-10 rounded-full text-xl shadow-2xl hover:shadow-rose-300 transition-all relative overflow-hidden group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/message')}
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-rose-400 to-pink-400 opacity-0 group-hover:opacity-20"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                💌 Click for a Special Message
              </span>
            </motion.button>
          )}
        </motion.div>



        {/* Bottom heart animation */}
        <motion.div
          className="mt-12 flex justify-center gap-4 text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {['💑', '🌹', '💐', '🎁', '🍫'].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360, 0]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;