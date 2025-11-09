'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a motivational health quote.
 *
 * - generateMotivationalQuote - The main function that takes user health conditions and returns a quote.
 * - GenerateMotivationalQuoteInput - The input type for the function.
 * - GenerateMotivationalQuoteOutput - The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMotivationalQuoteInputSchema = z.object({
  healthConditions: z
    .string()
    .describe(
      'A comma-separated list of the user`s health conditions (e.g., diabetes, hypertension, allergies).'
    ),
});
export type GenerateMotivationalQuoteInput = z.infer<typeof GenerateMotivationalQuoteInputSchema>;

const GenerateMotivationalQuoteOutputSchema = z.object({
  quote: z.string().describe('The AI-generated motivational quote.'),
});
export type GenerateMotivationalQuoteOutput = z.infer<typeof GenerateMotivationalQuoteOutputSchema>;

export async function generateMotivationalQuote(
  input: GenerateMotivationalQuoteInput
): Promise<GenerateMotivationalQuoteOutput> {
  return generateMotivationalQuoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMotivationalQuotePrompt',
  input: {schema: GenerateMotivationalQuoteInputSchema},
  output: {schema: GenerateMotivationalQuoteOutputSchema},
  prompt: `You are an AI assistant that generates inspiring and motivational quotes about health and wellness.
  A user has the following health conditions: {{healthConditions}}.
  
  Generate one short, positive, and encouraging quote that is relevant to their general journey towards better health. Do not give medical advice.
  The quote should be uplifting and no more than two sentences long.
  `,
});

const generateMotivationalQuoteFlow = ai.defineFlow(
  {
    name: 'generateMotivationalQuoteFlow',
    inputSchema: GenerateMotivationalQuoteInputSchema,
    outputSchema: GenerateMotivationalQuoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
