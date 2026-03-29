import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export default function MenuItemCard({ item }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Card className="bg-black border-2 transition-all duration-300 h-full group overflow-hidden" style={{ borderColor: '#F8D09F20' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#F8D09F80'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#F8D09F20'}>
        {item.image ? (
          <div className="relative aspect-square overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        ) : (
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-yellow-900/20 to-black flex items-center justify-center">
            <img src="/falafel-guy-logo.png" alt="The Falafel Guy" className="w-16 h-16 opacity-30" loading="lazy" />
          </div>
        )}
        <CardContent className="p-4">
          {item.tag && (
            <span className="inline-block text-xs font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded mb-2">
              {item.tag}
            </span>
          )}
          <h3 className="text-xl font-semibold text-white group-hover:transition-colors duration-300 mb-1 truncate" style={{ color: 'white' }} onMouseEnter={(e) => e.currentTarget.style.color = '#F8D09F'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
            {item.name}
          </h3>
          {item.description && (
            <p className="text-xs text-white/50 mb-2 line-clamp-2">{item.description}</p>
          )}
          <p className="text-lg font-bold" style={{ color: '#F8D09F' }}>
            {item.price}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}