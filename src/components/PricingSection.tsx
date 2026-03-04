import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

interface PricingFeature {
    icon: string;
    label: string;
}

interface PricingData {
    heading: string;
    headingHighlight: string;
    subhead: string;
    sliderLabel: string;
    sliderValue: string;
    sliderDefault: number;
    sliderPercent: number;
    sliderMin: number;
    sliderMax: number;
    checkmarks: string[];
    estimateDescription: string;
    price: string;
    priceSubtext: string;
    features: PricingFeature[];
}

interface PricingSectionProps {
    data: PricingData;
    activeTab: string;
    onGoToContact?: () => void;
}

export default function PricingSection({ data, activeTab, onGoToContact }: PricingSectionProps) {
    return (
        <section id="pricing" className="py-20 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="max-w-3xl text-center mx-auto mb-16 space-y-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab + '-pricing-header'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                                    {data.heading} <br /> <span className="text-gray-400 dark:text-gray-500">{data.headingHighlight}</span>
                                </h2>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-normal leading-relaxed max-w-2xl mx-auto mt-4">
                                    {data.subhead}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <div className="w-full max-w-5xl mx-auto border border-gray-200 dark:border-gray-800 rounded-3xl p-1 md:p-2 shadow-2xl">
                        <div className="bg-gray-50 dark:bg-surface-dark rounded-[1.3rem] overflow-hidden flex flex-col lg:flex-row">
                            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800">
                                <div className="mb-10">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Estimate your volume</h3>
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={activeTab + '-est-desc'}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-gray-600 dark:text-gray-400 text-sm"
                                        >
                                            {data.estimateDescription}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>

                                <div className="mb-12">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab + '-slider'}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="flex justify-between items-end mb-4">
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">{data.sliderLabel}</label>
                                                <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded-md text-sm font-bold">
                                                    {data.sliderValue}
                                                </div>
                                            </div>

                                            <div className="relative w-full h-8 flex items-center group">
                                                <div className="absolute w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gray-900 dark:bg-white" style={{ width: `${data.sliderPercent}%` }}></div>
                                                </div>
                                                <input className="absolute w-full z-20 opacity-0 cursor-pointer" max={data.sliderMax} min={data.sliderMin} type="range" value={data.sliderDefault} readOnly />
                                                <div className="absolute w-6 h-6 rounded-full bg-white dark:bg-gray-900 border-4 border-gray-900 dark:border-white shadow-lg z-10 pointer-events-none transition-all group-hover:scale-110" style={{ left: `${data.sliderPercent}%`, marginLeft: '-12px' }}></div>
                                            </div>
                                            <div className="flex justify-between mt-3 text-xs text-gray-500 dark:text-gray-400 font-medium font-mono">
                                                <span>{data.sliderMin.toLocaleString()}</span>
                                                <span>{data.sliderMax.toLocaleString()}+</span>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="space-y-4">
                                    {data.checkmarks.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                            <span className="material-icons text-gray-900 dark:text-white text-[20px]">check_circle</span>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full lg:w-[420px] bg-white dark:bg-black p-8 md:p-12 flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gray-200 dark:bg-gray-800 opacity-30 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                                <div className="relative z-10">
                                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Estimated Cost</p>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab + '-price'}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="flex items-baseline gap-1 mb-2">
                                                <span className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">{data.price}</span>
                                                <span className="text-xl text-gray-500 dark:text-gray-400">/mo</span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-8 font-mono">{data.priceSubtext}</p>
                                        </motion.div>
                                    </AnimatePresence>

                                    <button onClick={onGoToContact} className="w-full h-12 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black text-base font-bold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] mb-8 flex items-center justify-center gap-2 group">
                                        <span>Start Free Trial</span>
                                        <span className="material-icons text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                                    </button>

                                    <div className="space-y-4 border-t border-gray-200 dark:border-gray-800 pt-8">
                                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">Everything Included</p>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeTab + '-features'}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="grid grid-cols-1 gap-y-3"
                                            >
                                                {data.features.map((item) => (
                                                    <div key={item.icon} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                                                        <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                                                            <span className="material-icons text-sm text-gray-900 dark:text-white">{item.icon}</span>
                                                        </div>
                                                        <span>{item.label}</span>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                    <div className="mt-16 text-center max-w-2xl mx-auto">
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Hiring at massive scale?</p>
                        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition-colors">
                                <span className="material-icons">domain</span>
                            </div>
                            <div className="text-left">
                                <h4 className="text-gray-900 dark:text-white font-semibold text-sm">Enterprise Plan</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-xs">Custom volume discounts &amp; API access</p>
                            </div>
                            <span className="material-icons text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors ml-2">chevron_right</span>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
