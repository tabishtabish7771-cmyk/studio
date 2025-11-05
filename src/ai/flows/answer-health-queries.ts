'use server';

/**
 * @fileOverview This file defines a Genkit flow for answering health-related questions
 * based on user-provided health conditions.
 *
 * - answerHealthQuery - The main function that takes a health query and user health conditions as input and returns an AI-generated answer.
 * - AnswerHealthQueryInput - The input type for the answerHealthQuery function, including the query and user health conditions.
 * - AnswerHealthQueryOutput - The output type for the answerHealthQuery function, which contains the AI-generated answer.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerHealthQueryInputSchema = z.object({
  query: z.string().describe('The health-related question asked by the user.'),
  healthConditions: z
    .string()
    .describe(
      'A comma-separated list of the user`s health conditions (e.g., diabetes, hypertension, allergies).'
    ),
});
export type AnswerHealthQueryInput = z.infer<typeof AnswerHealthQueryInputSchema>;

const AnswerHealthQueryOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the health-related question.'),
});
export type AnswerHealthQueryOutput = z.infer<typeof AnswerHealthQueryOutputSchema>;

export async function answerHealthQuery(
  input: AnswerHealthQueryInput
): Promise<AnswerHealthQueryOutput> {
  return answerHealthQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerHealthQueryPrompt',
  input: {schema: AnswerHealthQueryInputSchema},
  output: {schema: AnswerHealthQueryOutputSchema},
  prompt: `You are a helpful AI health assistant. A user with the following health conditions:
  {{healthConditions}}
  asks the following question: {{query}}
  Provide a concise and informative answer, taking into account their health conditions.  Do not provide medical advice, but rather provide general information.
  The response should be in markdown format.
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const answerHealthQueryFlow = ai.defineFlow(
  {
    name: 'answerHealthQueryFlow',
    inputSchema: AnswerHealthQueryInputSchema,
    outputSchema: AnswerHealthQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
