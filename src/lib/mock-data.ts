import type { MockProduct } from './types';

export const mockProducts: MockProduct[] = [
  {
    id: 'prod1',
    name: 'Sweet Sugary Cereal',
    imageUrl: "https://picsum.photos/seed/hws-cereal/200/200",
    imageHint: "cereal box",
    details: {
      ingredients: 'Whole Grain Oats, Sugar, Corn Starch, Honey, Brown Sugar Syrup, Salt, Tripotassium Phosphate, Canola Oil, Natural Almond Flavor, High Fructose Corn Syrup.',
      calories: 140,
      sugar: 12,
      sodium: 190,
      fat: 1.5,
    },
  },
  {
    id: 'prod2',
    name: 'Fizzy Cola Drink',
    imageUrl: "https://picsum.photos/seed/hws-soda/200/200",
    imageHint: "soda can",
    details: {
      ingredients: 'Carbonated Water, High Fructose Corn Syrup, Caramel Color, Phosphoric Acid, Natural Flavors, Caffeine.',
      calories: 150,
      sugar: 39,
      sodium: 45,
      fat: 0,
    },
  },
  {
    id: 'prod3',
    name: 'Salty Potato Chips',
    imageUrl: "https://picsum.photos/seed/hws-chips/200/200",
    imageHint: "chips bag",
    details: {
      ingredients: 'Potatoes, Vegetable Oil (Sunflower, Corn, and/or Canola Oil), Salt.',
      calories: 160,
      sugar: 0,
      sodium: 170,
      fat: 10,
    },
  },
  {
    id: 'prod4',
    name: 'Healthy Wheat Bread',
    imageUrl: "https://picsum.photos/seed/hws-bread/200/200",
    imageHint: "bread loaf",
    details: {
      ingredients: 'Whole Wheat Flour, Water, Yeast, Wheat Gluten, Contains 2% or less of: Soybean Oil, Salt, Dough Conditioners.',
      calories: 80,
      sugar: 2,
      sodium: 150,
      fat: 1,
    },
  },
   {
    id: 'prod5',
    name: 'Plain Greek Yogurt',
    imageUrl: "https://picsum.photos/seed/hws-yogurt/200/200",
    imageHint: "yogurt cup",
    details: {
      ingredients: 'Cultured Pasteurized Grade A Nonfat Milk.',
      calories: 90,
      sugar: 5,
      sodium: 60,
      fat: 0,
    },
  },
  {
    id: 'prod6',
    name: 'Organic Granola',
    imageUrl: "https://picsum.photos/seed/hws-granola/200/200",
    imageHint: "granola bag",
    details: {
      ingredients: 'Whole Rolled Oats, Cane Sugar, Canola Oil, Rice Flour, Cornstarch, Almonds, Honey, Salt, Natural Flavor.',
      calories: 210,
      sugar: 11,
      sodium: 90,
      fat: 7,
    },
  },
];
