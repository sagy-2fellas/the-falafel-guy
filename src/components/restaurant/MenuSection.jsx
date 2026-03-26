
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MenuItemCard from './MenuItemCard';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const menuData = {
  "Pitas": [
    { name: "Falafel Pita", price: "R95.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_d9831e03-eab3-48c8-a766-1b7a8bbff542.png" },
    { name: "Chicken Shawarma Pita", price: "R89.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_ae023c2d-dc1f-4b6c-b707-23802af8acef.png" },
    { name: "Beef Shawarma Pita", price: "R129.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_3f0cdbae-4de4-4379-ae5b-8284f01b8a53.png" },
    { name: "Chicken Tenders Pita", price: "R110.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_232219af-3482-4211-a58a-9effee06c2e3.png" },
    { name: "Brinjal Pita (Sabich)", price: "R90.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_359d1e08-4c52-4845-a970-8f34b4ed0de6.png" },
    { name: "Hummus Pita", price: "R85.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_c27e641f-e298-420d-bd80-12fa7be2f4e5.png" },
    { name: "Falafel Pita", price: "R105.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_d9831e03-eab3-48c8-a766-1b7a8bbff542.png" },
    { name: "Brinjal Pita (Sabich)", price: "R95.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_359d1e08-4c52-4845-a970-8f34b4ed0de6.png" },
    { name: "Chicken Shawarma Pita", price: "R125.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_ae023c2d-dc1f-4b6c-b707-23802af8acef.png" },
    { name: "Chicken Tenders Pita", price: "R125.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_232219af-3482-4211-a58a-9effee06c2e3.png" },
    { name: "Beef Shawarma Pita", price: "R139.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_3f0cdbae-4de4-4379-ae5b-8284f01b8a53.png" },
    { name: "Hummus Pita", price: "R89.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_c27e641f-e298-420d-bd80-12fa7be2f4e5.png" },
  ],
  "Laffa": [
    { name: "Falafel Laffa", price: "R145.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_d9d31a34-cd4c-4783-8325-bba083fd6cea.png" },
    { name: "Beef Shawarma Laffa", price: "R189.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_7f2094bf-7be3-44a0-ad50-b74adf57d073.png" },
    { name: "Falafel Laffa", price: "R135.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_d9d31a34-cd4c-4783-8325-bba083fd6cea.png" },
    { name: "Beef Shawarma Laffa", price: "R175.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_7f2094bf-7be3-44a0-ad50-b74adf57d073.png" },
    { name: "Brinjal Laffa (Sabich)", price: "R130.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_359d1e08-4c52-4845-a970-8f34b4ed0de6.png" },
    { name: "Chicken Shawarma Laffa", price: "R165.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_6738284c-b51b-4445-b56a-2d18e2d537d8.png" },
    { name: "Chicken Tenders Laffa", price: "R165.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_d02b3bf6-a466-4a17-a4e4-2789639622e9.png" },
    { name: "Chicken Shawarma Laffa", price: "R175.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_6738284c-b51b-4445-b56a-2d18e2d537d8.png" },
    { name: "Chicken Tenders Laffa", price: "R175.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_d02b3bf6-a466-4a17-a4e4-2789639622e9.png" },
    { name: "Brinjal Laffa (Sabich)", price: "R133.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_359d1e08-4c52-4845-a970-8f34b4ed0de6.png" },
  ],
  "Combo Meals": [
    { name: "Falafel Pita Combo", price: "R159.00", image: "https://images.unsplash.com/photo-1562967914-01efa7e87832?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Falafel Laffa Combo", price: "R199.00", image: "https://images.unsplash.com/photo-1594212699903-ec8a6e502de6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Beef Shawarma Pita Combo", price: "R195.00", image: "https://images.unsplash.com/photo-1606013624469-c06b7a873def?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Beef Shawarma Laffa Combo", price: "R245.00", image: "https://images.unsplash.com/photo-1560781297-579525426374?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Brinjal Pita Combo", price: "R155.00", image: "https://images.unsplash.com/photo-1621294833219-5a8a1e3e7f3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Brinjal Laffa Combo", price: "R195.00", image: "https://thefalafelguy.co.za/wp-content/uploads/2022/10/the-falafel-guy-logo.png" },
    { name: "Chicken Shawarma Pita Combo", price: "R185.00", image: "https://images.unsplash.com/photo-1606013624469-c06b7a873def?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Chicken Shawarma Laffa Combo", price: "R235.00", image: "https://images.unsplash.com/photo-1560781297-579525426374?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Chicken Tenders Pita Combo", price: "R185.00", image: "https://images.unsplash.com/photo-1625944230942-7115a434e27e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Chicken Tenders Laffa Combo", price: "R235.00", image: "https://images.unsplash.com/photo-1560781297-579525426374?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Chicken Shawarma Laffa Combo", price: "R235.00", image: "https://thefalafelguy.co.za/wp-content/uploads/2022/10/the-falafel-guy-logo.png" },
  ],
  "Half Pita Combos": [
    { name: "Half Falafel Combo", price: "R105.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_d9831e03-eab3-48c8-a766-1b7a8bbff542.png" },
    { name: "Half Beef Shawarma Combo", price: "R115.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_3f0cdbae-4de4-4379-ae5b-8284f01b8a53.png" },
    { name: "Half Chicken Shawarma", price: "R105.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_ae023c2d-dc1f-4b6c-b707-23802af8acef.png" },
    { name: "Half Chicken Tenders Combo", price: "R105.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_232219af-3482-4211-a58a-9effee06c2e3.png" },
    { name: "Half Sabich Combo", price: "R105.00", image: "https://s3.eu-west-1.amazonaws.com/com.ikentoo.prod.rich-content-store/5742_359d1e08-4c52-4845-a970-8f34b4ed0de6.png" },
  ],
  "Plates": [
    { name: "Falafel Plate", price: "R135.00", image: "https://images.unsplash.com/photo-1627404512015-68494b283196?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Chicken Tenders Plate", price: "R150.00", image: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "5 Loyalty Wings Plate 10 pieces", price: "R160.00", image: "https://thefalafelguy.co.za/wp-content/uploads/2022/10/the-falafel-guy-logo.png" },
    { name: "Beef Shawarma Plate", price: "R160.00", image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Chicken Shawarma Plate", price: "R150.00", image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Wings Plate 10 pieces", price: "R165.00", image: "https://images.unsplash.com/photo-1527477396000-e27173d0c431?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
  ],
  "Hummus Bowls": [
    { name: "Chicken Shawarma Hummus Bowl", price: "R159.00", image: "https://thefalafelguy.co.za/wp-content/uploads/2022/10/the-falafel-guy-logo.png" },
    { name: "Beef Shawarma Hummus bowl", price: "R169.00", image: "https://thefalafelguy.co.za/wp-content/uploads/2022/10/the-falafel-guy-logo.png" },
    { name: "5Loyalty Vegan Hummus Bowl", price: "R9.00", image: "https://thefalafelguy.co.za/wp-content/uploads/2022/10/the-falafel-guy-logo.png" },
  ],
  "Sides": [
    { name: "Crispy potato Bites", price: "R50.00", image: "https://images.unsplash.com/photo-1598679253440-2c5b0f52d201?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Side Chopped Salad", price: "R70.00", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Xtra Chicken Shawarma", price: "R69.00", image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Xtra Beef Shawarma", price: "R79.00", image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Cocktail Wings (8)", price: "R89.00", image: "https://images.unsplash.com/photo-1629385934493-2cb4343d22e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Falafel Balls (6)", price: "R49.00", image: "https://images.unsplash.com/photo-1593992854933-4c07929a259c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
    { name: "Falafel Ball", price: "R8.00", image: "https://thefalafelguy.co.za/wp-content/uploads/2022/10/the-falafel-guy-logo.png" },
  ],
};


export default function MenuSection() {
  const categories = Object.keys(menuData);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <section className="min-h-screen bg-black py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="w-16 h-1 bg-yellow-600 mx-auto mb-6" />
          <h2 className="text-5xl md:text-6xl font-light text-white mb-4 tracking-wide">
            OUR <span className="font-bold text-yellow-500">MENU</span>
          </h2>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
            Every dish crafted with authentic recipes and the finest ingredients.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="bg-black border border-yellow-600/20 p-2 h-auto flex-wrap justify-center">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black text-white/70 hover:bg-yellow-600/10 rounded-sm"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div>
          {categories.map((category) => (
            selectedCategory === category && (
              <motion.div
                key={category}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
              >
                {menuData[category].map((item, index) => (
                  <MenuItemCard key={`${category}-${index}`} item={item} />
                ))}
              </motion.div>
            )
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/40 text-sm font-light italic">
            All dishes can be made vegetarian or vegan upon request.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
