import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const images = [
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/bffe7aa30_481311511_18035082044617513_3296785577425005014_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/299d5540a_482028930_966581098896316_6412715626387011961_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/b8cab346e_482031793_966576372230122_991788587398889972_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/b33d07239_482807188_966421802245579_5663741839179961572_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/5796286fd_483683813_966933248861101_7973589197135917745_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/b65914b57_483864893_967671502120609_6357438081968191766_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/16729e3f8_487238806_979816064239486_5149839609082909530_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/af801c672_488656972_982750600612699_6857136416329677527_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/03bff6f40_489010115_985356427018783_1378983987413188771_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/e17326003_496093738_1013769754177450_6038915408089468669_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/9c44a70b9_496842227_18043624349617513_1076435842895477366_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/51f00eb31_498559273_18044750315617513_9134844328957341310_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/8d3693bb4_501273182_18045870509617513_3128500692769661014_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/a0c9783f7_502095278_18046101602617513_8139005708177162061_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/17dabaa51_480294974_18034739288617513_7046197724550075500_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/4e6155e70_503262442_18046695923617513_8023175858920138117_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/65a5f460b_504425754_18048098444617513_7873753415944971026_n.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5388d79c5fe5a86e4444a/3b4c87ad5_469642283_18026383148617513_5898057740162213349_n.jpg"
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
                alt={`Falafel Guy Instagram post ${index + 1}`}
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