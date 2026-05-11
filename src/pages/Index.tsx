import React from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import WhySolanaSection from '@/components/landing/WhySolanaSection';
import AIVoiceSection from '@/components/landing/AIVoiceSection';
import CrossChainSection from '@/components/landing/CrossChainSection';
import RoadmapSection from '@/components/landing/RoadmapSection';
import FAQSection from '@/components/landing/FAQSection';
import FooterSection from '@/components/landing/FooterSection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <WhySolanaSection />
      <AIVoiceSection />
      <CrossChainSection />
      <RoadmapSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
};

export default Index;
