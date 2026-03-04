import AnimatedSection from './AnimatedSection';

export default function RecruiterComparisonSection() {
    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900/30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
                            <span className="material-icons text-sm">compare_arrows</span>
                            The Difference
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6">
                            Hiring Intelligence vs. Candidate Tracking
                        </h2>
                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                            ATS systems simply track candidates. RecruiterAI actually <i>evaluates</i> them.
                        </p>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <div className="bg-white dark:bg-surface-dark rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-200 dark:border-gray-800">
                            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
                                <span className="font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-sm">Feature Category</span>
                            </div>
                            <div className="p-6 bg-blue-50/50 dark:bg-blue-900/10 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
                                <div className="flex items-center gap-2">
                                    <span className="material-icons text-blue-500">auto_awesome</span>
                                    <span className="font-bold text-blue-900 dark:text-blue-100 text-lg">RecruiterAI</span>
                                </div>
                            </div>
                            <div className="p-6 flex items-center justify-center bg-white dark:bg-surface-dark">
                                <span className="font-bold text-gray-500 dark:text-gray-400 text-lg">Typical ATS System</span>
                            </div>
                        </div>

                        {[
                            {
                                category: 'Core Function',
                                aiHeader: 'AI Interview & Evaluation Engine:',
                                aiPoints: ['Video & Voice Analysis', 'Skill & Behavior Scoring', 'Predictive Insights'],
                                atsHeader: 'Applicant Tracking System:',
                                atsPoints: ['Resume Database', 'Workflow Management', 'Basic Screening']
                            },
                            {
                                category: 'Objectivity',
                                aiHeader: 'Neutral & Objective:',
                                aiPoints: ['Independent AI Analysis', 'Bias Monitoring'],
                                atsHeader: 'Integrated & Biased?',
                                atsPoints: ['In-house AI Scoring', 'Potential Bias Risk']
                            },
                            {
                                category: 'Reporting',
                                aiHeader: 'Advanced Analytics:',
                                aiPoints: ['Deep Candidate Insights', 'Outcome Predictions'],
                                atsHeader: 'Basic Reporting:',
                                atsPoints: ['Pipeline Stats', 'Time to Hire']
                            },
                            {
                                category: 'Integration',
                                aiHeader: 'Cross-Platform Integration:',
                                aiPoints: ['Connects to Any ATS', 'Unified Data Layer'],
                                atsHeader: 'Single System Locked:',
                                atsPoints: ['Vendor Lock-In', 'Limited Flexibility']
                            }
                        ].map((row, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-3 border-b border-gray-100 dark:border-gray-800/60 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                                <div className="p-6 md:p-8 flex items-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800/60 md:bg-transparent bg-gray-50/30 dark:bg-gray-900/20">
                                    <span className="font-semibold text-gray-900 dark:text-gray-200">{row.category}</span>
                                </div>
                                <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800/60 bg-blue-50/30 dark:bg-blue-900/5">
                                    <div className="font-semibold text-gray-900 dark:text-white mb-3">{row.aiHeader}</div>
                                    <ul className="space-y-2">
                                        {row.aiPoints.map((pt, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <span className="material-icons text-[16px] text-green-500 mt-0.5">check_circle</span>
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-6 md:p-8 opacity-70">
                                    <div className="font-semibold text-gray-700 dark:text-gray-300 mb-3">{row.atsHeader}</div>
                                    <ul className="space-y-2">
                                        {row.atsPoints.map((pt, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="material-icons text-[16px] text-gray-400 mt-0.5">remove</span>
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
