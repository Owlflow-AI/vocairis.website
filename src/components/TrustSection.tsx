import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

interface TrustCard {
    icon: string;
    heading: string;
    description: string;
}

interface TrustData {
    tag: string;
    heading: string;
    subhead: string;
    cards: TrustCard[];
    banner: string;
}

interface TrustSectionProps {
    data: TrustData;
}

/* ─── SVG Illustrations ─── */
const illustrations: Record<string, JSX.Element> = {
    shield: (
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <motion.path
                d="M100 15 L170 50 V110 C170 150 140 180 100 195 C60 180 30 150 30 110 V50 Z"
                stroke="currentColor" strokeWidth="2" fill="none"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.path
                d="M100 45 L145 65 V105 C145 135 125 155 100 165 C75 155 55 135 55 105 V65 Z"
                stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05"
                initial={{ pathLength: 0, fillOpacity: 0 }} whileInView={{ pathLength: 1, fillOpacity: 0.05 }}
                transition={{ duration: 1.5, delay: 0.3 }}
            />
            <motion.path
                d="M82 105 L95 118 L122 88"
                stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
            />
            {[...Array(6)].map((_, i) => (
                <motion.circle
                    key={i} cx={100 + Math.cos(i * Math.PI / 3) * 85} cy={100 + Math.sin(i * Math.PI / 3) * 85}
                    r="3" fill="currentColor" fillOpacity="0.3"
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                />
            ))}
        </svg>
    ),
    visibility: (
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <motion.ellipse
                cx="100" cy="100" rx="75" ry="40"
                stroke="currentColor" strokeWidth="2" fill="none"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.2 }}
            />
            <motion.circle
                cx="100" cy="100" r="22"
                stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.08"
                initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
            />
            <motion.circle
                cx="100" cy="100" r="10"
                fill="currentColor" fillOpacity="0.2"
                initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8, type: "spring" }}
            />
            {/* Light rays */}
            {[...Array(8)].map((_, i) => {
                const angle = (i * Math.PI * 2) / 8;
                return (
                    <motion.line
                        key={i}
                        x1={100 + Math.cos(angle) * 50} y1={100 + Math.sin(angle) * 25}
                        x2={100 + Math.cos(angle) * 90} y2={100 + Math.sin(angle) * 45}
                        stroke="currentColor" strokeWidth="1" strokeOpacity="0.15"
                        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                        transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                    />
                );
            })}
        </svg>
    ),
    favorite: (
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            {/* Person silhouette */}
            <motion.circle
                cx="100" cy="70" r="18"
                stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"
                initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
            />
            <motion.path
                d="M65 130 C65 105 80 95 100 95 C120 95 135 105 135 130"
                stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            />
            {/* Connection lines to smaller circles */}
            {[
                { cx: 50, cy: 150 }, { cx: 150, cy: 150 },
                { cx: 40, cy: 100 }, { cx: 160, cy: 100 },
            ].map((pos, i) => (
                <g key={i}>
                    <motion.line
                        x1="100" y1="100" x2={pos.cx} y2={pos.cy}
                        stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="4 4"
                        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                    />
                    <motion.circle
                        cx={pos.cx} cy={pos.cy} r="8"
                        stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05"
                        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                        transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
                    />
                </g>
            ))}
        </svg>
    ),
    balance: (
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            {/* Scale beam */}
            <motion.line
                x1="50" y1="90" x2="150" y2="90"
                stroke="currentColor" strokeWidth="2"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
            />
            {/* Center pillar */}
            <motion.line
                x1="100" y1="90" x2="100" y2="155"
                stroke="currentColor" strokeWidth="2"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            />
            <motion.rect
                x="80" y="155" width="40" height="8" rx="4"
                stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.5 }}
            />
            {/* Left pan */}
            <motion.path
                d="M35 90 L50 90 L50 120 Q50 130 42.5 130 Q35 130 35 120 Z"
                stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05"
                initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            />
            {/* Right pan */}
            <motion.path
                d="M150 90 L165 90 L165 120 Q165 130 157.5 130 Q150 130 150 120 Z"
                stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05"
                initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            />
            {/* Equal sign */}
            <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }}>
                <rect x="90" y="60" width="20" height="3" rx="1.5" fill="currentColor" fillOpacity="0.3" />
                <rect x="90" y="68" width="20" height="3" rx="1.5" fill="currentColor" fillOpacity="0.3" />
            </motion.g>
        </svg>
    ),
    lock: (
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            {/* Lock body */}
            <motion.rect
                x="60" y="95" width="80" height="65" rx="10"
                stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05"
                initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ transformOrigin: 'center bottom' }}
            />
            {/* Lock shackle */}
            <motion.path
                d="M75 95 V70 C75 50 85 40 100 40 C115 40 125 50 125 70 V95"
                stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            />
            {/* Keyhole */}
            <motion.circle
                cx="100" cy="120" r="8"
                fill="currentColor" fillOpacity="0.15"
                initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
            />
            <motion.rect
                x="97" y="125" width="6" height="15" rx="3"
                fill="currentColor" fillOpacity="0.15"
                initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                transition={{ delay: 0.9 }}
                style={{ transformOrigin: 'center top' }}
            />
            {/* Data orbit rings */}
            {[45, 60, 75].map((r, i) => (
                <motion.circle
                    key={i} cx="100" cy="115" r={r}
                    stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" fill="none"
                    strokeDasharray="3 6"
                    initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
                />
            ))}
        </svg>
    ),
    check_circle: (
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            {/* Outer circle */}
            <motion.circle
                cx="100" cy="100" r="70"
                stroke="currentColor" strokeWidth="2" fill="none"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.2 }}
            />
            {/* Inner circle */}
            <motion.circle
                cx="100" cy="100" r="50"
                stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.03"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            />
            {/* Certificate ribbon */}
            <motion.path
                d="M75 100 L93 115 L130 78"
                stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
            />
            {/* Data dots */}
            {[...Array(12)].map((_, i) => {
                const angle = (i * Math.PI * 2) / 12;
                return (
                    <motion.circle
                        key={i}
                        cx={100 + Math.cos(angle) * 82} cy={100 + Math.sin(angle) * 82}
                        r="2" fill="currentColor" fillOpacity="0.2"
                        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.05 }}
                    />
                );
            })}
        </svg>
    ),
};

