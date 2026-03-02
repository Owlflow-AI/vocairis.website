import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

interface PipelineStep {
    badge: number;
    heading: string;
    description: string;
    panel: Record<string, unknown>;
}

interface PipelineSectionProps {
    heading: string;
    steps: PipelineStep[];
    activeTab: string;
}

function PipelinePanel({ panel }: { panel: Record<string, unknown> }) {
    const renderValue = (val: unknown): string => {
        if (typeof val === 'string' || typeof val === 'number') return String(val);
        return '';
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700/50 space-y-3">
            {panel.subhead && (
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    {renderValue(panel.subhead)}
                </h4>
            )}

            {/* Details list */}
            {Array.isArray(panel.details) && (
                <div className="space-y-2">
                    {(panel.details as Array<{ label: string; value: string; highlight?: boolean }>).map((d, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">{d.label}</span>
                            <span className={`font-semibold ${d.highlight ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                                {d.value}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Skills (recruiter resume panel) */}
            {Array.isArray(panel.skills) && (
                <div className="space-y-2 pt-2">
                    {(panel.skills as Array<{ name: string; score: number }>).map((s, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-600 dark:text-gray-400">{s.name}</span>
                                <span className="text-gray-900 dark:text-white font-semibold">{s.score}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${s.score}%` }}
                                    transition={{ duration: 1, delay: i * 0.15 }}
                                    className={`h-full rounded-full ${s.score > 70 ? 'bg-green-500' : s.score > 50 ? 'bg-yellow-500' : 'bg-red-400'}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Checks (linkedin or diagnosis) */}
            {Array.isArray(panel.checks) && (
                <div className="space-y-2 pt-1">
                    {(panel.checks as Array<{ name: string; status: string }>).map((c, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                            <span className={`material-icons text-sm ${c.status === 'pass' ? 'text-green-500' : c.status === 'warning' ? 'text-yellow-500' : 'text-orange-500'}`}>
                                {c.status === 'pass' ? 'check_circle' : c.status === 'warning' ? 'warning' : 'error'}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">{c.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Comparisons (linkedin) */}
            {Array.isArray(panel.comparisons) && (
                <div className="space-y-1.5 pt-1">
                    {(panel.comparisons as Array<{ company: string; resume: string; linkedin: string; status: string }>).map((c, i) => (
                        <div key={i} className="flex items-center text-xs gap-2">
                            <span className={`material-icons text-xs ${c.status === 'match' ? 'text-green-500' : 'text-yellow-500'}`}>
                                {c.status === 'match' ? 'check_circle' : 'warning'}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300 font-medium flex-1">{c.company}</span>
                            <span className="text-gray-400">{c.resume}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Candidates (human review) */}
            {Array.isArray(panel.candidates) && (
                <div className="space-y-2 pt-1">
                    {(panel.candidates as Array<{ name: string; resumeScore: number; linkedinScore: number; status: string }>).map((c, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs p-2 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/30">
                            <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-300">
                                {c.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                                <span className="text-gray-900 dark:text-white font-medium">{c.name}</span>
                                <div className="text-gray-400 text-[10px]">Resume: {c.resumeScore}% • LinkedIn: {c.linkedinScore}%</div>
                            </div>
                            {c.status !== 'pending' && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium">
                                    Approved
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Category scores (results review) */}
            {Array.isArray(panel.categoryScores) && (
                <div className="space-y-2 pt-1">
                    {panel.overallScore && (
                        <div className="text-center py-2">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{renderValue(panel.overallScore)}%</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Overall Score</div>
                        </div>
                    )}
                    {(panel.categoryScores as Array<{ name: string; score: number }>).map((c, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-400">{c.name}</span>
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${c.score}%` }} />
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white w-8 text-right">{c.score}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Insights */}
            {Array.isArray(panel.insights) && (
                <div className="space-y-1.5 pt-1">
                    {(panel.insights as Array<{ text: string; status: string }>).map((ins, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                            <span className={`material-icons text-sm ${ins.status === 'pass' ? 'text-green-500' : 'text-yellow-500'}`}>
                                {ins.status === 'pass' ? 'check_circle' : 'warning'}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">{ins.text}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Actions (receptionist confirmation) */}
            {Array.isArray(panel.actions) && typeof (panel.actions as unknown[])[0] === 'object' && (
                <div className="space-y-2 pt-1">
                    {(panel.actions as Array<{ type?: string; text: string; status?: string; detail?: string }>).map((a, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs p-2 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/30">
                            <span className="material-icons text-sm text-green-500">check_circle</span>
                            <div className="flex-1">
                                <span className="text-gray-700 dark:text-gray-300">{a.text}</span>
                                {a.detail && <div className="text-gray-400 text-[10px]">{a.detail}</div>}
                            </div>
                            {a.status && <span className="text-[10px] text-green-600 dark:text-green-400 font-medium">{a.status}</span>}
                        </div>
                    ))}
                </div>
            )}

            {/* String actions */}
            {Array.isArray(panel.actions) && typeof (panel.actions as unknown[])[0] === 'string' && (
                <div className="space-y-1.5 pt-1">
                    {(panel.actions as string[]).map((a, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                            <span className="material-icons text-sm text-green-500">check_circle</span>
                            <span className="text-gray-600 dark:text-gray-400">{a}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Alert (receptionist emergency) */}
            {panel.alert && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                    <div className="flex items-center gap-2 text-xs">
                        <span className="material-icons text-sm text-red-500">warning</span>
                        <span className="text-red-700 dark:text-red-400 font-medium">{renderValue(panel.alert)}</span>
                    </div>
                </div>
            )}

            {/* Technicians (receptionist) */}
            {Array.isArray(panel.technicians) && (
                <div className="space-y-2 pt-1">
                    {(panel.technicians as Array<{ name: string; distance: string; available: boolean; level: string; selected?: boolean }>).map((t, i) => (
                        <div key={i} className={`flex items-center gap-3 text-xs p-2 rounded-lg border ${t.selected ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/40' : 'bg-white dark:bg-gray-800/50 border-gray-100 dark:border-gray-700/30'}`}>
                            <div className={`w-2 h-2 rounded-full ${t.available ? 'bg-green-500' : 'bg-red-400'}`} />
                            <div className="flex-1">
                                <span className="text-gray-900 dark:text-white font-medium">{t.name}</span>
                                <div className="text-gray-400 text-[10px]">{t.level} • {t.distance}</div>
                            </div>
                            <span className={`text-[10px] font-medium ${t.available ? 'text-green-600 dark:text-green-400' : 'text-red-400'}`}>{t.available ? 'Available' : 'Busy'}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Messages (receptionist 3-way) */}
            {Array.isArray(panel.messages) && (
                <div className="space-y-2 pt-1">
                    {(panel.messages as Array<{ from: string; to: string; text: string }>).map((m, i) => (
                        <div key={i} className={`text-xs p-2.5 rounded-xl max-w-[85%] ${m.from === 'AI' ? 'bg-gray-100 dark:bg-gray-800 ml-0' : 'bg-blue-50 dark:bg-blue-900/20 ml-auto'}`}>
                            <div className="text-[10px] text-gray-400 mb-1 font-medium">{m.from} → {m.to}</div>
                            <span className="text-gray-700 dark:text-gray-300">{m.text}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Updates (receptionist job progress) */}
            {Array.isArray(panel.updates) && (
                <div className="space-y-2 pt-1">
                    {(panel.updates as Array<{ text: string; type: string }>).map((u, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                            <span className={`material-icons text-sm ${u.type === 'started' ? 'text-green-500' : u.type === 'en-route' ? 'text-blue-500' : 'text-yellow-500'}`}>
                                {u.type === 'started' ? 'check_circle' : u.type === 'en-route' ? 'directions_car' : 'schedule'}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">{u.text}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Steps (tech support resolution) */}
            {Array.isArray(panel.steps) && typeof (panel.steps as unknown[])[0] === 'string' && (
                <div className="space-y-2 pt-1">
                    {(panel.steps as string[]).map((s, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                            <span className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-300 shrink-0 mt-0.5">
                                {i + 1}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">{s}</span>
                        </div>
                    ))}
                    {panel.status && (
                        <div className="p-2 mt-1 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 text-xs text-green-700 dark:text-green-400 font-medium flex items-center gap-2">
                            <span className="material-icons text-sm">check_circle</span>
                            {renderValue(panel.status)}
                        </div>
                    )}
                </div>
            )}

            {/* Auto actions (tech support follow-up) */}
            {Array.isArray(panel.autoActions) && (
                <div className="space-y-1.5 pt-1">
                    {(panel.autoActions as string[]).map((a, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                            <span className="material-icons text-sm text-green-500">check_circle</span>
                            <span className="text-gray-600 dark:text-gray-400">{a}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Metrics (tech support) */}
            {panel.metrics && typeof panel.metrics === 'object' && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                    {Object.entries(panel.metrics as Record<string, string>).map(([key, val]) => (
                        <div key={key} className="text-center p-2 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/30">
                            <div className="text-gray-900 dark:text-white text-sm font-bold">{val}</div>
                            <div className="text-[10px] text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Root cause */}
            {panel.rootCause && (
                <div className="p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/40 text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                    <span className="material-icons text-sm">search</span>
                    Root Cause: {renderValue(panel.rootCause)}
                </div>
            )}

            {/* Order (support center) */}
            {panel.order && typeof panel.order === 'object' && (
                <div className="p-3 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/30 space-y-1">
                    {Object.entries(panel.order as Record<string, string>).map(([key, val]) => (
                        <div key={key} className="flex justify-between text-xs">
                            <span className="text-gray-500 capitalize">{key}</span>
                            <span className="text-gray-900 dark:text-white font-medium">{val}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Offers (support center retention) */}
            {Array.isArray(panel.offers) && (
                <div className="space-y-2 pt-1">
                    {(panel.offers as Array<{ text: string; code?: string; duration?: string }>).map((o, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/40">
                            <span className="material-icons text-sm text-purple-500">card_giftcard</span>
                            <span className="text-purple-700 dark:text-purple-300 flex-1">{o.text}</span>
                            {o.code && <span className="text-[10px] font-mono bg-purple-100 dark:bg-purple-800/40 px-2 py-0.5 rounded text-purple-700 dark:text-purple-300">{o.code}</span>}
                        </div>
                    ))}
                </div>
            )}

            {/* Review (support center survey) */}
            {panel.review && (
                <div className="text-xs text-gray-600 dark:text-gray-400 italic p-2 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/30">
                    "{renderValue(panel.review)}"
                </div>
            )}
        </div>
    );
}

export default function PipelineSection({ heading, steps, activeTab }: PipelineSectionProps) {
    const [expandedStep, setExpandedStep] = useState<number | null>(0);

    return (
        <section id="features" className="py-20 sm:py-28 bg-white dark:bg-black relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
                            <span className="material-icons text-sm">auto_awesome</span>
                            How It Works
                        </span>
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={activeTab + '-pipeline'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="font-serif text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white"
                            >
                                {heading}
                            </motion.h2>
                        </AnimatePresence>
                    </div>
                </AnimatedSection>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab + '-steps'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                    >
                        {/* Timeline line */}
                        <div className="absolute left-[23px] sm:left-[27px] top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />

                        <div className="space-y-4">
                            {steps.map((step, idx) => (
                                <AnimatedSection key={idx} delay={idx * 0.08}>
                                    <div
                                        className={`relative pl-14 sm:pl-16 cursor-pointer group transition-all duration-300 ${expandedStep === idx ? '' : ''
                                            }`}
                                        onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                                    >
                                        {/* Badge */}
                                        <div className={`absolute left-0 top-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-sm font-bold z-10 transition-all duration-300 ${expandedStep === idx
                                                ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-lg shadow-gray-900/20 dark:shadow-white/20'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                                            }`}>
                                            {step.badge}
                                        </div>

                                        {/* Card */}
                                        <div className={`rounded-2xl border transition-all duration-300 ${expandedStep === idx
                                                ? 'bg-white dark:bg-surface-dark border-gray-300 dark:border-gray-600 shadow-xl shadow-gray-900/5 dark:shadow-black/30'
                                                : 'bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 group-hover:border-gray-300 dark:group-hover:border-gray-700 group-hover:shadow-md'
                                            }`}>
                                            <div className="p-5 sm:p-6">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{step.heading}</h3>
                                                    <span className={`material-icons text-gray-400 transition-transform duration-300 ${expandedStep === idx ? 'rotate-180' : ''}`}>
                                                        expand_more
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">{step.description}</p>
                                            </div>

                                            <AnimatePresence>
                                                {expandedStep === idx && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                                                            <PipelinePanel panel={step.panel} />
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
