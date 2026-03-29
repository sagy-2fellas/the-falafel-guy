import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const images = [
  "/images/gallery/falafel-guy-gallery-1.jpg",
  "/images/gallery/falafel-guy-gallery-2.jpg",
  "/images/gallery/falafel-guy-gallery-3.jpg",
  "/images/gallery/falafel-guy-gallery-4.jpg",
  "/images/gallery/falafel-guy-gallery-5.jpg",
  "/images/gallery/falafel-guy-gallery-6.jpg",
  "/images/gallery/falafel-guy-gallery-7.jpg",
  "/images/gallery/falafel-guy-gallery-8.jpg",
  "/images/gallery/falafel-guy-gallery-9.jpg",
  "/images/gallery/falafel-guy-gallery-10.jpg",
  "/images/gallery/falafel-guy-gallery-11.jpg",
  "/images/gallery/falafel-guy-gallery-12.jpg",
  "/images/gallery/falafel-guy-gallery-13.jpg",
  "/images/gallery/falafel-guy-gallery-14.jpg",
  "/images/gallery/falafel-guy-gallery-15.jpg",
  "/images/gallery/falafel-guy-gallery-16.jpg",
  "/images/gallery/falafel-guy-gallery-17.jpg",
  "/images/gallery/falafel-guy-gallery-18.jpg",
];

export default function InstagramGallery() {
  return (
    <section className="bg-black py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="w-12 sm:w-16 h-1 mx-auto mb-4 sm:mb-6" style={{ backgroundColor: '#F8D09F' }} />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-3 sm:mb-4 tracking-wide px-4">
            FOLLOW OUR <span className="font-bold" style={{ color: '#F8D09F' }}>JOURNEY</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg font-light px-4">
            See what's cooking on our Instagram
          </p>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 sm:gap-2 md:gap-3 mb-8 sm:mb-12">
          {images.map((image, index) => (
            <motion.a
              key={index}
              href="https://www.instagram.com/thefalafelguysa"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="relative aspect-square overflow-hidden group cursor-pointer"
            >
              <img 
                src={image} 
                alt={`Halaal Middle Eastern food at The Falafel Guy Sea Point - photo ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" style={{ color: '#F8D09F' }} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center px-4"
        >
          <Button
            onClick={() => window.open('https://www.instagram.com/thefalafelguysa', '_blank')}
            className="w-full sm:w-auto text-black font-semibold px-4 sm:px-10 py-3 sm:py-6 text-xs sm:text-lg rounded-none transition-all duration-300 transform hover:scale-105 group"
            style={{ background: 'linear-gradient(to right, #F8D09F, #E5BD88)', border: 'none' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #E5BD88, #F8D09F)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #F8D09F, #E5BD88)'}
          >
            <Instagram className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform" />
            FOLLOW US ON INSTAGRAM
          </Button>
        </motion.div>
      </div>
    </section>
  );
}