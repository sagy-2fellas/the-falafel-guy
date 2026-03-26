
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ShoppingBag, Phone, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero({ onScrollToContact }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/d302dd2d5_1761246339464dar0o91x.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Decorative gold glow effects */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#F8D09F]/10 to-transparent blur-3xl z-[2]" />
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-[#F8D09F]/10 to-transparent blur-3xl z-[2]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Tagline */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4"
            style={{ color: '#F8D09F' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Not Just The Best Deal - The Real Deal
          </motion.h1>

          <div className="w-24 sm:w-32 h-1 mx-auto mb-4 sm:mb-6" style={{ background: 'linear-gradient(to right, transparent, #F8D09F, transparent)' }} />

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white/90 font-light tracking-wide mb-2 sm:mb-3 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span style={{ color: '#F8D09F' }} className="font-semibold">HALAAL</span> – Authentic Middle Eastern Streatery
          </motion.p>

          <motion.p
            className="text-base sm:text-lg text-white/80 font-light mb-8 sm:mb-12 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Served in the heart of Sea Point
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <Button
              onClick={() => window.open('https://thefalafelguy.5loyalty.com/', '_blank')}
              className="w-full sm:w-auto text-black font-semibold px-6 sm:px-8 py-3 sm:py-6 text-xs sm:text-base rounded-none transition-all duration-300 transform hover:scale-105 shadow-2xl"
              style={{ background: 'linear-gradient(to right, #F8D09F, #E5BD88)', border: 'none' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #E5BD88, #F8D09F)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #F8D09F, #E5BD88)'}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              ORDER FOR PICKUP
            </Button>
            
            <Button
              onClick={() => window.open('https://www.ubereats.com/store/the-falafel-guy-sea-point/7dkurdw6VSaDuiiHHUImgg?diningMode=DELIVERY', '_blank')}
              className="w-full sm:w-auto text-black font-semibold px-6 sm:px-8 py-3 sm:py-6 text-xs sm:text-base rounded-none transition-all duration-300 transform hover:scale-105 shadow-2xl"
              style={{ background: 'linear-gradient(to right, #F8D09F, #E5BD88)', border: 'none' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #E5BD88, #F8D09F)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #F8D09F, #E5BD88)'}
            >
              <Bike className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              UBER EATS
            </Button>

            <Button
              onClick={onScrollToContact}
              variant="outline"
              className="w-full sm:w-auto border-2 text-white font-semibold px-6 sm:px-8 py-3 sm:py-6 text-xs sm:text-base rounded-none transition-all duration-300 transform hover:scale-105"
              style={{ borderColor: '#F8D09F', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8D09F';
                e.currentTarget.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              CONTACT US
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: '#F8D09F' }} />
        </motion.div>
      </div>
    </section>
  );
}
