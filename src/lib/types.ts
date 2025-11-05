export type UserProfile = {
  name: string;
  age: number | '';
  gender: 'male' | 'female' | 'other' | '';
  medicalConditions: string;
};

export type ProductDetails = {
  ingredients: string;
  calories: number;
  sugar: number;
  sodium: number;
  fat: number;
};

export type MockProduct = {
  id: string;
  name: string;
  imageUrl: string;
  imageHint: string;
  details: ProductDetails;
};
