
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import LoadingSplash from '../../../components/LoadingSplash';

const Page = () => {
  const router = useRouter();
  const [showTyping, setShowTyping] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const message = {
    title: "A Letter to You",
    paragraphs: [
      "My Dearest Valentine,",
      "Words can hardly express what you mean to me. From the first moment our eyes met, I knew there was something special about you—something that would change my life forever.",
      "You are the sunshine that brightens my darkest days, the laughter that fills my quiet moments, and the love that makes every heartbeat worthwhile. Being with you feels like finding a piece of myself I didn't know was missing.",
      "Every smile you share, every word you speak, every moment we spend together is a treasure I hold close to my heart. You've shown me what it means to truly love and be loved in return.",
      "This Valentine's Day, I want you to know that you are cherished beyond measure. You are my best friend, my greatest adventure, and my forever Valentine.",
      "Here's to all the memories we've made and all the beautiful moments yet to come. Thank you for being you, and thank you for choosing me.",
      "With all my love,\nYour Valentine 💕"
    ]
  };

  const fullText = message.paragraphs.join(' ');

  // Typing animation effect
  useEffect(() => {
    if (!showTyping || showFullMessage) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowTyping(false);
          setShowFullMessage(true);
        }, 500);
      }
    }, 30); // Typing speed

    return () => clearInterval(typingInterval);
  }, [showTyping, fullText, showFullMessage]);

  // show loading splash first
  useEffect(() => {
    const id = setTimeout(() => setIsLoading(false), 60 * 1000);
    return () => clearTimeout(id);
  }, []);

  // Paragraph fade-in animation counter
  useEffect(() => {
    if (!showFullMessage) return;

    const paragraphInterval = setInterval(() => {
      setCurrentParagraph(prev => {
        if (prev < message.paragraphs.length - 1) {
          return prev + 1;
        }
        clearInterval(paragraphInterval);
        return prev;
      });
    }, 800);

    return () => clearInterval(paragraphInterval);
  }, [showFullMessage, message.paragraphs.length]);

  const toggleAnimation = () => {
    setShowTyping(!showTyping);
    setShowFullMessage(!showFullMessage);
    setTypedText('');
    setCurrentParagraph(0);
  };

  if (isLoading) {
    return (
      <LoadingSplash
        duration={60}
        message="A love letter is being polished..."
        onFinish={() => setIsLoading(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-rose-50 to-pink-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Soft background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-200/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 60 + 30}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['💕', '💖', '💗', '🌹', '✨'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* Main content container */}
      <motion.div
        className="relative z-10 w-full max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Back button */}
        <motion.button
          className="mb-6 flex items-center gap-2 text-rose-600 hover:text-rose-700 transition-colors"
          onClick={() => router.back()}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl">←</span>
          <span className="font-medium">Back to Celebration</span>
        </motion.button>

        {/* Letter card */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-linear-to-br from-rose-200/30 to-transparent rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-tl from-pink-200/30 to-transparent rounded-tl-full" />

          {/* Title */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="text-5xl mb-4"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              💌
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              {message.title}
            </h1>
            <motion.div
              className="w-24 h-1 bg-linear-to-r from-rose-400 to-pink-400 mx-auto mt-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>

          {/* Message content - Typing animation */}
          {showTyping && !showFullMessage && (
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-serif">
                <p className="whitespace-pre-wrap">
                  {typedText}
                  <motion.span
                    className="inline-block w-0.5 h-5 bg-rose-500 ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </p>
              </div>
            </motion.div>
          )}

          {/* Message content - Fade-in paragraphs */}
          {showFullMessage && (
            <div className="space-y-6">
              {message.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className={`text-lg leading-relaxed font-serif ${
                    index === 0 
                      ? 'text-rose-700 font-semibold text-xl' 
                      : index === message.paragraphs.length - 1
                      ? 'text-rose-600 font-medium text-right whitespace-pre-line'
                      : 'text-gray-700'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: index <= currentParagraph ? 1 : 0,
                    y: index <= currentParagraph ? 0 : 20
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          )}

          {/* Floating hearts decoration */}
          <AnimatePresence>
            {showFullMessage && currentParagraph >= message.paragraphs.length - 1 && (
              <motion.div
                className="flex justify-center gap-3 mt-10 text-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {['💕', '💖', '💗', '💘', '💝'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Animation toggle button */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={toggleAnimation}
            className="text-rose-600 hover:text-rose-700 font-medium underline transition-colors"
          >
            {showTyping ? '⏭️ Skip to Full Message' : '🔄 Replay Typing Animation'}
          </button>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          className="mt-8 flex justify-center gap-4 text-2xl opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2 }}
        >
          {['🌹', '✨', '💐', '✨', '🌹'].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
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