import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

interface Industry {
    icon: string;
    heading: string;
    tagline: string;
    challenges: string[];
    solutions: string[];
}

interface IndustriesSectionProps {
    tag: string;
    heading: string;
    subhead: string;
    items: Industry[];
    activeTab: string;
}

/* ───── animation spring configs ───── */
const smoothSpring = { type: 'spring' as const, stiffness: 300, damping: 30 };
const gentleSpring = { type: 'spring' as const, stiffness: 200, damping: 25 };

export default function IndustriesSection({ tag, heading, subhead, items, activeTab }: IndustriesSectionProps) {
    const [selected, setSelected] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

    /* reset selection when switching product tabs */
    useEffect(() => { setSelected(0); setDirection(1); }, [activeTab]);

    const industry = items[selected];

    const handleSelect = (idx: number) => {
        setDirection(idx > selected ? 1 : -1);
        setSelected(idx);
    };

    /* slide variants for the showcase panel */
    const panelVariants = {
        enter: (dir: number) => ({ opacity: 0, x: dir * 60, scale: 0.97 }),
        center: { opacity: 1, x: 0, scale: 1 },
        exit: (dir: number) => ({ opacity: 0, x: dir * -60, scale: 0.97 }),
    };

    return (
        <section className="py-20 sm:py-28 bg-white dark:bg-black relative overflow-hidden">
            {/* ambient background blobs */}
            <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ─── Section Header ─── */}
                <AnimatedSection>
                    <div className="text-center mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
                            <span className="material-icons text-sm">category</span>
                            {tag}
                        </span>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab + '-ind'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">{heading}</h2>
                                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{subhead}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </AnimatedSection>

                {/* ─── Industry Selector Pills ─── */}
                <AnimatedSection delay={0.1}>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
                        {items.map((item, idx) => (
                            <motion.button
                                key={idx}
                                onClick={() => handleSelect(idx)}
                                className={`relative flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full text-sm font-medium transition-colors duration-200 outline-none focus:outline-none ${selected === idx
                                        ? 'text-white dark:text-black'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/60'
                                    }`}
                                whileHover={{ scale: selected === idx ? 1 : 1.04 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {/* Animated background pill for selected state */}
                                {selected === idx && (
                                    <motion.div
                                        layoutId={`industry-pill-bg-${activeTab}`}
                                        className="absolute inset-0 rounded-full bg-gray-900 dark:bg-white"
                                        transition={smoothSpring}
                                    />
                                )}
                                <span className={`material-icons text-base relative z-10 ${selected === idx ? 'text-white dark:text-black' : ''}`}>
                                    {item.icon}
                                </span>
                                <span className="relative z-10 hidden sm:inline">{item.heading}</span>
                            </motion.button>
                        ))}
                    </div>
                </AnimatedSection>

                {/* ─── Transformation Showcase ─── */}
                <AnimatedSection delay={0.15}>
                    <div className="relative">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={`${activeTab}-${selected}`}
                                custom={direction}
                                variants={panelVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ ...gentleSpring, duration: 0.45 }}
                                className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900/60 dark:via-gray-900/40 dark:to-gray-900/60 overflow-hidden"
                            >
                                {/* Top industry bar */}
                                <div className="flex items-center gap-3 px-6 sm:px-8 pt-6 sm:pt-8 pb-2">
                                    <motion.div
                                        className="w-12 h-12 rounded-2xl bg-gray-900 dark:bg-white flex items-center justify-center"
                                        initial={{ rotate: -90, scale: 0 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        transition={{ ...smoothSpring, delay: 0.1 }}
                                    >
                                        <span className="material-icons text-white dark:text-black text-xl">{industry.icon}</span>
                                    </motion.div>
                                    <div>
                                        <motion.h3
                                            className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.15, duration: 0.3 }}
                                        >
                                            {industry.heading}
                                        </motion.h3>
                                        <motion.p
                                            className="text-sm text-gray-500 dark:text-gray-400"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {industry.tagline}
                                        </motion.p>
                                    </div>
                                </div>

                                {/* ─── Split Panels: Challenges ↔ Solutions ─── */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 p-6 sm:p-8">
                                    {/* LEFT: Challenges */}
                                    <div className="relative pr-0 lg:pr-8 pb-8 lg:pb-0">
                                        <motion.div
                                            className="flex items-center gap-2 mb-5"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.15 }}
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-red-500/10 dark:bg-red-500/15 flex items-center justify-center">
                                                <span className="material-icons text-red-500 text-base">warning_amber</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-red-500 dark:text-red-400 uppercase tracking-wider">
                                                Without AI
                                            </h4>
                                        </motion.div>

                                        <div className="space-y-3">
                                            {industry.challenges.map((challenge, i) => (
                                                <motion.div
                                                    key={`${selected}-c-${i}`}
                                                    initial={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
                                                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                                    transition={{
                                                        delay: 0.2 + i * 0.08,
                                                        duration: 0.4,
                                                        ease: [0.22, 1, 0.36, 1],
                                                    }}
                                                    className="group flex items-start gap-3 p-3.5 rounded-xl bg-red-50/60 dark:bg-red-500/[0.06] border border-red-100 dark:border-red-500/10 hover:border-red-200 dark:hover:border-red-500/20 transition-all duration-300"
                                                >
                                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/10 dark:bg-red-500/15 flex items-center justify-center mt-0.5">
                                                        <span className="material-icons text-red-500 text-xs">close</span>
                                                    </div>
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{challenge}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CENTER DIVIDER — vertical on desktop, horizontal on mobile */}
                                    <div className="hidden lg:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex-col items-center justify-center z-10 pointer-events-none" style={{ paddingTop: '80px', paddingBottom: '32px' }}>
                                        {/* Gradient line */}
                                        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
                                        {/* Animated transformation icon */}
                                        <motion.div
                                            className="w-10 h-10 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center my-3 shadow-lg shadow-gray-900/20 dark:shadow-black/40"
                                            animate={{
                                                boxShadow: [
                                                    '0 0 0 0 rgba(59, 130, 246, 0)',
                                                    '0 0 0 8px rgba(59, 130, 246, 0.1)',
                                                    '0 0 0 0 rgba(59, 130, 246, 0)',
                                                ],
                                            }}
                                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                        >
                                            <motion.span
                                                className="material-icons text-white dark:text-black text-lg"
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                            >
                                                auto_awesome
                                            </motion.span>
                                        </motion.div>
                                        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
                                    </div>

                                    {/* Mobile divider */}
                                    <div className="flex lg:hidden items-center gap-3 py-2">
                                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
                                        <motion.div
                                            className="w-9 h-9 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center shadow-lg"
                                            animate={{
                                                boxShadow: [
                                                    '0 0 0 0 rgba(59, 130, 246, 0)',
                                                    '0 0 0 6px rgba(59, 130, 246, 0.1)',
                                                    '0 0 0 0 rgba(59, 130, 246, 0)',
                                                ],
                                            }}
                                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                        >
                                            <motion.span
                                                className="material-icons text-white dark:text-black text-base"
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                            >
                                                auto_awesome
                                            </motion.span>
                                        </motion.div>
                                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
                                    </div>

                                    {/* RIGHT: AI Solutions */}
                                    <div className="pl-0 lg:pl-8">
                                        <motion.div
                                            className="flex items-center gap-2 mb-5"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.15 }}
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center">
                                                <span className="material-icons text-emerald-500 text-base">auto_awesome</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-wider">
                                                With AI
                                            </h4>
                                        </motion.div>

                                        <div className="space-y-3">
                                            {industry.solutions.map((solution, i) => (
                                                <motion.div
                                                    key={`${selected}-s-${i}`}
                                                    initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
                                                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                                    transition={{
                                                        delay: 0.3 + i * 0.08,
                                                        duration: 0.4,
                                                        ease: [0.22, 1, 0.36, 1],
                                                    }}
                                                    className="group flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-500/[0.06] border border-emerald-100 dark:border-emerald-500/10 hover:border-emerald-200 dark:hover:border-emerald-500/20 transition-all duration-300"
                                                >
                                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center mt-0.5">
                                                        <motion.span
                                                            className="material-icons text-emerald-500 text-xs"
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ delay: 0.45 + i * 0.08, type: 'spring', stiffness: 500 }}
                                                        >
                                                            check
                                                        </motion.span>
                                                    </div>
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{solution}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom stat strip */}
                                <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                                    <motion.div
                                        className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 border-t border-gray-200 dark:border-gray-800"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {[
                                            { icon: 'speed', label: 'Resolution', value: '10×faster' },
                                            { icon: 'savings', label: 'Cost', value: '60% lower' },
                                            { icon: 'thumb_up', label: 'Satisfaction', value: '98%' },
                                        ].map((stat, i) => (
                                            <motion.div
                                                key={i}
                                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800/50"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.55 + i * 0.08 }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <span className="material-icons text-gray-500 dark:text-gray-400 text-base">{stat.icon}</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
                                                <span className="text-xs font-bold text-gray-900 dark:text-white">{stat.value}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
