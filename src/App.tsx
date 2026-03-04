import { useState } from 'react';
import Navbar from './components/Navbar';
import TabNavigation from './components/TabNavigation';
import HeroSection from './components/HeroSection';
import PipelineSection from './components/PipelineSection';
import ValuePropsSection from './components/ValuePropsSection';
import IndustriesSection from './components/IndustriesSection';
import TrustSection from './components/TrustSection';
import DemoSection from './components/DemoSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import RecruiterComparisonSection from './components/RecruiterComparisonSection';
import EvaluationEngineSection from './components/EvaluationEngineSection';
import RecruiterPricingSection from './components/RecruiterPricingSection';
import ContactUsPage from './components/ContactUsPage';

import { homeData } from './data/homeData';
import { recruiterData } from './data/recruiterData';
import { supportCenterData } from './data/supportCenterData';

const tabDataMap: Record<string, any> = {
  home: homeData,
  recruiter: recruiterData,
  supportCenter: supportCenterData,
};

const tabs = [
  { id: homeData.id, label: homeData.label, icon: homeData.icon },
  { id: recruiterData.id, label: recruiterData.label, icon: recruiterData.icon },
  { id: supportCenterData.id, label: supportCenterData.label, icon: supportCenterData.icon },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showContactPage, setShowContactPage] = useState(false);

  const data = tabDataMap[activeTab];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setShowContactPage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToContact = () => {
    setShowContactPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    if (showContactPage) {
      setShowContactPage(false);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-display transition-colors duration-300 antialiased selection:bg-gray-200 dark:selection:bg-gray-800">
      {/* Fixed Navbar */}
      <Navbar onTabChange={handleTabChange} onGoToContact={handleGoToContact} onNavClick={handleNavClick} />

      {showContactPage ? (
        <ContactUsPage />
      ) : (
        <>
          {/* Sticky Tab Navigation (below navbar) */}
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          {/* Hero — content swaps per tab */}
          <HeroSection data={data.hero} activeTab={activeTab} onGoToContact={handleGoToContact} />

          {/* Live Demo — activeTab conditional rendering built inside */}
          <DemoSection activeTab={activeTab} />

          {/* Recruiter Comparison — only visible on recruiter tab */}
          {activeTab === 'recruiter' && <RecruiterComparisonSection />}

          {/* Pipeline / How It Works — content swaps per tab */}
          <PipelineSection
            heading={data.pipelineHeading}
            steps={data.pipeline}
            activeTab={activeTab}
          />

          {/* Evaluation Engine — only visible on recruiter tab */}
          {activeTab === 'recruiter' && <EvaluationEngineSection />}

          {/* Value Propositions — content swaps per tab */}
          <ValuePropsSection
            tag={data.valuePropsTag}
            heading={data.valuePropsHeading}
            subhead={data.valuePropsSubhead}
            items={data.valueProps}
            activeTab={activeTab}
          />

          {/* Industries — content swaps per tab */}
          <IndustriesSection
            tag={data.industriesTag}
            heading={data.industriesHeading}
            subhead={data.industriesSubhead}
            items={data.industries}
            activeTab={activeTab}
          />

          {/* Trust & Ethics — shared across tabs */}
          <TrustSection data={data.trust} />

          {/* Testimonials — shared section */}
          {/* <TestimonialsSection /> */}

          {/* Pricing — content swaps per tab, custom for recruiter */}
          {activeTab === 'recruiter' ? (
            <RecruiterPricingSection onGoToContact={handleGoToContact} />
          ) : (
            <PricingSection data={data.pricing} activeTab={activeTab} onGoToContact={handleGoToContact} />
          )}

          {/* FAQ — shared section */}
          <FAQSection />

          {/* Final CTA — shared section */}
          <CTASection onGoToContact={handleGoToContact} />
        </>
      )}

      {/* Footer */}
      <Footer />

      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  );
}

export default App;
