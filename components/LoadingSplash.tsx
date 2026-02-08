'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type LoadingSplashProps = {
    duration?: number; // seconds
    message?: string;
    onFinish?: () => void;
    allowSkip?: boolean;
};

export default function LoadingSplash({
    duration = 60,
    message = "Welcome — preparing something special...",
    onFinish,
    allowSkip = true,
}: LoadingSplashProps) {
    const [remaining, setRemaining] = useState(duration);

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-pink-600 via-purple-600 to-indigo-700 text-white">
            <div className="max-w-xl w-full px-6 py-10 text-center">
                <motion.div
                    className="text-6xl mb-6"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    🎉💖✨
                </motion.div>

                <h2 className="text-2xl md:text-4xl font-bold mb-3">{message}</h2>
                <p className="text-sm text-white/90 mb-6">Sit tight — this may take a moment.</p>

                <div className="flex items-center justify-center gap-3">
                    <div className="w-36 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white"
                            style={{ width: `${Math.round(((duration - remaining) / duration) * 100)}%` }}
                        />
                    </div>
                    <div className="text-sm font-medium">{remaining}s</div>
                </div>

                <div className="mt-6 flex justify-center gap-4">
                    {allowSkip && (
                        <button
                            className="bg-white text-pink-600 px-4 py-2 rounded-full font-semibold"
                            onClick={() => onFinish?.()}
                        >
                            Skip
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