const iconToIllustration: Record<string, string> = {
    shield: 'shield',
    visibility: 'visibility',
    favorite: 'favorite',
    balance: 'balance',
    lock: 'lock',
    check_circle: 'check_circle',
};

export default function TrustSection({ data }: TrustSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 sm:py-32 bg-white dark:bg-black relative overflow-hidden">
            {/* Ambient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gray-500/[0.02] rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ─── Header ─── */}
                <AnimatedSection>
                    <div className="text-center mb-20">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
                            <span className="material-icons text-sm">verified_user</span>
                            {data.tag}
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
                            {data.heading}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{data.subhead}</p>
                    </div>
                </AnimatedSection>

                {/* ─── Interactive Trust Showcase ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

                    {/* LEFT: Trust Selector (vertical tabs) */}
                    <div className="lg:col-span-5 space-y-1">
                        {data.cards.map((card, idx) => (
                            <AnimatedSection key={idx} delay={idx * 0.06}>
                                <motion.button
                                    onClick={() => setActiveIndex(idx)}
                                    className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 outline-none focus:outline-none relative group ${activeIndex === idx
                                        ? 'bg-gray-900 dark:bg-white'
                                        : 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900'
                                        }`}
                                    whileTap={{ scale: 0.985 }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${activeIndex === idx
                                            ? 'bg-white/10 dark:bg-black/10'
                                            : 'bg-gray-100 dark:bg-gray-800'
                                            }`}>
                                            <span className={`material-icons text-lg transition-colors duration-300 ${activeIndex === idx
                                                ? 'text-white dark:text-black'
                                                : 'text-gray-600 dark:text-gray-400'
                                                }`}>
                                                {card.icon}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className={`text-base font-bold mb-1 transition-colors duration-300 ${activeIndex === idx
                                                ? 'text-white dark:text-black'
                                                : 'text-gray-900 dark:text-white'
                                                }`}>
                                                {card.heading}
                                            </h3>
                                            <p className={`text-sm leading-relaxed transition-all duration-300 overflow-hidden ${activeIndex === idx
                                                ? 'text-gray-300 dark:text-gray-600 max-h-20 opacity-100 mt-1'
                                                : 'text-gray-500 dark:text-gray-500 max-h-0 opacity-0'
                                                }`}>
                                                {card.description}
                                            </p>
                                        </div>
                                        {/* Arrow indicator */}
                                        <span className={`material-icons text-lg mt-1 transition-all duration-300 hidden lg:block ${activeIndex === idx
                                            ? 'text-white/60 dark:text-black/60 translate-x-0 opacity-100'
                                            : 'text-transparent -translate-x-2 opacity-0'
                                            }`}>
                                            arrow_forward
                                        </span>
                                    </div>
                                </motion.button>
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* RIGHT: Animated SVG Illustration Panel */}
                    <div className="lg:col-span-7">
                        <div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="relative aspect-[4/3] max-w-xl mx-auto rounded-3xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-10 sm:p-14 overflow-hidden"
                                >
                                    {/* Background pattern */}
                                    <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
                                        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                                    />

                                    {/* SVG illustration */}
                                    <div className="relative z-10 w-full h-full text-gray-900 dark:text-white">
                                        {illustrations[iconToIllustration[data.cards[activeIndex].icon]] || illustrations.shield}
                                    </div>

                                    {/* Feature label overlay */}
                                    <motion.div
                                        className="absolute bottom-6 left-6 right-6"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.4 }}
                                    >
                                        <div className="bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-xl px-5 py-4 border border-gray-200/50 dark:border-gray-700/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center shrink-0">
                                                    <span className="material-icons text-white dark:text-black text-sm">
                                                        {data.cards[activeIndex].icon}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                                                        {data.cards[activeIndex].heading}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {data.cards[activeIndex].description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* ─── Bottom Banner ─── */}
                <AnimatedSection delay={0.3}>
                    <div className="mt-20 w-full max-w-4xl mx-auto p-5 rounded-2xl bg-gray-900 dark:bg-white/5 border border-gray-800 dark:border-gray-700 text-center">
                        <div className="flex items-center justify-center gap-3">
                            <span className="material-icons text-white dark:text-gray-300 text-xl">shield</span>
                            <p className="text-sm text-gray-300 dark:text-gray-400 font-medium">{data.banner}</p>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
