import AnimatedSection from './AnimatedSection';

export default function EvaluationEngineSection() {
    return (
        <section className="py-24 bg-white dark:bg-black relative overflow-hidden border-t border-gray-100 dark:border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">
                            <span className="material-icons text-sm">psychology</span>
                            The Evaluation Engine
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6">
                            A structured, multi-layered AI evaluation.
                        </h2>
                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                            It goes far beyond simple keyword matching to deeply understand candidate competency, while remaining entirely objective.
                        </p>
                    </div>
                </AnimatedSection>

                {/* Core Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <AnimatedSection delay={0.1}>
                        <div className="bg-gray-50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl h-full hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-6">
                                <span className="material-icons text-gray-700 dark:text-gray-300">security</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Prompt Injection Guard Rails</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                Candidates cannot manipulate or hijack the AI. Built-in detection blocks prompt injection, off-topic steering, and adversarial inputs.
                            </p>
                            <ul className="space-y-2">
                                {['Prompt injection detection & blocking', 'Off-topic & manipulation flagging', 'Immutable evaluation criteria per session'].map((text, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="material-icons text-[14px] text-gray-400 dark:text-gray-500 mt-0.5">verified</span>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <div className="bg-gray-50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl h-full hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-6">
                                <span className="material-icons text-gray-700 dark:text-gray-300">balance</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Zero Demographic Data = Zero Bias</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                No gender, race, age, location, or any protected characteristic is ever collected or considered. Evaluation is purely skills-based.
                            </p>
                            <ul className="space-y-2">
                                {['No protected characteristics collected', 'No name or accent inference', '100% job-relevant evaluation only'].map((text, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="material-icons text-[14px] text-gray-400 dark:text-gray-500 mt-0.5">verified</span>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <div className="bg-gray-50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl h-full hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-6">
                                <span className="material-icons text-gray-700 dark:text-gray-300">analytics</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Fair & Detailed Report Card</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                Every candidate receives a structured scorecard with skill alignment and competency breakdowns — giving recruiters insights to make the call.
                            </p>
                            <ul className="space-y-2">
                                {['Structured scorecard for every candidate', 'No ranking or stacking of candidates', 'No bias from historical hire data'].map((text, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <span className="material-icons text-[14px] text-gray-400 dark:text-gray-500 mt-0.5">verified</span>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </AnimatedSection>
                </div>

                {/* Additional Capabilities Grid */}
                <AnimatedSection delay={0.4}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: 'Structured Evaluation', desc: 'Dynamic interview questions generated from each candidate\'s resume and JD.', icon: 'format_list_bulleted' },
                            { title: 'Actionable Scores', desc: 'Skill alignment, communication ratings, and behavioral competency breakdowns.', icon: 'score' },
                            { title: 'Full Audit Trail', desc: 'Recorded calls, interviews, and score rationales — all reviewable and shareable.', icon: 'history' },
                            { title: 'Tamper-Proof Results', desc: 'Evaluation outputs are immutable once generated — no post-hoc editing.', icon: 'lock' },
                        ].map((feature, i) => (
                            <div key={i} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6 rounded-2xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="material-icons text-gray-500 dark:text-gray-400">{feature.icon}</span>
                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{feature.title}</h4>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
