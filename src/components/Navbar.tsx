import { useState } from 'react';

interface NavbarProps {
    onTabChange?: (tabId: string) => void;
}

export default function Navbar({ onTabChange }: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollTo = (id: string) => {
        setMobileMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="fixed w-full z-50 top-0 left-0 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[65px]">
                <div
                    className="flex items-center gap-2.5 cursor-pointer"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        onTabChange?.('home');
                    }}
                >
                    <img src="/vocairis-logo.png" alt="VocAIris Logo" className="h-10 sm:h-12 w-auto object-contain dark:bg-white dark:p-1.5 dark:rounded-lg" />
                </div>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    <button onClick={() => scrollTo('features')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">Features</button>
                    <button onClick={() => scrollTo('live-demo')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">Demo</button>
                    <button onClick={() => scrollTo('pricing')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">Pricing</button>
                    <button onClick={() => scrollTo('faq')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">FAQ</button>
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center">
                    <a href="mailto:hello@vocairis.com" className="bg-gray-900 dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity inline-block text-center">
                        Contact Us
                    </a>
                </div>

                {/* Mobile toggle */}
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-600 dark:text-gray-400">
                    <span className="material-icons">{mobileMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 px-4 py-4 space-y-3">
                    <button onClick={() => scrollTo('features')} className="block w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2">Features</button>
                    <button onClick={() => scrollTo('live-demo')} className="block w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2">Demo</button>
                    <button onClick={() => scrollTo('pricing')} className="block w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2">Pricing</button>
                    <button onClick={() => scrollTo('faq')} className="block w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2">FAQ</button>
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                        <a href="mailto:hello@vocairis.com" className="w-full bg-gray-900 dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full text-sm font-semibold inline-block text-center">Contact Us</a>
                    </div>
                </div>
            )}
        </nav>
    );
}
