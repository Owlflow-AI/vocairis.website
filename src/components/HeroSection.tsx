import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

interface HeroData {
    icon: string;
    heading: string;
    headingHighlight: string;
    subhead: string;
    cta: string;
    footer?: string;
    metrics?: { value: string; label: string }[];
}

interface HeroSectionProps {
    data: HeroData;
    activeTab: string;
    onGoToContact?: () => void;
}

export default function HeroSection({ data, activeTab, onGoToContact }: HeroSectionProps) {
    const highlightWord = (text: string, highlight: string) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'i'));
        return parts.map((part, i) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
                <span key={i} className="font-serif italic text-gray-600 dark:text-gray-300">
                    {part}
                </span>
            ) : (
                <span key={i}>{part}</span>
            )
        );
    };

    return (
        <section className="relative pt-40 pb-20 sm:pt-48 sm:pb-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-grid-pattern dark:block hidden opacity-30" />
            <div className="absolute inset-0 light-bg-grid-pattern dark:hidden block opacity-40" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <AnimatedSection delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 mb-8 animate-float">
                        <span className="material-icons text-sm text-gray-600 dark:text-gray-400">{data.icon}</span>
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Powered by VocAIris</span>
                    </div>
                </AnimatedSection>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-6">
                            {highlightWord(data.heading, data.headingHighlight)}
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            {data.subhead}
                        </p>
                    </motion.div>
                </AnimatePresence>

                <AnimatedSection delay={0.3}>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={onGoToContact} className="bg-gray-900 dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full text-base font-semibold hover:opacity-90 transition-all hover:shadow-2xl hover:shadow-gray-900/20 dark:hover:shadow-white/20 hover:-translate-y-0.5 inline-block text-center cursor-pointer">
                            {data.cta}
                        </button>
                    </div>
                </AnimatedSection>

                {data.metrics && (
                    <AnimatedSection delay={0.4}>
                        <div className="mt-12 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            {data.metrics.map((metric, i) => (
                                <div key={i} className="flex flex-col items-center p-4 rounded-xl bg-gray-50/50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800">
                                    <div className="text-3xl font-bold font-serif text-gray-900 dark:text-white mb-1">{metric.value}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                )}

                {data.footer && (
                    <AnimatedSection delay={0.5}>
                        <div className="mt-6 text-sm font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase">
                            {data.footer}
                        </div>
                    </AnimatedSection>
                )}

                <AnimatedSection delay={0.5}>
                    <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-40">
                        {['Microsoft', 'Amazon', 'Google', 'Stripe', 'Slack'].map((brand) => (
                            <span key={brand} className="text-sm font-bold tracking-widest uppercase text-gray-400 dark:text-gray-600">{brand}</span>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
