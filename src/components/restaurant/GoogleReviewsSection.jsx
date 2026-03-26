
import React, { useState, useEffect } from 'react'; // Added useEffect for React.useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.815 10.185C21.932 10.788 22 11.391 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C15.445 2 18.368 3.555 20.182 5.818L17.091 8.909C16.091 7.909 14.364 7 12 7C8.682 7 6 9.682 6 13C6 16.318 8.682 19 12 19C15.318 19 16.818 17.091 17.091 15.636H12V12H21.815V10.185Z" fill="white"/>
  </svg>
);

const reviewsData = {
  "The Shop": {
    averageRating: 4.6,
    totalReviews: 140,
    googleUrl: "https://www.google.com/search?sca_esv=662fd8d856395cb7&cs=0&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E3aBG5kqrOW16WFkcijsIMPg6faTo1rOP5fxKcoAGHrMdmKn1GyAmrnkxvFrckLDGzpOkK4aeLlg8pKovVPiuiTG10t4LGPQSxLSx8xzUtp9qHsYg%3D%3D&q=The+Falafel+Guy+-+The+Shop+Reviews&sa=X&ved=2ahUKEwiC9YighLGQAxVxYEEAHU3kGI8Q0bkNegQIIBAE&biw=1600&bih=805&dpr=1.8",
    reviews: [
      {
        name: "Zeeniya Cassim",
        rating: 5,
        date: "a month ago",
        review: "The food and service was amazing. The pita crunches and the sauces served with it, at the table were all very yummy. I would definitely go back to try more items.",
        avatar: "ZC",
        badges: ["Local Guide", "14 reviews"]
      },
      {
        name: "Hanan Aftab",
        rating: 5,
        date: "3 weeks ago",
        review: "We dined at The Falafel Guy twice during our one-week stay and were impressed both times. The Mediterranean dishes are fresh and flavorful, the ambiance is inviting with great music, and the staff are exceptionally warm and attentive. A standout detail is the complimentary fried pita with four delicious sauces served while you wait. Truly a place worth recommending for quality food and outstanding hospitality ❤️❤️",
        avatar: "HA",
        badges: ["Local Guide", "10 reviews"]
      },
      {
        name: "Melissa",
        rating: 5,
        date: "a month ago",
        review: "This place is 10/10. Every time I go, I leave so happy and satisfied! Their food is truly incredible and so tasty, and they have great service. The brinjal pita is my favourite, and they have the tastiest falafel in town. All the meat options are incredible too. They offer crunchy pita bites for the table and with your coffee, you get a cinnamon/sugar pita 'rusk'. It's the combination of the small details and the amazing food and service that makes this place what it is. Highly recommend!",
        avatar: "M",
        badges: ["Local Guide", "34 reviews"]
      },
      {
        name: "Andrew Geissler",
        rating: 5,
        date: "2 months ago",
        review: "Stopped by for lunch and was very impressed. We were seated and quickly brought a free sampling of sauces with fried pita bread. All the sauces tasted great and we ordered the chicken and falafel wraps. Both were great and the service was spot on too!",
        avatar: "AG",
        badges: ["Local Guide", "149 reviews"]
      },
      {
        name: "Farida Begum Ahmed",
        rating: 5,
        date: "4 weeks ago",
        review: "To the Falafel Guy team and my family thank you for my birthday spoils. Food was delicious, staff was helpful, and the atmosphere was great.",
        avatar: "FA",
        badges: ["Local Guide", "21 reviews"]
      },
      {
        name: "Joel Hammett",
        rating: 5,
        date: "7 months ago",
        review: "Fantastic chicken schwarma!! The fried potatoes are also amazing! My potatoes were delayed a few minutes, so they gave them to me on the house. Highly recommend!",
        avatar: "JH",
        badges: ["7 reviews"]
      }
    ]
  },
  "The Kiosk": {
    averageRating: 4.5,
    totalReviews: 215,
    googleUrl: "https://share.google/H190ufbSE5ufBAO4I",
    reviews: [
      {
        name: "Normajean Monroe",
        rating: 5,
        date: "a month ago",
        review: "Wanted to try something new.and felt like a shwarma. Arrived and.was a bit confused by the menu, but Lisa stepped in and explained everything, AND have us sauces to taste while we waited. The food was frikking amazing, and the chips were another level of crispy and delicious. Thank you.",
        avatar: "NM",
        badges: ["Local Guide", "37 reviews"]
      },
      {
        name: "Afrika Lovers",
        rating: 5,
        date: "a year ago",
        review: "Lovely Deon prepared the most kickass Sabich for us. Fast and furious service! Rich, tasty, flavoursome vegetarian goodness from the Middle East.",
        avatar: "AL",
        badges: ["Local Guide", "112 reviews"]
      },
      {
        name: "james kielczynski",
        rating: 5,
        date: "2 months ago",
        review: "Always exceptional. So much flavour. If I'm nearby I have to have a falafel... Even if I'm not hungry😂. Just tried out your new restaurant and the lovely young lady that served me was great. Well-done, team Falafel Guy 👏👏",
        avatar: "JK",
        badges: ["3 reviews"]
      },
      {
        name: "Katrien De Wachter",
        rating: 5,
        date: "a year ago",
        review: "Great variety of quick fingerfood. We indulged in our fallafels in pitta bread ( full option, including chilisauce) with fried potatoes. It was fingerlicking good. Portions are perfect even for big eaters. Prices are reasonable. Employees",
        avatar: "KD",
        badges: ["Local Guide", "61 reviews"]
      },
      {
        name: "Rohit Jain",
        rating: 5,
        date: "6 months ago",
        review: "Had the falafel pita at least once every day i stayed in Cape Town. Couldn't get enough of it. very filling and tasty as the same time. Reasonably priced. On my Last day, i thanked my server and ordered my last pita, the server gifted me",
        avatar: "RJ",
        badges: ["Local Guide", "16 reviews"]
      }
    ]
  }
};

