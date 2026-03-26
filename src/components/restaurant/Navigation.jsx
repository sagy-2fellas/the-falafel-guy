import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '../../utils';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/Home';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (!isHomePage) {
      window.location.href = createPageUrl('Home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close mobile menu if open
    }
  };

  const scrollToSection = (sectionId) => {
    if (!isHomePage) {
      window.location.href = createPageUrl('Home') + '#' + sectionId;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close mobile menu if open
    }
  };

  const navLinks = [
    { label: 'Home', action: scrollToTop, type: 'scroll' },
    { label: 'Gallery', action: () => scrollToSection('menu'), type: 'scroll' },
    { label: 'Reviews', action: () => scrollToSection('reviews'), type: 'scroll' },
    { label: 'Contact', action: () => scrollToSection('contact'), type: 'scroll' },
    { label: 'Catering', to: createPageUrl('Catering'), type: 'link' },
    { label: 'Feedback', to: createPageUrl('Feedback'), type: 'link' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        style={{ borderBottom: isScrolled ? '1px solid #F8D09F30' : 'none' }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 mx-auto">
              {navLinks.map((link) => (
                link.type === 'link' ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-white/80 hover:text-[#F8D09F] font-semibold transition-colors duration-300 text-base"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={link.action}
                    className="text-white/80 hover:text-[#F8D09F] font-semibold transition-colors duration-300 text-base"
                  >
                    {link.label}
                  </button>
                )
              ))}
              
              <Button
                onClick={() => window.open('https://thefalafelguy.5loyalty.com/', '_blank')}
                className="text-black font-semibold px-6 py-2 text-sm rounded-none transition-all duration-300"
                style={{ background: 'linear-gradient(to right, #F8D09F, #E5BD88)', border: 'none' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #E5BD88, #F8D09F)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #F8D09F, #E5BD88)'}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Order Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors ml-auto"
              style={{ borderColor: '#F8D09F50' }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" style={{ color: '#F8D09F' }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: '#F8D09F' }} />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 z-40 bg-black/98 backdrop-blur-lg lg:hidden border-b-2"
            style={{ borderColor: '#F8D09F30' }}
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                link.type === 'link' ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-left text-white/80 hover:text-[#F8D09F] font-semibold py-3 transition-colors duration-300 text-lg border-b"
                    style={{ borderColor: '#F8D09F20' }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={link.action}
                    className="block w-full text-left text-white/80 hover:text-[#F8D09F] font-semibold py-3 transition-colors duration-300 text-lg border-b"
                    style={{ borderColor: '#F8D09F20' }}
                  >
                    {link.label}
                  </button>
                )
              ))}
              
              <Button
                onClick={() => {
                  window.open('https://thefalafelguy.5loyalty.com/', '_blank');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-black font-semibold px-6 py-4 text-base rounded-none"
                style={{ background: 'linear-gradient(to right, #F8D09F, #E5BD88)', border: 'none' }}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Order Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}