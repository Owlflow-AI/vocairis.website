import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WEBHOOK_URL = 'https://hook.us2.make.com/mmylr0yurp0bhj0o0ye57bqemjqbnk5f';

export default function ContactUsPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        workEmail: '',
        companyName: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok || response.status === 200) {
                setIsSuccess(true);
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setErrorMsg('Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen pt-32 pb-24 px-4 bg-background-light dark:bg-background-dark relative overflow-hidden flex flex-col justify-center">
            {/* Background elements to match the theme */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gray-500/5 dark:bg-gray-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                {/* Left Side: Copy */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="font-serif text-5xl sm:text-6xl text-gray-900 dark:text-white mb-6 leading-tight">
                        Let's talk about <br /><span className="text-gray-400 dark:text-gray-500">your hiring needs.</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
                        Ready to accelerate your recruitment process with AI? Our team is here to answer your questions, provide live demonstrations, and help you find the perfect hiring solution.
                    </p>

                    <div className="space-y-6 text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center">
                                <span className="material-icons text-gray-900 dark:text-white">email</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Email Us</p>
                                <p className="text-base font-semibold">hello@vocairis.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center">
                                <span className="material-icons text-gray-900 dark:text-white">chat</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Live Support</p>
                                <p className="text-base font-semibold">Available 24/7</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white dark:bg-surface-dark p-8 sm:p-12 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl relative"
                >
                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="success-state"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center text-center py-12"
                            >
                                <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
                                    <span className="material-icons text-4xl text-green-500 dark:text-green-400">check_circle</span>
                                </div>
                                <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-4">Request Received</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Thank you for reaching out! A member of our team will contact you shortly to discuss your needs.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="contact-form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                                        <input
                                            required
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all outline-none"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                                        <input
                                            required
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all outline-none"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Work Email</label>
                                    <input
                                        required
                                        type="email"
                                        id="workEmail"
                                        name="workEmail"
                                        value={formData.workEmail}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all outline-none"
                                        placeholder="john@company.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
                                    <input
                                        required
                                        type="text"
                                        id="companyName"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all outline-none"
                                        placeholder="Acme Corp"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">How can we help?</label>
                                    <textarea
                                        required
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-all outline-none resize-none"
                                        placeholder="Tell us about your hiring goals..."
                                    ></textarea>
                                </div>

                                {errorMsg && (
                                    <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl hover:shadow-gray-900/10 dark:hover:shadow-white/10 hover:-translate-y-0.5 mt-4 disabled:opacity-70 flex justify-center items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        'Submit Request'
                                    )}
                                </button>
                                <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-4">
                                    By submitting this form, you agree to our Privacy Policy.
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
