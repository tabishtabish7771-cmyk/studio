'use server';

/**
 * @fileOverview Analyzes product ingredients against a user's health profile to determine safety.
 *
 * - analyzeProduct - Analyzes product ingredients against a user's health profile.
 * - AnalyzeProductInput - The input type for the analyzeProduct function.
 * - AnalyzeProductOutput - The return type for the analyzeProduct function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeProductInputSchema = z.object({
  healthProfile: z.object({
    name: z.string().describe('User name'),
    age: z.number().describe('User age'),
    gender: z.string().describe('User gender'),
    medicalConditions: z.array(z.string()).describe('User medical conditions'),
  }).describe('User health profile.'),
  productDetails: z.object({
    ingredients: z.string().describe('List of product ingredients.'),
    calories: z.number().describe('Calories per serving.'),
    sugar: z.number().describe('Sugar content per serving (grams).'),
    sodium: z.number().describe('Sodium content per serving (milligrams).'),
    fat: z.number().describe('Fat content per serving (grams).'),
  }).describe('Product details including ingredients and nutritional information.'),
});

export type AnalyzeProductInput = z.infer<typeof AnalyzeProductInputSchema>;

const AnalyzeProductOutputSchema = z.object({
  safe: z.boolean().describe('Whether the product is safe for the user.'),
  status: z.enum(['safe', 'risky', 'unsafe']).describe('Safety status color-coded.'),
  explanation: z.string().describe('AI-generated explanation of the safety assessment.'),
  recommendations: z.array(z.string()).describe('List of recommended alternative products.'),
});

export type AnalyzeProductOutput = z.infer<typeof AnalyzeProductOutputSchema>;

export async function analyzeProduct(input: AnalyzeProductInput): Promise<AnalyzeProductOutput> {
  return analyzeProductFlow(input);
}

const analyzeProductPrompt = ai.definePrompt({
  name: 'analyzeProductPrompt',
  input: {schema: AnalyzeProductInputSchema},
  output: {schema: AnalyzeProductOutputSchema},
  prompt: `You are a health expert analyzing a product's ingredients and nutritional information against a user's health profile to determine if it's safe for them.

  Health Profile:
  Name: {{{healthProfile.name}}}
  Age: {{{healthProfile.age}}}
  Gender: {{{healthProfile.gender}}}
  Medical Conditions: {{#each healthProfile.medicalConditions}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Product Details:
  Ingredients: {{{productDetails.ingredients}}}
  Calories: {{{productDetails.calories}}} kcal
  Sugar: {{{productDetails.sugar}}}g
  Sodium: {{{productDetails.sodium}}}mg
  Fat: {{{productDetails.fat}}}g

  Analyze the product details considering the user's health profile. Determine if the product is safe, risky, or unsafe. Provide a short explanation. Suggest 2-3 alternative products with better compatibility.

  Output the result in JSON format:
  {
    "safe": true/false,
    "status": "safe"/"risky"/"unsafe",
    "explanation": "Explanation of the safety assessment.",
    "recommendations": ["Alternative product 1", "Alternative product 2", "Alternative product 3"]
  }`,
});

const analyzeProductFlow = ai.defineFlow(
  {
    name: 'analyzeProductFlow',
    inputSchema: AnalyzeProductInputSchema,
    outputSchema: AnalyzeProductOutputSchema,
  },
  async input => {
    const {output} = await analyzeProductPrompt(input);
    return output!;
  }
);
