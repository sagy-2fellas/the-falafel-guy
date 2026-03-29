import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';

const locations = [
  {
    title: "The Shop",
    address: "152 Main Road<br />Sea Point, Cape Town, 8005",
    mapsQuery: "152 Main Road, Sea Point, Cape Town, 8005",
    weekdayHours: "Mon-Fri: 9:00am - 11:00pm",
    weekendHours: "Sat-Sun: 9:00am - 11:30pm",
    phone: "021 015 0090",
    note: "Online orders to be collected from our main shop"
  },
  {
    title: "The Kiosk",
    address: "Sea Point Pavillion, Beach Rd<br />Sea Point, Cape Town, 8005, South Africa",
    mapsQuery: "Sea Point Pavillion, Beach Rd, Sea Point, Cape Town, 8005",
    weekdayHours: "Closed Monday",
    weekendHours: "Tue-Sun: 11:00am - 8:00pm",
    phone: "0790268722"
  }
];

export default function ContactSection() {
  return (
    <section className="bg-black py-16 sm:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <div className="w-12 sm:w-16 h-1 mx-auto mb-4 sm:mb-6" style={{ backgroundColor: '#F8D09F' }} />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3 sm:mb-4 tracking-wide">
            VISIT <span className="font-bold" style={{ color: '#F8D09F' }}>US</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg font-light">
            Open 7 days a week
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-x-12 sm:gap-y-16">
          {locations.map((location, index) => (
            <motion.div
              key={location.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative border-2 p-6 sm:p-8 pt-10 sm:pt-12"
              style={{ borderColor: '#F8D09F30' }}
            >
              <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 bg-black px-4 sm:px-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-center whitespace-nowrap" style={{ background: 'linear-gradient(to right, #F8D09F, #E5BD88, #F8D09F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {location.title}
                </h3>
              </div>
              
              <div className="space-y-6 sm:space-y-8">
                <div className="flex gap-4 sm:gap-6 items-start">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7 mt-1 flex-shrink-0" style={{ color: '#F8D09F' }} />
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Address</h4>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapsQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 text-sm sm:text-base font-light leading-relaxed hover:text-[#F8D09F] transition-colors duration-300 cursor-pointer block"
                      dangerouslySetInnerHTML={{ __html: location.address }}
                    />
                  </div>
                </div>

                <div className="flex gap-4 sm:gap-6 items-start">
                  <Clock className="w-6 h-6 sm:w-7 sm:h-7 mt-1 flex-shrink-0" style={{ color: '#F8D09F' }} />
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Operating Hours</h4>
                    <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                      {location.weekdayHours}<br />
                      {location.weekendHours}
                    </p>
                    {location.note && (
                      <p className="text-xs sm:text-sm font-light mt-3 italic" style={{ color: '#F8D09F80' }}>
                        {location.note}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 sm:gap-6 items-start">
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7 mt-1 flex-shrink-0" style={{ color: '#F8D09F' }} />
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Phone</h4>
                    <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                      <a 
                        href={`tel:${location.phone.replace(/\s/g, '')}`} 
                        className="transition-colors hover:text-[#F8D09F] duration-300"
                      >
                        {location.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}