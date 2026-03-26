import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

export default function PrivacyPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const hasAccepted = localStorage.getItem('privacy-consent');
    if (!hasAccepted) {
      // Show popup after a short delay
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacy-consent', 'accepted');
    localStorage.setItem('privacy-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('privacy-consent', 'declined');
    localStorage.setItem('privacy-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div 
            className="container mx-auto max-w-5xl bg-black/95 backdrop-blur-lg border-2 rounded-lg p-4 sm:p-6 shadow-2xl"
            style={{ borderColor: '#F8D09F50' }}
          >
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0"
                style={{ background: 'linear-gradient(to bottom right, #F8D09F20, #F8D09F05)', borderColor: '#F8D09F50' }}
              >
                <Shield className="w-6 h-6" style={{ color: '#F8D09F' }} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  Your Privacy Matters
                </h3>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-3 sm:mb-0">
                  We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By clicking "Accept", you consent to our use of cookies in accordance with POPIA (Protection of Personal Information Act).{' '}
                  <Link 
                    to={createPageUrl('PrivacyPolicy')} 
                    className="underline hover:text-[#F8D09F] transition-colors"
                    style={{ color: '#F8D09F' }}
                  >
                    Learn more
                  </Link>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <Button
                  onClick={handleDecline}
                  variant="outline"
                  className="border-2 text-white font-semibold px-4 sm:px-6 py-2 text-sm rounded-lg transition-all duration-300 w-full sm:w-auto"
                  style={{ borderColor: '#F8D09F50', backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#F8D09F';
                    e.currentTarget.style.backgroundColor = '#F8D09F10';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#F8D09F50';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Decline
                </Button>
                <Button
                  onClick={handleAccept}
                  className="text-black font-semibold px-4 sm:px-6 py-2 text-sm rounded-lg transition-all duration-300 w-full sm:w-auto"
                  style={{ background: 'linear-gradient(to right, #F8D09F, #E5BD88)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #E5BD88, #F8D09F)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #F8D09F, #E5BD88)'}
                >
                  Accept All
                </Button>
              </div>

              {/* Close Button */}
              <button
                onClick={handleDecline}
                className="absolute top-2 right-2 sm:relative sm:top-0 sm:right-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                style={{ color: '#F8D09F80' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#F8D09F'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#F8D09F80'}
                aria-label="Close privacy notice"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}