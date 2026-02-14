"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import LoadingSplash from '@/components/LoadingSplash';

const Page = () => {
  const router = useRouter();
  const [showTyping, setShowTyping] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const message = {
    title: "A Letter Across The Miles",
    subtitle: "To the one who holds my heart",
    paragraphs: [
      "My Dearest Love,",
      "Words can hardly express what you mean to me. From the first moment my heart realized that I love you, I knew there was something special about you something that would change my life forever.",
      "You are the sunshine that brightens my darkest days, the laughter that fills my quiet moments, and the love that makes every heartbeat worthwhile. Being with you feels like finding a piece of myself I didn't know was missing.",
      "Every smile you share, every word you speak, every moment we spend together whether on call, text, or video call is a treasure I hold close to my heart. You've shown me what it means to truly love and be loved in return.",
      "This Valentine's Day, I might not give you flowers because of the miles between us, but I thank God for the internet and for making me a proud developer who can create this for you. I want you to know that you are cherished beyond measure. You are my best friend, my greatest adventure, and my forever Valentine.",
      "I can't wait to meet you this coming June. We need to create a gallery of our memories and all the beautiful moments yet to come. Thank you for being you, and thank you for choosing me. I will forever pray to God to keep you for me.",
      "Until we're together again,\nWith all my love,\nYour Forever Valentine 💕"
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
    }, 25); // Typing speed

    return () => clearInterval(typingInterval);
  }, [showTyping, fullText, showFullMessage]);

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
    }, 900);

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
        duration={5}
        message="Crafting your love letter"
        onFinish={() => setIsLoading(false)}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 overflow-hidden relative">
      {/* Elegant gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-rose-50 via-pink-50 to-amber-50">
        <div className="absolute inset-0 bg-linear-to-tr from-pink-100/30 via-transparent to-rose-100/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,113,133,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.08),transparent_50%)]" />

        {/* Paper texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Soft background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.1, 0.25, 0.1],
              rotate: [0, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            <svg width={`${30 + Math.random() * 30}`} height={`${30 + Math.random() * 30}`} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={['#fda4af', '#fb7185', '#f472b6'][Math.floor(Math.random() * 3)]}
                opacity="0.2"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Main content container */}
      <motion.div
        className="relative z-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Back button */}
        <motion.button
          className="mb-8 flex items-center gap-2 text-rose-600 hover:text-rose-700 transition-all duration-200 group"
          onClick={() => router.back()}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-1 transition-transform">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-medium">Back to Celebration</span>
        </motion.button>

        {/* Letter card - Premium paper effect */}
        <motion.div
          className="bg-linear-to-br from-white via-rose-50/30 to-pink-50/20 backdrop-blur-sm rounded-2xl shadow-2xl relative overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            boxShadow: '0 20px 60px rgba(251, 113, 133, 0.15), 0 0 0 1px rgba(251, 113, 133, 0.1)'
          }}
        >
          {/* Decorative borders */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-rose-400 to-transparent opacity-60" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-pink-400 to-transparent opacity-60" />

          {/* Elegant corner flourishes */}
          <svg className="absolute top-0 left-0 w-24 h-24 text-rose-200/40" viewBox="0 0 100 100">
            <path d="M0,0 Q25,0 25,25 Q25,0 50,0" fill="currentColor" />
          </svg>
          <svg className="absolute top-0 right-0 w-24 h-24 text-pink-200/40 rotate-90" viewBox="0 0 100 100">
            <path d="M0,0 Q25,0 25,25 Q25,0 50,0" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-0 left-0 w-24 h-24 text-pink-200/40 -rotate-90" viewBox="0 0 100 100">
            <path d="M0,0 Q25,0 25,25 Q25,0 50,0" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-24 h-24 text-rose-200/40 rotate-180" viewBox="0 0 100 100">
            <path d="M0,0 Q25,0 25,25 Q25,0 50,0" fill="currentColor" />
          </svg>

          <div className="relative px-8 py-12 md:px-16 md:py-16 lg:px-20 lg:py-20">
            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Decorative top element */}
              <motion.div
                className="flex items-center justify-center gap-4 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="h-px w-16 bg-linear-to-r from-transparent via-rose-400/60 to-rose-400/60" />
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="url(#headerGradient)"
                    />
                    <defs>
                      <linearGradient id="headerGradient" x1="2" y1="3" x2="22" y2="21">
                        <stop offset="0%" stopColor="#f43f5e" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
                <div className="h-px w-16 bg-linear-to-l from-transparent via-rose-400/60 to-rose-400/60" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
                <span className="bg-linear-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                  {message.title}
                </span>
              </h1>

              <motion.p
                className="text-rose-500/80 italic text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {message.subtitle}
              </motion.p>

              <motion.div
                className="w-32 h-px bg-linear-to-r from-transparent via-rose-400 to-transparent mx-auto mt-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              />
            </motion.div>

            {/* Message content - Typing animation */}
            {showTyping && !showFullMessage && (
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="prose prose-lg lg:prose-xl max-w-none text-gray-700 leading-relaxed">
                  <p className="whitespace-pre-wrap text-lg md:text-xl font-light tracking-wide">
                    {typedText}
                    <motion.span
                      className="inline-block w-0.5 h-6 bg-rose-500 ml-1"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </p>
                </div>
              </motion.div>
            )}

            {/* Message content - Fade-in paragraphs */}
            {showFullMessage && (
              <div className="space-y-8">
                {message.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className={`leading-relaxed ${index === 0
                        ? 'text-rose-700 font-semibold text-xl md:text-3xl'
                        : index === message.paragraphs.length - 1
                          ? 'text-rose-600 font-medium text-right whitespace-pre-line text-xl italic mt-12'
                          : 'text-gray-700 text-lg md:text-xl font-light tracking-wide'
                      }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: index <= currentParagraph ? 1 : 0,
                      y: index <= currentParagraph ? 0 : 20
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Highlight special phrases */}
                    {index === 4 ? (
                      <>
                        This Valentine's Day, I might not give you flowers because of the miles between us, but I thank God for the internet and for making me a{' '}
                        <span className="text-rose-600 font-semibold">proud developer</span> who can create this for you. I want you to know that you are cherished beyond measure. You are my{' '}
                        <span className="text-rose-600 font-semibold">best friend</span>, my{' '}
                        <span className="text-rose-600 font-semibold">greatest adventure</span>, and my{' '}
                        <span className="text-rose-600 font-semibold">forever Valentine</span>.
                      </>
                    ) : index === 5 ? (
                      <>
                        I can't wait to meet you this coming{' '}
                        <span className="inline-flex items-center gap-2 text-rose-600 font-bold text-2xl">
                          <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            June
                          </motion.span>
                          <motion.span
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            ✨
                          </motion.span>
                        </span>
                        . We need to create a gallery of our memories and all the beautiful moments yet to come. Thank you for being you, and thank you for choosing me. I will forever pray to God to keep you for me.
                      </>
                    ) : (
                      paragraph
                    )}
                  </motion.p>
                ))}
              </div>
            )}

            {/* Countdown to June highlight */}
            <AnimatePresence>
              {showFullMessage && currentParagraph >= message.paragraphs.length - 1 && (
                <motion.div
                  className="mt-12 p-6 bg-linear-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-200/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-center">
                    <p className="text-gray-600 mb-2 text-sm uppercase tracking-widest">
                      Counting down to
                    </p>
                    <p className="text-4xl md:text-5xl font-bold bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      June 2026
                    </p>
                    <p className="text-rose-500 italic">
                      When distance becomes a memory and love becomes tangible
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating hearts decoration */}
            <AnimatePresence>
              {showFullMessage && currentParagraph >= message.paragraphs.length - 1 && (
                <motion.div
                  className="flex justify-center gap-4 mt-10 text-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {['💕', '💖', '💗', '💘', '💝'].map((emoji, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        y: [0, -18, 0],
                        rotate: [0, i % 2 === 0 ? 10 : -10, 0]
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.15,
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
          </div>
        </motion.div>

        {/* Animation toggle button */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={toggleAnimation}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm text-rose-600 hover:text-rose-700 font-medium rounded-full transition-all duration-200 shadow-lg hover:shadow-xl border border-rose-200/50"
          >
            {showTyping ? (
              <>
                <span>⏭️</span>
                <span>Skip to Full Letter</span>
              </>
            ) : (
              <>
                <span>🔄</span>
                <span>Replay Typing Animation</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          className="mt-10 flex justify-center gap-6 text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2 }}
        >
          {['🌹', '✨', '💐', '✨', '🌹'].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{
                rotate: [0, 15, 0, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
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