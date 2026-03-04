import { useState } from 'react';
import AnimatedSection from './AnimatedSection';

interface RecruiterPricingSectionProps {
    onGoToContact?: () => void;
}

export default function RecruiterPricingSection({ onGoToContact }: RecruiterPricingSectionProps) {
    const [resumeCount, setResumeCount] = useState<number>(100);
    const [phoneCandidates, setPhoneCandidates] = useState<number>(20);
    const [phoneMin, setPhoneMin] = useState<number>(5);
    const [videoCandidates, setVideoCandidates] = useState<number>(10);
    const [videoMin, setVideoMin] = useState<number>(10);

    const rates = {
        resume: 0.25,
        phonePerMin: 0.45,
        videoPerMin: 0.55
    };

    const resumeTotal = resumeCount * rates.resume;
    const phoneTotal = phoneCandidates * phoneMin * rates.phonePerMin;
    const videoTotal = videoCandidates * videoMin * rates.videoPerMin;
    const estimatedTotal = resumeTotal + phoneTotal + videoTotal;

    return (
        <section className="py-24 bg-white dark:bg-black relative overflow-hidden" id="pricing">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection>
                    <div className="text-center mb-10">
                        <h2 className="font-serif text-4xl sm:text-5xl lg:text-5xl text-gray-900 dark:text-white mb-4 tracking-tight">
                            Simple, Transparent <span className="text-gray-500 dark:text-gray-400">Pricing</span>
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                            Pay only for what you use — no subscriptions, no hidden fees
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                <span className="material-icons text-gray-500 text-[18px]">group</span>
                                Unlimited Users
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                <span className="material-icons text-gray-500 text-[18px]">security</span>
                                Enterprise Login (SSO)
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                <span className="material-icons text-gray-500 text-[18px]">call</span>
                                2 Phone Numbers Included
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Minimalist Pricing Outline (No Cards Theme) */}
                <AnimatedSection delay={0.1}>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-20 mb-16 opacity-80 mt-12 relative">
                        <div className="text-center flex flex-col items-center">
                            <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl flex items-center justify-center mb-4 border border-gray-200 dark:border-gray-700 shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-none">
                                <span className="material-icons text-2xl">description</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Resume Matching</h3>
                            <div className="flex items-baseline justify-center gap-1 text-gray-700 dark:text-gray-300">
                                <span className="text-3xl font-bold font-serif">${rates.resume.toFixed(2)}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">per resume</div>
                        </div>

                        <div className="hidden md:block w-px h-16 bg-gray-200 dark:bg-gray-800"></div>

                        <div className="text-center flex flex-col items-center">
                            <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl flex items-center justify-center mb-4 border border-gray-200 dark:border-gray-700 shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-none">
                                <span className="material-icons text-2xl">call</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">AI Phone Call</h3>
                            <div className="flex items-baseline justify-center gap-1 text-gray-700 dark:text-gray-300">
                                <span className="text-3xl font-bold font-serif">${rates.phonePerMin.toFixed(2)}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">per minute</div>
                        </div>

                        <div className="hidden md:block w-px h-16 bg-gray-200 dark:bg-gray-800"></div>

                        <div className="text-center flex flex-col items-center">
                            <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl flex items-center justify-center mb-4 border border-gray-200 dark:border-gray-700 shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-none">
                                <span className="material-icons text-2xl">videocam</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">AI Video Call</h3>
                            <div className="flex items-baseline justify-center gap-1 text-gray-700 dark:text-gray-300">
                                <span className="text-3xl font-bold font-serif">${rates.videoPerMin.toFixed(2)}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">per minute</div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Calculator Area */}
                <AnimatedSection delay={0.2}>
                    <div className="bg-white dark:bg-[#0B0F19] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden max-w-3xl mx-auto">
                        <div className="bg-gray-50 dark:bg-gray-900 p-6 border-b border-gray-200 dark:border-gray-800 text-center flex items-center justify-center">
                            <span className="material-icons text-gray-500 dark:text-gray-400 mr-2 text-xl">calculate</span>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Cost Calculator
                            </h3>
                        </div>

                        <div className="p-6 md:p-8">
                            {/* Resume Row */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-5 border-b border-gray-100 dark:border-gray-800/60">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl flex items-center justify-center">
                                        <span className="material-icons text-[20px]">description</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white text-[15px]">Resume Matches</div>
                                        <div className="text-xs text-gray-500">1 resume × ${rates.resume.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pl-14 md:pl-0">
                                    <div className="flex items-center gap-3">
                                        <label className="text-xs text-gray-500 font-medium">Count</label>
                                        <input type="number" min="0" value={resumeCount} onChange={(e) => setResumeCount(Math.max(0, parseInt(e.target.value) || 0))} className="w-20 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-sm text-gray-900 dark:text-white text-center focus:outline-none focus:border-gray-400 transition-colors" />
                                    </div>
                                    <div className="text-xl font-bold font-serif text-gray-800 dark:text-gray-200 w-24 text-right">
                                        ${resumeTotal.toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            {/* Phone Screen Row */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-5 border-b border-gray-100 dark:border-gray-800/60">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl flex items-center justify-center">
                                        <span className="material-icons text-[20px]">phone_in_talk</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white text-[15px]">AI Phone Screening</div>
                                        <div className="text-xs text-gray-500">1 × 5 min × ${rates.phonePerMin.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap md:flex-nowrap items-center justify-between md:justify-end gap-x-6 gap-y-3 w-full md:w-auto pl-14 md:pl-0">
                                    <div className="flex items-center gap-3">
                                        <label className="text-xs text-gray-500 font-medium">Candidates</label>
                                        <input type="number" min="0" value={phoneCandidates} onChange={(e) => setPhoneCandidates(Math.max(0, parseInt(e.target.value) || 0))} className="w-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-sm text-gray-900 dark:text-white text-center focus:outline-none focus:border-gray-400 transition-colors" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <label className="text-xs text-gray-500 font-medium whitespace-nowrap">Avg Min</label>
                                        <input type="number" min="0" value={phoneMin} onChange={(e) => setPhoneMin(Math.max(0, parseFloat(e.target.value) || 0))} className="w-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-sm text-gray-900 dark:text-white text-center focus:outline-none focus:border-gray-400 transition-colors" />
                                    </div>
                                    <div className="text-xl font-bold font-serif text-gray-800 dark:text-gray-200 w-full md:w-24 text-right">
                                        ${phoneTotal.toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            {/* Video Screen Row */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl flex items-center justify-center">
                                        <span className="material-icons text-[20px]">videocam</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white text-[15px]">AI Video Interview</div>
                                        <div className="text-xs text-gray-500">1 × 10 min × ${rates.videoPerMin.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap md:flex-nowrap items-center justify-between md:justify-end gap-x-6 gap-y-3 w-full md:w-auto pl-14 md:pl-0">
                                    <div className="flex items-center gap-3">
                                        <label className="text-xs text-gray-500 font-medium">Candidates</label>
                                        <input type="number" min="0" value={videoCandidates} onChange={(e) => setVideoCandidates(Math.max(0, parseInt(e.target.value) || 0))} className="w-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-sm text-gray-900 dark:text-white text-center focus:outline-none focus:border-gray-400 transition-colors" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <label className="text-xs text-gray-500 font-medium whitespace-nowrap">Avg Min</label>
                                        <input type="number" min="0" value={videoMin} onChange={(e) => setVideoMin(Math.max(0, parseFloat(e.target.value) || 0))} className="w-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-sm text-gray-900 dark:text-white text-center focus:outline-none focus:border-gray-400 transition-colors" />
                                    </div>
                                    <div className="text-xl font-bold font-serif text-gray-800 dark:text-gray-200 w-full md:w-24 text-right">
                                        ${videoTotal.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Estimated Total Bar */}
                        <div className="bg-gray-900 dark:bg-gray-800 p-6 md:px-8 border-t border-gray-800 dark:border-gray-700/50 flex items-center justify-between">
                            <span className="text-white font-medium text-lg">Estimated Total</span>
                            <span className="text-4xl font-bold font-serif text-white">${estimatedTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                    <div className="flex justify-center mt-12">
                        <button onClick={onGoToContact} className="bg-gray-900 dark:bg-white text-white dark:text-black px-10 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-all hover:shadow-xl hover:shadow-gray-900/10 hover:-translate-y-0.5 cursor-pointer inline-block text-center">
                            Start Free Trial
                        </button>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
