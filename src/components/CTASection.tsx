import AnimatedSection from './AnimatedSection';

export default function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden bg-background-light dark:bg-background-dark">
            <AnimatedSection>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="font-serif text-4xl sm:text-5xl text-gray-900 dark:text-white mb-6">Ready to upgrade your hiring stack?</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">Join 500+ companies using AI to find better talent, faster.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-gray-900 dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full text-base font-semibold hover:opacity-90 transition-opacity">
                            Get Started Free
                        </button>
                        <button className="bg-transparent border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </AnimatedSection>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </section>
    );
}
