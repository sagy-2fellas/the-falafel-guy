import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeedbackForm from '../components/feedback/FeedbackForm';

export default function Feedback() {
  const [showForm, setShowForm] = useState(false);

  const handleThumbsUpShop = () => {
    window.open('https://www.google.com/search?sca_esv=aaa09739d5691e40&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E3aBG5kqrOW16WFkcijsIMPg6faOTo1rOP5fxKcoAGHrMdmKn1GyAmrnkxvFrckLDGzpOkK4aeLlg8pKovVPiuiTG10t4LGPQSxLSx8xzUtp9qHsYg%3D%3D&q=The+Falafel+Guy+-+The+Shop+Reviews&sa=X&ved=2ahUKEwilrIPEzYORAxWxT0EAHUKpLBkQ0bkNegQIPxAE&biw=1873&bih=983&dpr=0.9#lrd=0x1dcc679ad02ef443:0xf5de7976f60f1c03,3,,,,', '_blank');
  };

  const handleThumbsUpKiosk = () => {
    window.open('https://www.google.com/search?sa=X&sca_esv=aaa09739d5691e40&biw=1873&bih=983&tbm=lcl&q=The+Falafel+Guy+-+The+Shop&rflfq=1&num=20&stick=H4sIAAAAAAAAAB2QvU0kURCEtQYIfxDGWJMAUv__JHC4SJDACg1aY6VdgTAunYuAuIjiqjFGPa-6X_VX7-52vWeTVLEkVjNlpWAaNcTarEmJKELzV6XipHJxIueqKLWZxZ-z8mhUma68LqjS3iLhCpsua4wGqrE5x3iSYSXUEtXSUBfzTkqNXBe3DvfizlYwkRNjNAPnJlKBJ0uWynBJmOiAlcIlsn1dOJPng3EhF6vruggDQEiAF9NQqrnfPaJllASyF2G0jaxB0Oi0l7HHuuChZF5JGUjwKp77E3JyYwWzmavnsBK1kjdMndMNJKO6kilU1EaMTrAisWKNIDS6yNr0fTj8HB6e98v1vG_H8-dl-9yPH2-n7f3y8e9mfT3t25_j-fi-n7enr7_b4zbKy-ly_Q8blQ7z1gEAAA&ved=2ahUKEwi-7qnzzYORAxWeU0EAHakdFZMQjHJ6BAglEAM&rldimm=14273247013443130610#lkt=LocalPoiReviews&lrd=0x1dcc674a5f28fa2d:0xc614c2892baed4f2,3,,,,', '_blank');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/hero-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/80" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #F8D09F, transparent)' }} />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #F8D09F, transparent)' }} />



        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4">
                  Thank you for <span className="font-bold" style={{ color: '#F8D09F' }}>sharing the love!</span>
                </h1>
                <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto">
                  Your feedback helps us serve you better every day
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="sm:col-span-1"
                >
                  <div className="group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-105" style={{ borderColor: '#22c55e40', backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Button
                      onClick={handleThumbsUpShop}
                      className="w-full text-white font-bold px-8 py-10 text-xs rounded-2xl transition-all duration-300 shadow-xl relative"
                      style={{ backgroundColor: '#22c55e' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <ThumbsUp className="w-8 h-8" />
                        <span className="leading-tight">THUMBS UP<br/>TO THE SHOP!</span>
                      </div>
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="sm:col-span-1"
                >
                  <div className="group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-105" style={{ borderColor: '#22c55e40', backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Button
                      onClick={handleThumbsUpKiosk}
                      className="w-full text-white font-bold px-8 py-10 text-xs rounded-2xl transition-all duration-300 shadow-xl relative"
                      style={{ backgroundColor: '#22c55e' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#22c55e'}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <ThumbsUp className="w-8 h-8" />
                        <span className="leading-tight">THUMBS UP<br/>TO THE KIOSK!</span>
                      </div>
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="sm:col-span-2"
                >
                  <div className="group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-105" style={{ borderColor: '#ef444440', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Button
                      onClick={() => setShowForm(true)}
                      className="w-full text-white font-bold px-8 py-10 text-xs rounded-2xl transition-all duration-300 shadow-xl relative"
                      style={{ backgroundColor: '#ef4444' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                    >
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <MessageSquare className="w-8 h-8" />
                        <span className="leading-tight">GIVE SOME CONSTRUCTIVE CRITICISM</span>
                      </div>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-3xl bg-black/60 backdrop-blur-lg border-2 rounded-2xl p-8"
              style={{ borderColor: '#F8D09F30' }}
            >
              <FeedbackForm onClose={() => setShowForm(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}