
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import emailjs from '@emailjs/browser';

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
      await emailjs.send('service_626fsx8', 'template_mdpstab', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        location: formData.location,
        rating: formData.rating,
        message: formData.message,
      }, 'Ln47pmBh5mYB9EIs9');

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback. Please try again.');
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
