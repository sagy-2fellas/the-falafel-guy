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
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold text-white group-hover:transition-colors duration-300 mb-2 truncate" style={{ color: 'white' }} onMouseEnter={(e) => e.currentTarget.style.color = '#F8D09F'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
            {item.name}
          </h3>
          <p className="text-lg font-bold" style={{ color: '#F8D09F' }}>
            {item.price}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}