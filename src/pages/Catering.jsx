
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Award, CheckCircle, Mail, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';

export default function Catering() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    eventType: '',
    guestCount: '',
    eventDate: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formattedEventDate = formData.eventDate 
        ? format(new Date(formData.eventDate), 'dd/MM/yyyy') 
        : 'Not provided';

      const emailBody = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px; margin: 0; }
        .container { background-color: #ffffff; border-radius: 8px; padding: 30px; max-width: 650px; margin: auto; border: 1px solid #ddd; box-shadow: 0 4px 8px rgba(0,0,0,0.05); }
        h2 { color: #F8D09F; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 0; font-size: 24px; font-weight: bold; }
        .field { margin-bottom: 20px; }
        .field-label { font-weight: bold; color: #555; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;}
        .field-value { padding: 12px; background-color: #f9f9f9; border-radius: 4px; border-left: 3px solid #F8D09F; font-size: 16px; line-height: 1.5; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #888; font-size: 12px; }
        a { color: #F8D09F; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h2>New Catering Inquiry!</h2>
        
        ${formData.companyName ? `
        <div class="field">
            <div class="field-label">Company/Organization:</div>
            <div class="field-value">${formData.companyName}</div>
        </div>
        ` : ''}
        
        <div class="field">
            <div class="field-label">Contact Person:</div>
            <div class="field-value">${formData.contactPerson}</div>
        </div>
        
        <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value"><a href="mailto:${formData.email}">${formData.email}</a></div>
        </div>
        
        <div class="field">
            <div class="field-label">Phone:</div>
            <div class="field-value">${formData.phone}</div>
        </div>
        
        <div class="field">
            <div class="field-label">Event Type:</div>
            <div class="field-value">${formData.eventType}</div>
        </div>
        
        <div class="field">
            <div class="field-label">Expected Guests:</div>
            <div class="field-value">${formData.guestCount}</div>
        </div>
        
        <div class="field">
            <div class="field-label">Event Date:</div>
            <div class="field-value">${formattedEventDate}</div>
        </div>
        
        <div class="field">
            <div class="field-label">Message:</div>
            <div class="field-value">${formData.message.replace(/\n/g, '<br>')}</div>
        </div>
        
        <div class="footer">
            <p>This catering inquiry was submitted via The Falafel Guy website.</p>
            <p>Submission time: ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}</p>
        </div>
    </div>
</body>
</html>
      `;

      // Send to first email
      await base44.integrations.Core.SendEmail({
        to: 'pitapocketsa@gmail.com',
        subject: `Catering Inquiry from ${formData.companyName || formData.contactPerson}`,
        body: emailBody,
        from_name: 'The Falafel Guy Catering'
      });

      // Send to second email
      await base44.integrations.Core.SendEmail({
        to: 'hello@thefalafelguy.co.za',
        subject: `Catering Inquiry from ${formData.companyName || formData.contactPerson}`,
        body: emailBody,
        from_name: 'The Falafel Guy Catering'
      });
      
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          eventType: '',
          guestCount: '',
          eventDate: '',
          message: ''
        });
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: Users,
      title: "Corporate Events",
      description: "Impress your colleagues and clients with authentic Middle Eastern cuisine at your next corporate event, meeting, or conference."
    },
    {
      icon: Calendar,
      title: "Private Functions",
      description: "Celebrations, weddings, birthdays, or any special occasion - we'll make your event memorable with our delicious food."
    },
    {
      icon: Award,
      title: "Office Catering",
      description: "Regular office catering solutions for teams. Keep your staff energized with our healthy, halaal options."
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          // Removed the style prop containing the missing background image
        />
        <div className="absolute inset-0 z-[1] bg-black/80" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: '#F8D09F' }} />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 tracking-wide">
              CATERING & <span className="font-bold" style={{ color: '#F8D09F' }}>BUSINESS SERVICES</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/80 font-light max-w-3xl mx-auto mb-8">
              Elevate your events with authentic Middle Eastern cuisine
            </p>
            <Button
              onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-black font-semibold px-8 py-6 text-lg rounded-none transition-all duration-300 transform hover:scale-105"
              style={{ background: 'linear-gradient(to right, #F8D09F, #E5BD88)' }}
            >
              Request a Quote
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: '#F8D09F' }} />
            <h2 className="text-4xl sm:text-5xl font-light text-white mb-4">
              OUR <span className="font-bold" style={{ color: '#F8D09F' }}>SERVICES</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="border-2 rounded-lg p-8 transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(to bottom right, #F8D09F10, transparent)', borderColor: '#F8D09F30' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#F8D09F'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#F8D09F30'}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #F8D09F30, #F8D09F10)' }}>
                  <service.icon className="w-8 h-8" style={{ color: '#F8D09F' }} />
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-4">{service.title}</h3>
                <p className="text-white/70 text-center leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Service Options */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: '#F8D09F' }} />
            <h2 className="text-4xl sm:text-5xl font-light text-white mb-4">
              UNIQUE <span className="font-bold" style={{ color: '#F8D09F' }}>EXPERIENCES</span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Choose the perfect catering style for your event
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* On-Site Assembly Option */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="border-2 rounded-lg p-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(to bottom right, #F8D09F15, #F8D09F05)', borderColor: '#F8D09F50' }}
            >
              <div className="relative z-10">
                <div className="w-16 h-16 mb-6 rounded-full flex items-center justify-center border-2" style={{ background: 'linear-gradient(to bottom right, #F8D09F30, #F8D09F10)', borderColor: '#F8D09F' }}>
                  <Users className="w-8 h-8" style={{ color: '#F8D09F' }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Full Service Experience</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  Our team will assemble and serve at your venue, duplicating our authentic restaurant experience right at your event. 
                  Watch as we prepare fresh pitas, serve signature sauces, and create the same vibrant atmosphere you love from our locations.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#F8D09F' }} />
                    <span>Professional staff on-site</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#F8D09F' }} />
                    <span>Live food preparation</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#F8D09F' }} />
                    <span>Complete restaurant experience</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#F8D09F' }} />
                    <span>Setup and cleanup included</span>
                  </li>
                </ul>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl" style={{ background: '#F8D09F20' }} />
            </motion.div>

            {/* DIY Deconstructed Menu Option */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="border-2 rounded-lg p-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(to bottom right, #F8D09F15, #F8D09F05)', borderColor: '#F8D09F50' }}
            >
              <div className="relative z-10">
                <div className="w-16 h-16 mb-6 rounded-full flex items-center justify-center border-2" style={{ background: 'linear-gradient(to bottom right, #F8D09F30, #F8D09F10)', borderColor: '#F8D09F' }}>
                  <Award className="w-8 h-8" style={{ color: '#F8D09F' }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Deconstructed DIY Menu</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  Let your guests become their own chefs! We provide all the fresh ingredients separately so your guests can mix, match, 
                  and assemble their perfect meal. A fun, interactive experience that brings everyone together.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#F8D09F' }} />
                    <span>All ingredients provided separately</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#F8D09F' }} />
                    <span>Build-your-own station setup</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#F8D09F' }} />
                    <span>Interactive and fun for guests</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#F8D09F' }} />
                    <span>Perfect for team building events</span>
                  </li>
                </ul>
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl" style={{ background: '#F8D09F20' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: '#F8D09F' }} />
            <h2 className="text-4xl sm:text-5xl font-light text-white mb-4">
              WHY CHOOSE <span className="font-bold" style={{ color: '#F8D09F' }}>US</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "100% Halaal", desc: "Certified halaal ingredients" },
              { title: "Fresh Daily", desc: "Made fresh on the day" },
              { title: "Flexible Menu", desc: "Customizable options" },
              { title: "Professional Service", desc: "Experienced team" }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-2" style={{ background: 'linear-gradient(to bottom right, #F8D09F20, #F8D09F05)', borderColor: '#F8D09F50' }}>
                  <CheckCircle className="w-8 h-8" style={{ color: '#F8D09F' }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="inquiry-form" className="py-16 sm:py-24 px-4 sm:px-6 bg-black/50">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: '#F8D09F' }} />
            <h2 className="text-4xl sm:text-5xl font-light text-white mb-4">
              REQUEST A <span className="font-bold" style={{ color: '#F8D09F' }}>QUOTE</span>
            </h2>
            <p className="text-white/70 text-lg">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="border-2 rounded-lg p-8"
            style={{ background: 'linear-gradient(to bottom right, #F8D09F10, transparent)', borderColor: '#F8D09F30' }}
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Thank You!</h3>
                <p className="text-white/70 text-lg">
                  We've received your inquiry and will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-semibold">Company/Organization</label>
                    <Input
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Your company name"
                      className="bg-white/10 border-2 text-white placeholder:text-white/40"
                      style={{ borderColor: '#F8D09F30' }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-semibold">Contact Person *</label>
                    <Input
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="Your name"
                      className="bg-white/10 border-2 text-white placeholder:text-white/40"
                      style={{ borderColor: '#F8D09F30' }}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-semibold">Email *</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="bg-white/10 border-2 text-white placeholder:text-white/40"
                      style={{ borderColor: '#F8D09F30' }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-semibold">Phone *</label>
                    <Input
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Your phone number"
                      className="bg-white/10 border-2 text-white placeholder:text-white/40"
                      style={{ borderColor: '#F8D09F30' }}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-semibold">Event Type *</label>
                    <Input
                      required
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      placeholder="e.g. Corporate lunch"
                      className="bg-white/10 border-2 text-white placeholder:text-white/40"
                      style={{ borderColor: '#F8D09F30' }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-semibold">Guest Count *</label>
                    <Input
                      required
                      type="number" 
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      placeholder="Number of guests"
                      className="bg-white/10 border-2 text-white placeholder:text-white/40"
                      style={{ borderColor: '#F8D09F30' }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-semibold">Event Date</label>
                    <Input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="bg-white/10 border-2 text-white placeholder:text-white/40"
                      style={{ borderColor: '#F8D09F30' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-semibold">Additional Details *</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your event, dietary requirements, preferred menu, etc."
                    className="bg-white/10 border-2 text-white placeholder:text-white/40 h-32"
                    style={{ borderColor: '#F8D09F30' }}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-black font-semibold py-6 text-lg rounded-none"
                  style={{ background: 'linear-gradient(to right, #F8D09F, #E5BD88)' }}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Inquiry
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-white/60 text-sm mb-4">Or contact us directly:</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="tel:0210150090" className="flex items-center justify-center gap-2 text-white/80 hover:text-[#F8D09F] transition-colors">
                      <Phone className="w-4 h-4" />
                      021 015 0090
                    </a>
                    <a href="mailto:hello@thefalafelguy.co.za" className="flex items-center justify-center gap-2 text-white/80 hover:text-[#F8D09F] transition-colors">
                      <Mail className="w-4 h-4" />
                      hello@thefalafelguy.co.za
                    </a>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
