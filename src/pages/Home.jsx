import React, { useRef, lazy, Suspense } from 'react';
import ScrollVideoHero from '../components/restaurant/ScrollVideoHero';
import InstagramGallery from '../components/restaurant/InstagramGallery';

const AboutSection = lazy(() => import('../components/restaurant/AboutSection'));
const GoogleReviewsSection = lazy(() => import('../components/restaurant/GoogleReviewsSection'));
const ContactSection = lazy(() => import('../components/restaurant/ContactSection'));

export default function Home() {
  const contactRef = useRef(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black">
      <ScrollVideoHero onScrollToContact={scrollToContact} />
      <div className="relative z-10 bg-black">
        <div id="menu">
          <InstagramGallery />
        </div>
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white/60">Loading...</div></div>}>
          <div id="about">
            <AboutSection />
          </div>
          <div id="reviews">
            <GoogleReviewsSection />
          </div>
          <div id="contact" ref={contactRef}>
            <ContactSection />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