export default function GoogleReviewsSection() {
  const [selectedLocation, setSelectedLocation] = useState("The Shop");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewsPerPage, setReviewsPerPage] = useState(3); // Default for desktop

  // Effect to determine reviewsPerPage based on window width
  useEffect(() => {
    const handleResize = () => {
      setReviewsPerPage(window.innerWidth < 768 ? 1 : 3);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize(); // Set initial value
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount


  const currentLocationData = reviewsData[selectedLocation];
  const totalPages = Math.ceil(currentLocationData.reviews.length / reviewsPerPage);

  const nextReviews = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevReviews = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentReviews = currentLocationData.reviews.slice(
    currentIndex * reviewsPerPage,
    (currentIndex + 1) * reviewsPerPage
  );

  // Reset index when location changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedLocation]);

  // Swipe handlers for mobile
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50; // Pixels to swipe before triggering a change
    if (reviewsPerPage === 1) { // Only enable swipe on mobile (when showing 1 review)
      if (info.offset.x > swipeThreshold) {
        prevReviews();
      } else if (info.offset.x < -swipeThreshold) {
        nextReviews();
      }
    }
  };

  return (
    <section className="bg-black py-16 sm:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="w-12 sm:w-16 h-1 mx-auto mb-4 sm:mb-6" style={{ backgroundColor: '#F8D09F' }} />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3 sm:mb-4 tracking-wide px-4">
            LOVED BY <span className="font-bold" style={{ color: '#F8D09F' }}>OUR COMMUNITY</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg font-light max-w-2xl mx-auto px-4">
            Don't just take our word for it—here's what our customers say
          </p>
        </motion.div>

        {/* Location Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12 px-4">
          <Tabs value={selectedLocation} onValueChange={setSelectedLocation}>
            <TabsList className="bg-black border-2 p-1 sm:p-2 h-auto w-full sm:w-auto" style={{ borderColor: '#F8D09F30' }}>
              <TabsTrigger 
                value="The Shop"
                className="data-[state=active]:text-black text-white/70 rounded-sm px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg font-semibold transition-all flex-1 sm:flex-initial"
                style={{
                  backgroundColor: selectedLocation === "The Shop" ? '#F8D09F' : 'transparent'
                }}
              >
                The Shop
              </TabsTrigger>
              <TabsTrigger 
                value="The Kiosk"
                className="data-[state=active]:text-black text-white/70 rounded-sm px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg font-semibold transition-all flex-1 sm:flex-initial"
                style={{
                  backgroundColor: selectedLocation === "The Kiosk" ? '#F8D09F' : 'transparent'
                }}
              >
                The Kiosk
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Rating Summary */}
        <motion.div
          key={selectedLocation}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto mb-12 sm:mb-16 text-center px-4"
        >
          <div className="border-2 rounded-lg p-6 sm:p-8" style={{ background: 'linear-gradient(to bottom right, #F8D09F10, #F8D09F05)', borderColor: '#F8D09F50' }}>
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <GoogleIcon />
              <span className="text-4xl sm:text-5xl font-bold text-white">{currentLocationData.averageRating}</span>
            </div>
            <div className="flex justify-center mb-2 sm:mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${i < Math.floor(currentLocationData.averageRating) ? 'fill-current' : 'fill-current opacity-40'}`}
                  style={{ color: '#F8D09F' }}
                />
              ))}
            </div>
            <p className="text-white/70 text-base sm:text-lg mb-4 sm:mb-6">
              Based on <span className="font-semibold" style={{ color: '#F8D09F' }}>{currentLocationData.totalReviews} reviews</span> on Google
            </p>
            <Button
              className="w-full sm:w-auto text-black font-semibold px-4 sm:px-8 py-3 sm:py-6 text-xs sm:text-base rounded-lg transition-all duration-300 group"
              style={{ backgroundColor: '#F8D09F' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5BD88'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F8D09F'}
              onClick={() => window.open(currentLocationData.googleUrl, '_blank')}
            >
              <span>Leave a Review</span>
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative px-4 sm:px-0">
          {/* Navigation Buttons - Now visible on mobile */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevReviews}
                className="absolute left-0 sm:left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full text-black transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110"
                style={{ backgroundColor: '#F8D09F' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5BD88'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F8D09F'}
                aria-label="Previous reviews"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={nextReviews}
                className="absolute right-0 sm:right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full text-black transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110"
                style={{ backgroundColor: '#F8D09F' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5BD88'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F8D09F'}
                aria-label="Next reviews"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* Reviews Grid */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedLocation}-${currentIndex}`}
                drag={reviewsPerPage === 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: reviewsPerPage === 1 ? (info => info.point.x > window.innerWidth / 2 ? 100 : -100) : 100 }} // Initial direction based on drag start
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reviewsPerPage === 1 ? (info => info.point.x > window.innerWidth / 2 ? -100 : 100) : -100 }} // Exit direction based on drag end
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 gap-4 sm:gap-6 cursor-grab active:cursor-grabbing"
              >
                {currentReviews.map((review, index) => (
                  <div
                    key={`${review.name}-${index}`}
                    className="border-2 rounded-lg p-4 sm:p-6 transition-all duration-300"
                    style={{ 
                      background: 'linear-gradient(to bottom right, #F8D09F05, transparent)', 
                      borderColor: '#F8D09F30' 
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#F8D09F60'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#F8D09F30'}
                  >
                    {/* Review Header */}
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 flex-shrink-0" style={{ backgroundColor: '#F8D09F20', borderColor: '#F8D09F60' }}>
                        <span className="font-bold text-base sm:text-lg" style={{ color: '#F8D09F' }}>{review.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-base sm:text-lg mb-1 truncate">{review.name}</h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                          {review.badges.map((badge, i) => (
                            <span key={i} className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded">
                              {badge}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" style={{ color: '#F8D09F' }} />
                            ))}
                          </div>
                          <span className="text-white/50 text-xs sm:text-sm">{review.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed">
                      "{review.review}"
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6 sm:mt-8">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'w-8' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  style={i === currentIndex ? { backgroundColor: '#F8D09F' } : {}}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16 px-4"
        >
          <div className="w-full h-px mb-6 sm:mb-8" style={{ background: 'linear-gradient(to right, transparent, #F8D09F50, transparent)' }} />
          <Button
            variant="outline"
            className="w-full sm:w-auto border-2 text-black font-semibold px-4 sm:px-12 py-3 sm:py-6 text-xs sm:text-lg rounded-none transition-all duration-300 group"
            style={{ borderColor: '#F8D09F', backgroundColor: 'transparent', color: '#F8D09F' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F8D09F';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#F8D09F';
            }}
            onClick={() => window.open(currentLocationData.googleUrl, '_blank')}
          >
            <GoogleIcon />
            <span className="ml-3">READ ALL REVIEWS ON GOOGLE</span>
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
