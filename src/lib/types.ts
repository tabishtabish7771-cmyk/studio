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

// Add this to your global types or a relevant file
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}
