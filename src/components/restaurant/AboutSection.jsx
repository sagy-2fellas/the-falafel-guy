
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Wifi } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="min-h-screen bg-black py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] border rounded-full" style={{ borderColor: '#F8D09F20' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] border rounded-full" style={{ borderColor: '#F8D09F20' }} />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20">

          <div className="w-12 sm:w-16 h-1 mx-auto mb-4 sm:mb-6" style={{ backgroundColor: '#F8D09F' }} />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3 sm:mb-4 tracking-wide px-4">
            OUR <span className="font-bold" style={{ color: '#F8D09F' }}>STORY</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4">

          <p className="text-white/80 text-lg sm:text-xl md:text-2xl font-light leading-relaxed mb-6 sm:mb-8">
            Born from a passion for authentic Middle Eastern flavors and a dream to bring the streets of Middle East to Cape Town, The Falafel Guy has been serving the Mother City since 2021.
          </p>
          <p className="text-white/60 text-base sm:text-lg font-light leading-relaxed">
            Every falafel is hand-rolled, every ingredient sourced with care, and every meal prepared with love. We believe food is more than sustenance—it's connection, culture, and community.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center">

            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center border" style={{ background: 'linear-gradient(to bottom right, #F8D09F20, #F8D09F05)', borderColor: '#F8D09F50' }}>
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#F8D09F' }} />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Fresh Daily</h3>
            <p className="text-white/60 text-sm sm:text-base font-light">
              Made fresh every morning with authentic recipes passed down through generations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center">

            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center border" style={{ background: 'linear-gradient(to bottom right, #F8D09F20, #F8D09F05)', borderColor: '#F8D09F50' }}>
              <Heart className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#F8D09F' }} />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Made with Love</h3>
            <p className="text-white/60 text-sm sm:text-base font-light">
              Each dish is prepared with care and passion to bring you the taste of home
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center sm:col-span-2 md:col-span-1">

            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center border" style={{ background: 'linear-gradient(to bottom right, #F8D09F20, #F8D09F05)', borderColor: '#F8D09F50' }}>
              <Wifi className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#F8D09F' }} />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Digital Nomad Friendly</h3>
            <p className="text-white/60 text-sm sm:text-base font-light">
              Stay connected while you enjoy your meal with our complimentary high-speed WiFi
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
