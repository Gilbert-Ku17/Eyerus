'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from "lucide-react";

type LoadingSplashProps = {
    duration?: number; // seconds
    message?: string;
    onFinish?: () => void;
    allowSkip?: boolean;
};

export default function LoadingSplash({
    duration = 15,
    message = "A SPECIAL GOOD MORNING FOR",
    onFinish,
    allowSkip = true,
}: LoadingSplashProps) {
    const [remaining, setRemaining] = useState(duration);
    const progress = ((duration - remaining) / duration) * 100;

    useEffect(() => {
        const id = setInterval(() => {
            setRemaining((r) => {
                if (r <= 1) {
                    clearInterval(id);
                    onFinish?.();
                    return 0;
                }
                return r - 1;
            });
        }, 1000);

        return () => clearInterval(id);
    }, [duration, onFinish]);

    // Floating hearts animation
    const floatingHearts = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        delay: i * 0.8,
        x: Math.random() * 100,
        duration: 3 + Math.random() * 2,
    }));

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Animated linear background */}
            <div className="absolute inset-0 bg-linear-to-br from-rose-50 via-pink-50 to-red-50">
                <div className="absolute inset-0 bg-linear-to-tr from-pink-100/40 via-transparent to-rose-100/40 animate-pulse" />
            </div>

            {/* Floating hearts background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingHearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        className="absolute text-rose-300/30"
                        style={{ left: `${heart.x}%` }}
                        initial={{ y: '100vh', scale: 0, opacity: 0 }}
                        animate={{
                            y: '-20vh',
                            scale: [0, 1, 1, 0],
                            opacity: [0, 0.6, 0.6, 0],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: heart.duration,
                            delay: heart.delay,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <Heart className="w-8 h-8 fill-current" />
                    </motion.div>
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="w-full max-w-2xl text-center"
                >
                    {/* Top decorative line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="mb-8 flex items-center justify-center gap-4"
                    >
                        <div className="h-px w-20 bg-linear-to-r from-transparent via-rose-400 to-rose-400" />
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <Sparkles className="w-6 h-6 text-rose-500 fill-rose-500" />
                        </motion.div>
                        <div className="h-px w-20 bg-linear-to-l from-transparent via-rose-400 to-rose-400" />
                    </motion.div>

                    {/* Main text */}
                    <div className="space-y-6 my-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-lg md:text-2xl font-medium tracking-wider text-gray-600 uppercase"
                        >
                            {message}
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="relative"
                        >
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold bg-linear-to-r from-rose-500 via-pink-500 to-red-500 bg-clip-text text-transparent leading-tight">
                                My Love
                            </h1>
                            
                            {/* Animated heart accent */}
                            <motion.div
                                className="absolute -top-4 -right-2 md:-right-8"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    rotate: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            >
                                <Heart className="w-8 h-8 md:w-12 md:h-12 text-rose-400 fill-rose-400" />
                            </motion.div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            className="text-gray-500 italic text-base md:text-lg mt-8 font-light"
                        >
                            "Every love story is beautiful, but ours is my favorite"
                        </motion.p>

                        {/* Progress bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                            className="flex items-center justify-center gap-4 mt-12"
                        >
                            <div className="relative w-48 md:w-64 h-3 bg-rose-100 rounded-full overflow-hidden shadow-inner">
                                {/* Animated linear progress */}
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-linear-to-r from-rose-400 via-pink-500 to-red-500 rounded-full"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                                </motion.div>

                                {/* Pulsing heart on progress bar */}
                                <motion.div
                                    className="absolute top-1/2 -translate-y-1/2"
                                    style={{ left: `calc(${progress}% - 8px)` }}
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                    }}
                                >
                                    <Heart className="w-4 h-4 text-white fill-white drop-shadow-lg" />
                                </motion.div>
                            </div>

                            <motion.div
                                className="text-sm md:text-base font-semibold text-rose-600 min-w-12 text-left"
                                animate={{ scale: remaining <= 3 ? [1, 1.1, 1] : 1 }}
                                transition={{ duration: 0.5, repeat: remaining <= 3 ? Infinity : 0 }}
                            >
                                {remaining}s
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Skip button */}
                    <AnimatePresence>
                        {allowSkip && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.4, delay: 1.5 }}
                                className="mt-8"
                            >
                                <button
                                    onClick={() => onFinish?.()}
                                    className="group relative px-8 py-3 bg-white text-rose-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Skip to Message
                                        <Heart className="w-4 h-4 group-hover:fill-current transition-all duration-300" />
                                    </span>
                                    <div className="absolute inset-0 bg-linear-to-r from-rose-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bottom decorative element */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.8 }}
                        className="mt-12 flex justify-center gap-2"
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
                                    duration: 1.5,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                }}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Custom shimmer animation styles */}
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    );
}