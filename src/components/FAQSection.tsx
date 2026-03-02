import AnimatedSection from './AnimatedSection';

const faqs = [
    {
        question: 'How realistic is the AI voice?',
        answer: 'Our AI uses advanced neural speech synthesis to create voices that are practically indistinguishable from human speech. It captures intonation, pacing, and natural pauses to ensure a comfortable and professional candidate experience, reducing hang-ups and increasing engagement.',
        open: true,
    },
    {
        question: 'Does the platform integrate with my ATS (Greenhouse, Lever)?',
        answer: 'Yes, we offer native 2-way integrations with most major ATS platforms including Greenhouse, Lever, Workday, and SAP SuccessFactors. Candidate data, interview notes, and call recordings are automatically synced to your candidate profiles in real-time.',
    },
    {
        question: 'Is the candidate data secure and compliant?',
        answer: 'Security is our top priority. We are SOC 2 Type II compliant and GDPR ready. All voice data is encrypted both in transit and at rest. We also offer features like PII redaction to ensure you only store what is absolutely necessary.',
    },
    {
        question: 'Can the AI agent handle multiple languages?',
        answer: 'Absolutely. Our AI agents are fluent in over 30 languages, including Spanish, French, German, Mandarin, and Japanese. The AI can even detect the candidate\'s preferred language on the fly and switch seamlessly during the conversation.',
    },
    {
        question: 'What happens if the AI cannot answer a candidate\'s question?',
        answer: 'We design our agents with a "graceful handover" protocol. If a candidate asks a question outside the AI\'s knowledge base, it will politely acknowledge the limitation, note the question, and offer to have a human recruiter follow up via email or a scheduled call.',
    },
];

export default function FAQSection() {
    return (
        <section id="faq" className="py-20 bg-gray-50 dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center gap-6 mb-12">
                        <div className="space-y-4">
                            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-normal">
                                Everything you need to know about our AI voice agents, integrations, and security protocols.
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
                    {faqs.map((faq, idx) => (
                        <AnimatedSection key={idx} delay={idx * 0.08}>
                            <details
                                className="group rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 open:border-gray-400 dark:open:border-gray-600 open:ring-1 open:ring-gray-400 dark:open:ring-gray-600 transition-all duration-300"
                                open={faq.open}
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between p-6 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
                                    <span className="text-base font-semibold pr-4">{faq.question}</span>
                                    <span className="material-icons text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                                    <p>{faq.answer}</p>
                                </div>
                            </details>
                        </AnimatedSection>
                    ))}
                </div>

                <AnimatedSection delay={0.5}>
                    <div className="w-full max-w-3xl mx-auto mt-16 p-8 rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Still have questions?</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Can't find the answer you're looking for? Our team is here to help.</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm font-semibold transition-colors border border-gray-200 dark:border-gray-700">
                                Contact Support
                            </button>
                            <button className="px-6 py-3 rounded-xl bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black text-sm font-bold transition-colors shadow-lg">
                                Chat with Sales
                            </button>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
