import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

interface ValueProp {
    icon: string;
    heading: string;
    description: string;
}

interface ValuePropsSectionProps {
    tag: string;
    heading: string;
    subhead: string;
    items: ValueProp[];
    activeTab: string;
}

export default function ValuePropsSection({ tag, heading, subhead, items, activeTab }: ValuePropsSectionProps) {
    return (
        <section className="py-20 sm:py-28 bg-gray-50 dark:bg-background-dark relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/3 rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
                            <span className="material-icons text-sm">star</span>
                            {tag}
                        </span>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab + '-vp'}
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

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab + '-vp-grid'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {items.map((item, idx) => (
                            <AnimatedSection key={idx} delay={idx * 0.08}>
                                <div className="group p-6 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/5 dark:hover:shadow-black/30 hover:-translate-y-1 h-full">
                                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <span className="material-icons text-gray-700 dark:text-gray-300">{item.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.heading}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
