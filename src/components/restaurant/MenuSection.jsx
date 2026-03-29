
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MenuItemCard from './MenuItemCard';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IMG = "/images/menu/flat";

const menuData = {
  "Pita Sandwich": [
    { name: "Falafel", price: "R105", description: "Includes hardboiled egg", image: `${IMG}/pita-falafel-pita.jpg` },
    { name: "Chicken Shawarma", price: "R125", image: `${IMG}/pita-chicken-shawarma.jpg` },
    { name: "Beef Shawarma", price: "R139", image: `${IMG}/pita-beef-shawarma.jpg` },
    { name: "Chicken Tenders", price: "R125", image: `${IMG}/pita-schnitzel-pita.jpg` },
    { name: "Hummus", price: "R89", image: `${IMG}/pita-hummus-pita.jpg` },
    { name: "Brinjal", price: "R95", description: "Includes hardboiled egg", image: `${IMG}/pita-brinjal-pita.jpg` },
  ],
  "Laffa Sandwich": [
    { name: "Falafel", price: "R145", image: `${IMG}/laffa-falafel-laffa.jpg` },
    { name: "Chicken Shawarma", price: "R175", image: `${IMG}/laffa-chicken-shawarma-laffa.jpg` },
    { name: "Beef Shawarma", price: "R189", image: `${IMG}/laffa-beef-laffa.jpg` },
    { name: "Chicken Tenders", price: "R175", image: `${IMG}/laffa-tenders-laffa.jpg` },
    { name: "Brinjal", price: "R135", image: `${IMG}/laffa-whatsapp-image-2021-07-13-at-16.59.56.jpeg` },
  ],
  "Mezze Pitas": [
    { name: "Mezze Falafel Pita", price: "R55", image: `${IMG}/mezze-falafel-pita.jpg` },
    { name: "Mezze Chicken Shawarma Pita", price: "R60", image: `${IMG}/mezze-chicken-shawarma.jpg` },
    { name: "Mezze Beef Shawarma Pita", price: "R65", image: `${IMG}/pita-beef-shawarma.jpg` },
    { name: "Mezze Schnitzel Pita", price: "R65", image: `${IMG}/pita-schnitzel-pita.jpg` },
    { name: "Four Play", price: "R225", description: "All four mezze pitas", image: `${IMG}/mezze-falafel-pita.jpg` },
  ],
  "Starters": [
    { name: "Jalapeno Poppers (3)", price: "R89", description: "Jalapeno stuffed with cream & cheddar cheese coated in pita bread crumbs", image: `${IMG}/starter-chili-poppers.jpg` },
    { name: "Cocktail Wings (8)", price: "R89", description: "Your choice of sauce: BBQ, buffalo or peri-peri", image: `${IMG}/starter-cocktail-wings.jpeg` },
    { name: "Falafel Balls (6)", price: "R49", image: `${IMG}/starter-6x-falafel-balls.jpg` },
    { name: "Chicken Tenders (4)", price: "R65", description: "Four crumbed chicken tenderloins", image: `${IMG}/starter-extra-chicekn-shnitzel.jpg` },
    { name: "Corn Dog (1)", price: "R65", description: "Battered coated deep fried hotdog" },
    { name: "Hummus", price: "R59", description: "Silky smooth chickpea spread", image: `${IMG}/deli-hummus-250ml.jpg` },
    { name: "Tahini", price: "R65", description: "Traditional sesame seed dip made the vegan way" },
    { name: "Pickles", price: "R40", description: "Pickled red cabbage, cucumber, chili or a mix of all three" },
    { name: "Chopped Salad", price: "R70", description: "Freshly hand diced tomato, cucumber, lettuce, cabbage", image: `${IMG}/starter-side-salad.jpg` },
    { name: "Fried Brinjal", price: "R45", description: "Soft peeled fried eggplant" },
    { name: "Crispy Potato Bites", price: "R50", description: "AKA Potato Crack - imagine crispy chips and potato wedges had a baby", image: `${IMG}/starter-crispy-potato-bites.jpg` },
    { name: "Thick Cut Fries", price: "R50", description: "Steak house thick cut chips" },
    { name: "Sweet Potato Fries", price: "R65", description: "Sweet potato chips" },
    { name: "Beef Shawarma (portion)", price: "R79", description: "A portion of our beef shawarma", image: `${IMG}/starter-extra-beef-shawarma.jpg` },
    { name: "Chicken Shawarma (portion)", price: "R69", description: "A portion of our chicken shawarma", image: `${IMG}/starter-extra-chicken-shawarma.jpg` },
    { name: "Single Laffa", price: "R19", description: "Iraqi flat bread", image: `${IMG}/deli-laffa.jpg` },
    { name: "Single Pita", price: "R12", description: "Fluffy cloudy dreamy pita", image: `${IMG}/deli-single-pita.jpg` },
  ],
  "Plates": [
    { name: "Falafel Plate", price: "R135", tag: "Vegan & Gluten Free", image: `${IMG}/plate-falafel-plate-_24.jpg` },
    { name: "Chicken Shawarma Plate", price: "R170", tag: "Gluten Free", image: `${IMG}/plate-chick-plate-_24.jpg` },
    { name: "Beef Shawarma Plate", price: "R180", tag: "Gluten Free", image: `${IMG}/plate-beef-plate-_24.jpg` },
    { name: "Chicken Tenders Plate", price: "R165", image: `${IMG}/plate-schnitz-plate-2-_24.jpg` },
    { name: "Chicken Wings Plate", price: "R165", tag: "Gluten Free", description: "Your choice of sauce: BBQ, buffalo or peri-peri", image: `${IMG}/plate-wings-plate.jpg` },
  ],
  "Hummus Bowls": [
    { name: "Chicken Hummus Bowl", price: "R159", image: `${IMG}/plate-hummus-bowl.jpg` },
    { name: "Beef Hummus Bowl", price: "R169", image: `${IMG}/plate-hummus-bowl.jpg` },
    { name: "Vegan Hummus Bowl", price: "R95", tag: "Vegan & Gluten Free", image: `${IMG}/plate-hummus-bowl.jpg` },
    { name: "Extra Pita", price: "R12", image: `${IMG}/deli-single-pita.jpg` },
    { name: "Extra Laffa", price: "R19", image: `${IMG}/deli-laffa.jpg` },
  ],
  "Coffee": [
    { name: "Cappuccino", price: "R33 / R38", description: "Single / Double" },
    { name: "Cafe Latte", price: "R40" },
    { name: "Flat White", price: "R38" },
    { name: "Americano (with milk)", price: "R31 / R33", description: "Single / Double" },
    { name: "Americano", price: "R27 / R29", description: "Single / Double" },
    { name: "Espresso", price: "R24 / R26", description: "Single / Double" },
    { name: "Macchiato", price: "R29" },
    { name: "Cortado", price: "R32" },
    { name: "Turkish", price: "R35" },
    { name: "Red Cappuccino", price: "R25 / R40", description: "Single / Double" },
    { name: "Babychino", price: "R20" },
  ],
  "Frappes": [
    { name: "Hazelnut", price: "R45", description: "Iced or steaming hot" },
    { name: "Toffee Caramel", price: "R45", description: "Iced or steaming hot" },
    { name: "Frappechino", price: "R40", description: "Iced or steaming hot" },
    { name: "Chai Latte", price: "R40", description: "Iced or steaming hot" },
    { name: "Hot Chocolate", price: "R49", description: "Iced or steaming hot" },
  ],
  "Tea": [
    { name: "Earl Gray", price: "R40" },
    { name: "Ceylon", price: "R35" },
    { name: "Rooibos", price: "R35" },
    { name: "Green Tea", price: "R42" },
  ],
  "Cold Drinks": [
    { name: "Coca Cola", price: "R33", image: `${IMG}/drink-coca-cola.png` },
    { name: "Coca Cola Zero", price: "R33", image: `${IMG}/drink-cola-zero.png` },
    { name: "Appletizer", price: "R35", image: `${IMG}/drink-appletaizer.png` },
    { name: "Ice Tea Peach", price: "R33", image: `${IMG}/drink-icetea-peach.png` },
    { name: "Ice Tea Berry", price: "R33", image: `${IMG}/drink-icetea-peach.png` },
    { name: "Pepsi", price: "R25", image: `${IMG}/drink-pepsi.jpg` },
    { name: "Pepsi Max", price: "R25", image: `${IMG}/drink-pepsi-max.jpg` },
    { name: "Mirinda", price: "R25", image: `${IMG}/drink-mirinda.jpg` },
    { name: "7UP Zero Sugar", price: "R25", image: `${IMG}/drink-7upjpg.jpg` },
    { name: "Mineral Water", price: "R25", image: `${IMG}/drink-still-water.png` },
    { name: "Sparkling Water", price: "R25", image: `${IMG}/drink-sparkling-water.jpg` },
  ],
  "Dessert": [
    { name: "Crumbs & Cream Ice Cream Sandwich", price: "R59", description: "Milli Vanili, Hazelnut Heaven, or Biscuit Beast", image: `${IMG}/dessert-milli-vanilli.jpg` },
    { name: "Crumbs & Cream Mini (4 pack)", price: "R99", description: "Assorted mini ice cream sandwiches", image: `${IMG}/dessert-super-mini-4.jpg` },
    { name: "Crumbs & Cream Mini (9 pack)", price: "R199", description: "Assorted mini ice cream sandwiches", image: `${IMG}/dessert-super-mini-9.jpg` },
    { name: "Malabi", price: "R95", description: "Popular coconut based vegan Middle Eastern dessert, served with sweet rose water and pistachio" },
    { name: "Plain Halva", price: "R130", description: "Take home" },
    { name: "Almond / Hazelnut Halva", price: "R135", description: "Take home" },
    { name: "Pistachio Halva", price: "R140", description: "Take home" },
    { name: "Plain Halva Spread", price: "R135", description: "Take home" },
  ],
  "Take Homes": [
    { name: "10x Pita Deal", price: "R99", image: `${IMG}/deli-10x-pita-deal.jpg` },
    { name: "10x Mezze Pita", price: "R80", image: `${IMG}/mezze-falafel-pita.jpg` },
    { name: "Hummus Tub", price: "R8 / R60 / R110", description: "35ml / 250ml / 500ml", image: `${IMG}/deli-hummus-250ml.jpg` },
    { name: "Tahini Tub", price: "R9 / R70 / R130", description: "35ml / 250ml / 500ml" },
    { name: "Raw Tahini", price: "R85 / R150", description: "250ml / 500ml" },
    { name: "Amba Sauce", price: "R10 / R80 / R145", description: "35ml / 250ml / 500ml" },
    { name: "Schug Sauce", price: "R12 / R135 / R260", description: "35ml / 250ml / 500ml" },
    { name: "Red Hot Sauce", price: "R7 / R55", description: "35ml / 250ml" },
    { name: "Pickled Cucumber", price: "R35 / R70", description: "250ml / 500ml" },
    { name: "Pickled Cabbage", price: "R35 / R70", description: "250ml / 500ml" },
    { name: "Pickled Chili", price: "R35 / R70", description: "250ml / 500ml" },
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
          <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: '#F8D09F' }} />
          <h2 className="text-5xl md:text-6xl font-light text-white mb-4 tracking-wide">
            OUR <span className="font-bold" style={{ color: '#F8D09F' }}>MENU</span>
          </h2>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
            Every dish crafted with authentic recipes and the finest ingredients.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="bg-black p-2 h-auto flex-wrap justify-center" style={{ border: '1px solid #F8D09F30' }}>
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-sm transition-colors"
                  style={{
                    backgroundColor: selectedCategory === category ? '#F8D09F' : 'transparent',
                    color: selectedCategory === category ? 'black' : 'rgba(255,255,255,0.7)',
                  }}
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
