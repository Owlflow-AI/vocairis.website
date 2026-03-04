import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

export default function RecruiterPricingSection() {
    const [hires, setHires] = useState<number>(50);
    const costPerHire = 15;
    const totalCost = hires * costPerHire;

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHires(Number(e.target.value));
    };

    return (
        <section className="py-24 bg-white dark:bg-black relative overflow-hidden" id="pricing">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 text-xs font-semibold uppercase tracking-wider mb-4">
                            <span className="material-icons text-sm">payments</span>
                            Simple Pricing
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6">
                            Pay only for what you need.
                        </h2>
                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                            No hidden fees, no complex tiers. Just a flat rate per successful candidate evaluation.
                        </p>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-none text-center relative overflow-hidden">

                        {/* Interactive Calculator */}
                        <div className="max-w-2xl mx-auto">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Estimate Your Investment</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-10">Use the slider below to calculate your estimated monthly cost based on volume.</p>

                            <div className="mb-12">
                                <div className="flex justify-between items-end mb-4">
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        Candidates Evaluated / Month
                                    </label>
                                    <div className="text-3xl font-bold font-serif text-blue-600 dark:text-blue-400">
                                        {hires}
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="10"
                                    max="500"
                                    step="10"
                                    value={hires}
                                    onChange={handleSliderChange}
                                    className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
                                />
                                <div className="flex justify-between mt-2 text-xs text-gray-400">
                                    <span>10</span>
                                    <span>500+</span>
                                </div>
                            </div>

                            {/* Total Cost Display */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 mb-10">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="text-left">
                                        <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Estimated Cost</div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-bold font-serif text-gray-900 dark:text-white">${totalCost}</span>
                                            <span className="text-sm text-gray-500 dark:text-gray-500">/mo</span>
                                        </div>
                                    </div>

                                    <div className="h-16 w-px bg-gray-200 dark:bg-gray-800 hidden sm:block"></div>

                                    <div className="text-left sm:text-right">
                                        <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Flat Rate</div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">${costPerHire}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">per evaluated candidate</div>
                                    </div>
                                </div>
                            </div>

                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 w-full sm:w-auto">
                                Start Your Trial Today
                            </button>
                        </div>

                    </div>
                </AnimatedSection>

                {/* Enterprise Note */}
                <AnimatedSection delay={0.4}>
                    <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        Evaluating more than 500 candidates per month? <a href="#" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Contact us</a> for volume discounts and enterprise integrations.
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
