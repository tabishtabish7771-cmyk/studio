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
  productImage: z.string().describe("A photo of a product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});

export type AnalyzeProductInput = z.infer<typeof AnalyzeProductInputSchema>;

const AnalyzeProductOutputSchema = z.object({
  productName: z.string().describe('The name of the identified product.'),
  details: z.object({
      calories: z.number().describe('Calories per serving.'),
      sugar: z.number().describe('Sugar content per serving (grams).'),
      sodium: z.number().describe('Sodium content per serving (milligrams).'),
      fat: z.number().describe('Fat content per serving (grams).'),
      protein: z.number().describe('Protein content per serving (grams).'),
  }),
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
  prompt: `You are a health expert. A user has provided an image of a product.
  Your task is to:
  1. Identify the product in the image.
  2. Estimate its nutritional information (calories, sugar, sodium, fat, protein).
  3. Analyze the product against the user's health profile to determine if it is 'safe', 'risky', or 'unsafe'.
  4. Provide a brief explanation for your analysis. If a product is 'risky', explain that it can be consumed in moderation, but not continuously, and suggest how much could be consumed safely.
  5. Suggest 2-3 healthier alternative products.

  User Health Profile:
  Name: {{{healthProfile.name}}}
  Age: {{{healthProfile.age}}}
  Gender: {{{healthProfile.gender}}}
  Medical Conditions: {{#each healthProfile.medicalConditions}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Product Image:
  {{media url=productImage}}

  Analyze the product and respond in the specified JSON format.`,
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
