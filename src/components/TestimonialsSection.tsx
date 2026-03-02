import AnimatedSection from './AnimatedSection';

export default function TestimonialsSection() {
    const testimonials = [
        {
            name: 'Sarah Jenkins',
            title: 'VP of Talent at TechFlow',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK8ibcNVocGNmVv2XmlCQkRWXbFNzlB8tHcx3lDxx8fvaOSk9OCGHhtA0JVUW6f3k55G1mtwCcMVybcWxUl04FUac40EuxYJ0c2JAMjRe3v5UqsVYvYuCMrdIEOz5eyX66QaKOZ2J3yTAegzgREErlx20AWkAvuJJzJ90Xk9JNi9io_faDNuFnLbqKA6E38l42r_I6rGkMkaXCDLx8LmuY9PgXQah6slXFdcI43KPeifLWbfgMYP2pjykZCQ4qkkUpCGziM81fOSoq',
            quote: '"The AI agent handled 500 initial screens in a single day. It\'s truly indistinguishable from a human caller."',
            stat: 'Saved 40+ hrs/week',
            statIcon: 'trending_up',
            statColor: 'text-gray-900 dark:text-white',
        },
        {
            name: 'Marcus Chen',
            title: 'Senior Recruiter at StaffPro',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOIUssKb1-Sw3aL7HosnTFkxNfQJBxERK-7QqrzsYKgRMZI1ukqXz6QEr4izoJFTgXlwaPxLrvXKODJPRrpgyfg7EkTmPekqlfj2OUos-tOO9Pvv7Ca2s0qHwwSb01TO9usDuv1MAxFlu9d9pcWFJ7kSEH5GT_9TldJQquX9GSFzRPbnLWBhoHFipsZ-WF-g1ceZK7S2a6iMyM-P7N5zDr2cxFrTD99eEBE4gG_fodvZWfLWq5V-1WyK2S7x55dLNtDGOA3I5tXYoX',
            quote: '"Candidates loved the instant feedback loop. Our NPS score went up by 15 points almost immediately."',
            stat: '+15 NPS Score',
            statIcon: 'arrow_upward',
            statColor: 'text-emerald-600 dark:text-emerald-400',
        },
        {
            name: 'Elena Rodriguez',
            title: 'HR Lead at RapidScale',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC42GPSE7h5n05WDaV-MBtG75f1NhvMyIb67i7rBkJHgqyy3y9Ftl5KxqjPdG2H6x0Ro9oqcbfV8eq7IaQ3__KFGqcPmJhaluCjBdUzQvDHElbv91DvyeDP-rIPADG19gutiyMods6a-I9hX_eqIFmqh_nPe9vJ-xDr4cNzRH8KZtbSVQj-F8bRqMOGaQFamcHsqT3FiNjsslHhHSgtoWANlbiaV1kLq6YHZTiIfdxFYhpdbfI_qyiQYpvBxt0bFUZLgbKxdOc9is3s',
            quote: '"We hired our engineering team 3x faster than last quarter thanks to the automated scheduling features."',
            stat: '3x Faster Hiring',
            statIcon: 'flash_on',
            statColor: 'text-blue-600 dark:text-blue-400',
        },
    ];

    return (
        <section id="testimonials" className="py-20 bg-gray-50 dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center gap-6 mb-16">
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-xs font-bold uppercase tracking-wider">Trusted Leader</span>
                            </div>
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                                Trusted by Modern<br /><span className="text-gray-600 dark:text-gray-400">Hiring Teams</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal leading-relaxed">
                                See how AI voice agents are transforming high-volume hiring with human-quality conversations and instant scalability.
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                <div className="w-full max-w-[1120px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((t, idx) => (
                            <AnimatedSection key={idx} delay={idx * 0.1}>
                                <div className="group flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-8 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 relative overflow-hidden h-full">
                                    <div className="absolute -right-4 -top-4 text-gray-100 dark:text-gray-900 group-hover:text-gray-200 dark:group-hover:text-gray-800 transition-colors">
                                        <span className="material-icons text-[120px]">format_quote</span>
                                    </div>
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="bg-center bg-no-repeat bg-cover rounded-full w-12 h-12 shrink-0 border border-gray-200 dark:border-gray-700" style={{ backgroundImage: `url("${t.img}")` }}></div>
                                        <div>
                                            <h3 className="text-gray-900 dark:text-white font-bold text-sm">{t.name}</h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-xs">{t.title}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3 relative z-10">
                                        <div className="flex text-amber-400 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="material-icons text-sm">star</span>
                                            ))}
                                        </div>
                                        <h4 className="text-gray-900 dark:text-white text-lg font-medium leading-snug">{t.quote}</h4>
                                        <div className="mt-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <span className={`inline-flex items-center gap-1 text-xs font-semibold ${t.statColor}`}>
                                                <span className="material-icons text-sm">{t.statIcon}</span>
                                                {t.stat}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* Additional testimonials - hidden on mobile */}
                    <div className="hidden lg:grid grid-cols-3 gap-6 mt-6">
                        <AnimatedSection delay={0.3}>
                            <div className="group flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 relative overflow-hidden">
                                <div className="flex items-center gap-4">
                                    <div className="bg-center bg-no-repeat bg-cover rounded-full w-12 h-12 shrink-0 border border-gray-200 dark:border-gray-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAWYWuyrsFO2d5IiTNhthL0YNCgt-PHU07X6xaqrdWcnOkfJbiRFEc9QLPgvjNl0WXkExJQl8u_4MIwdVqwV9-5K6Ip5dR-OT4BMiaJgYwERU-FCib2ettZPjF3CNpfjip82_T2Q-vc20R6CgXfOieai9c5oZev-NXSb4iAIH2xz0sYgOub5dpeOqAXv4RMEJDrx8OJjEv6yrjyiKz25pwFeRB7c6MuELwAwFPRIyUWT7uvD3pdHTcr1cmoSRC7wtLTcTdIMWrg_u1Y")' }}></div>
                                    <div>
                                        <h3 className="text-gray-900 dark:text-white font-bold text-sm">David Kim</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-xs">Head of People at CloudSystems</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h4 className="text-gray-900 dark:text-white text-lg font-medium leading-snug">"The ROI was immediate. We replaced our entire outsourcing budget with VoiceRecruit."</h4>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.4} className="lg:col-span-2">
                            <div className="group flex flex-col gap-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-8 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 h-full">
                                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center h-full">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-center bg-no-repeat bg-cover rounded-full w-10 h-10 shrink-0 border border-gray-200 dark:border-gray-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAIg7yykdHtGnItYMTeC3wGPfYXQN7MM6f8YKVhu4KxMxmkMj11JZHNG3GGOnWG_nDyLfa2Sapb7f3PVDHNJy0LmSQ1kEeTAwkqyRSmlzM5eLB2NwQ8a-87xDdq9jYwozR7Ne1m1B615Wshh-Sl6R35DRc4abZsPMkqDyVEN4gwSYOI4Tg-W96h-wVyVuX3sQn187ihvvwZnRnRBecmD1JQfMLcHrlB5kf6kIo6EUduiYMc1PHw7pmdeNfI7GoJuGcjTSFptE-QyqCi")' }}></div>
                                            <div>
                                                <h3 className="text-gray-900 dark:text-white font-bold text-sm">Jessica Vance</h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-xs">Director at Enterprise Corp</p>
                                            </div>
                                        </div>
                                        <h4 className="text-gray-900 dark:text-white text-xl font-medium leading-snug">"Finally, a voice AI that understands nuance. Our candidates didn't even realize they were speaking to an AI until the very end of the call."</h4>
                                    </div>
                                    <div className="w-full md:w-auto md:border-l border-gray-200 dark:border-gray-700 md:pl-6 flex flex-col gap-3 min-w-[200px]">
                                        {['ISO 27001 Certified', 'GDPR Compliant', '99.9% Uptime'].map((badge) => (
                                            <div key={badge} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                                                <span className="material-icons text-gray-900 dark:text-white">check_circle</span>
                                                <span>{badge}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
}
