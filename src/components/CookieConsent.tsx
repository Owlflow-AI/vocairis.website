import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!localStorage.getItem('cookie-consent')) {
                setVisible(true);
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const accept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 inset-x-0 z-[60] p-4 sm:p-6"
                >
                    <div className="max-w-3xl mx-auto bg-gray-900 dark:bg-white border border-gray-700 dark:border-gray-200 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
                        <div className="flex items-start gap-3 flex-1">
                            <span className="material-icons text-gray-400 dark:text-gray-500 text-[20px] mt-0.5 flex-shrink-0">cookie</span>
                            <p className="text-sm text-gray-300 dark:text-gray-600 leading-relaxed">
                                We use cookies to enhance your experience and analyze site traffic. By continuing, you agree to our{' '}
                                <a href="#" className="underline text-white dark:text-gray-900 hover:opacity-80 transition-opacity">Privacy Policy</a>.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
                            <button
                                onClick={accept}
                                className="flex-1 sm:flex-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                            >
                                Accept
                            </button>
                            <button
                                onClick={accept}
                                className="flex-1 sm:flex-none border border-gray-600 dark:border-gray-300 text-gray-400 dark:text-gray-500 px-5 py-2 rounded-full text-sm font-medium hover:text-white dark:hover:text-gray-900 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
