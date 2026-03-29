import React from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

const locations = [
  {
    title: "The Shop",
    address: "152 Main Road, Sea Point, Cape Town, 8005",
    mapsQuery: "152 Main Road, Sea Point, Cape Town, 8005",
    weekdayHours: "Mon-Fri: 9:00am - 11:00pm",
    weekendHours: "Sat-Sun: 9:00am - 11:30pm",
    phone: "021 015 0090",
    note: "Online orders to be collected from our main shop"
  },
  {
    title: "The Kiosk",
    address: "Sea Point Pavillion, Beach Rd, Sea Point, Cape Town, 8005",
    mapsQuery: "Sea Point Pavillion, Beach Rd, Sea Point, Cape Town, 8005",
    weekdayHours: "Closed Monday",
    weekendHours: "Tue-Sun: 11:00am - 8:00pm",
    phone: "0790268722"
  }
];

const socialLinks = [
  { icon: Instagram, url: "https://www.instagram.com/thefalafelguysa", label: "Instagram", type: "icon" },
  { icon: Facebook, url: "https://www.facebook.com/thefalafelguy", label: "Facebook", type: "icon" },
  { icon: "/images/tiktok-icon.png", url: "https://www.tiktok.com/@thefalafelguy", label: "TikTok", type: "image" },
  { icon: MessageCircle, url: "https://wa.me/27726606526", label: "WhatsApp", type: "icon" },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/Menu" },
  { label: "Catering", to: "/Catering" },
  { label: "Feedback", to: "/Feedback" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t" style={{ borderColor: '#F8D09F15' }}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <p className="text-base font-bold mb-2" style={{ color: '#F8D09F' }}>The Falafel Guy</p>
            <p className="text-white/50 text-sm font-light leading-relaxed mb-6">
              Halaal Middle Eastern Streatery in Sea Point, Cape Town. Everything made fresh daily.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ borderColor: '#F8D09F40' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#F8D09F'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#F8D09F40'}
                  aria-label={social.label}
                >
                  {social.type === "image" ? (
                    <img src={social.icon} alt={social.label} className="w-4 h-4" />
                  ) : (
                    <social.icon className="w-4 h-4" style={{ color: '#F8D09F' }} />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Locations */}
          {locations.map((location) => (
            <div key={location.title}>
              <h4 className="font-bold text-base mb-4" style={{ color: '#F8D09F' }}>
                {location.title}
              </h4>
              <div className="space-y-3">
                <div className="flex gap-2 items-start">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 text-sm font-light leading-relaxed hover:text-[#F8D09F] transition-colors duration-300"
                  >
                    {location.address}
                  </a>
                </div>
                <div className="flex gap-2 items-start">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    {location.weekdayHours}<br />
                    {location.weekendHours}
                  </p>
                </div>
                <div className="flex gap-2 items-start">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
                  <a
                    href={`tel:${location.phone.replace(/\s/g, '')}`}
                    className="text-white/60 text-sm font-light hover:text-[#F8D09F] transition-colors duration-300"
                  >
                    {location.phone}
                  </a>
                </div>
                {location.note && (
                  <p className="text-xs font-light italic pl-6" style={{ color: '#F8D09F60' }}>
                    {location.note}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-base mb-4" style={{ color: '#F8D09F' }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white/60 text-sm font-light hover:text-[#F8D09F] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://thefalafelguy.5loyalty.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light transition-colors duration-300"
                  style={{ color: '#F8D09F' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FDE5C4'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#F8D09F'}
                >
                  Order Online
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="mailto:hello@thefalafelguy.co.za"
                className="inline-flex items-center gap-2 text-white/60 text-sm font-light hover:text-[#F8D09F] transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                hello@thefalafelguy.co.za
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8" style={{ borderTop: '1px solid #F8D09F15' }}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p className="text-white/40 text-xs font-light">
                © 2025 The Falafel Guy. DD Holdings Co Pty Ltd. All rights reserved.
              </p>
              <span className="hidden sm:inline text-white/20">|</span>
              <Link
                to={createPageUrl('PrivacyPolicy')}
                className="text-white/40 hover:text-[#F8D09F] text-xs font-light transition-colors duration-300"
              >
                Privacy Policy (POPIA)
              </Link>
            </div>
            <p className="text-white/30 text-xs font-light">
              Made with <span style={{ color: '#F8D09F' }}>&#9829;</span> by{' '}
              <a href="https://2fellasmedia.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F8D09F] transition-colors duration-300">
                2fellasmedia.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
