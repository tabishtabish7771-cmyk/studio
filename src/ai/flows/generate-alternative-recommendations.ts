'use server';

/**
 * @fileOverview Generates alternative product recommendations based on user health profile and scanned product details.
 *
 * - generateAlternativeRecommendations - A function that generates alternative product recommendations.
 * - GenerateAlternativeRecommendationsInput - The input type for the generateAlternativeRecommendations function.
 * - GenerateAlternativeRecommendationsOutput - The return type for the generateAlternativeRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAlternativeRecommendationsInputSchema = z.object({
  userHealthProfile: z.string().describe('The user health profile including conditions and allergies.'),
  productDetails: z.string().describe('The scanned product details including ingredients and nutritional information.'),
});
export type GenerateAlternativeRecommendationsInput = z.infer<typeof GenerateAlternativeRecommendationsInputSchema>;

const GenerateAlternativeRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.string().describe('Alternative product recommendation')
  ).describe('A list of alternative product recommendations compatible with the user health profile.'),
});
export type GenerateAlternativeRecommendationsOutput = z.infer<typeof GenerateAlternativeRecommendationsOutputSchema>;

export async function generateAlternativeRecommendations(input: GenerateAlternativeRecommendationsInput): Promise<GenerateAlternativeRecommendationsOutput> {
  return generateAlternativeRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAlternativeRecommendationsPrompt',
  input: {schema: GenerateAlternativeRecommendationsInputSchema},
  output: {schema: GenerateAlternativeRecommendationsOutputSchema},
  prompt: `You are a health and nutrition expert. A user has scanned a product and you need to recommend 2-3 alternative products that are more compatible with their health profile.

User Health Profile: {{{userHealthProfile}}}
Product Details: {{{productDetails}}}

Provide 2-3 alternative product recommendations that are more compatible with the user's health profile. Return the recommendations as a list.
`,
});

const generateAlternativeRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateAlternativeRecommendationsFlow',
    inputSchema: GenerateAlternativeRecommendationsInputSchema,
    outputSchema: GenerateAlternativeRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
