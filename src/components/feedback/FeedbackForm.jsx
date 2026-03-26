
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';

export default function FeedbackForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: '',
    rating: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Save feedback to database
      await base44.entities.Feedback.create(formData);
      
      // Send email notification
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
        .rating-stars { color: #F8D09F; font-size: 20px; }
        a { color: #F8D09F; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h2>New Customer Feedback!</h2>
        
        <div class="field">
            <div class="field-label">Name:</div>
            <div class="field-value">${formData.name}</div>
        </div>
        
        <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value"><a href="mailto:${formData.email}">${formData.email}</a></div>
        </div>
        
        ${formData.phone ? `
        <div class="field">
            <div class="field-label">Phone:</div>
            <div class="field-value">${formData.phone}</div>
        </div>
        ` : ''}

        <div class="field">
            <div class="field-label">Location:</div>
            <div class="field-value">${formData.location}</div>
        </div>
        
        ${formData.rating > 0 ? `
        <div class="field">
            <div class="field-label">Rating:</div>
            <div class="field-value">
                <span class="rating-stars">${'⭐'.repeat(formData.rating)}</span> (${formData.rating}/5)
            </div>
        </div>
        ` : ''}

        <div class="field">
            <div class="field-label">Message:</div>
            <div class="field-value">${formData.message.replace(/\n/g, '<br>')}</div>
        </div>
        
        <div class="footer">
            <p>This feedback was submitted via The Falafel Guy website.</p>
            <p>Submission time: ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}</p>
        </div>
    </div>
</body>
</html>
      `;
      
      await base44.integrations.Core.SendEmail({
        to: 'hello@thefalafelguy.co.za',
        subject: `New Feedback from ${formData.name} - ${formData.location}`,
        body: emailBody,
        from_name: 'The Falafel Guy Website'
      });
      
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError(error?.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">Thank You!</h3>
        <p className="text-white/70 text-lg">
          We appreciate your feedback and will use it to improve our service.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">We Value Your Feedback</h3>
        <p className="text-white/70">
          Help us improve by sharing your experience. Your feedback goes directly to our management team.
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border-2 border-red-500/50 rounded-lg p-4 flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-200 text-sm">{error}</p>
        </motion.div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/80 mb-2 text-sm font-semibold">Name *</label>
          <Input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            className="bg-white/10 border-2 text-white placeholder:text-white/40"
            style={{ borderColor: '#F8D09F30' }}
          />
        </div>

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
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/80 mb-2 text-sm font-semibold">Phone</label>
          <Input
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Your phone number"
            className="bg-white/10 border-2 text-white placeholder:text-white/40"
            style={{ borderColor: '#F8D09F30' }}
          />
        </div>

        <div>
          <label className="block text-white/80 mb-2 text-sm font-semibold">Location *</label>
          <Select
            required
            value={formData.location}
            onValueChange={(value) => setFormData({ ...formData, location: value })}
          >
            <SelectTrigger className="bg-white/10 border-2 text-white" style={{ borderColor: '#F8D09F30' }}>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="The Shop">The Shop</SelectItem>
              <SelectItem value="The Kiosk">The Kiosk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-white/80 mb-2 text-sm font-semibold">Rate Your Experience</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData({ ...formData, rating: star })}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${star <= formData.rating ? 'fill-current' : ''}`}
                style={{ color: star <= formData.rating ? '#F8D09F' : '#ffffff40' }}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white/80 mb-2 text-sm font-semibold">Your Feedback *</label>
        <Textarea
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please share your thoughts and suggestions..."
          className="bg-white/10 border-2 text-white placeholder:text-white/40 h-32"
          style={{ borderColor: '#F8D09F30' }}
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1 border-2 text-white py-6"
          style={{ borderColor: '#F8D09F50', backgroundColor: 'transparent' }}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 text-black font-semibold py-6"
          style={{ background: 'linear-gradient(to right, #F8D09F, #E5BD88)' }}
        >
          {isSubmitting ? (
            'Submitting...'
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
}
