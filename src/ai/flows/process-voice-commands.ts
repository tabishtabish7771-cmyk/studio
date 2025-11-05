'use server';

/**
 * @fileOverview A voice command processing AI agent.
 *
 * - processVoiceCommand - A function that processes voice commands related to product safety.
 * - ProcessVoiceCommandInput - The input type for the processVoiceCommand function.
 * - ProcessVoiceCommandOutput - The return type for the processVoiceCommand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessVoiceCommandInputSchema = z.object({
  voiceCommand: z.string().describe('The voice command to process.'),
  healthProfile: z.string().describe('The user health profile.'),
  productDetails: z.string().optional().describe('The product details if available.'),
});
export type ProcessVoiceCommandInput = z.infer<typeof ProcessVoiceCommandInputSchema>;

const ProcessVoiceCommandOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the voice command.'),
});
export type ProcessVoiceCommandOutput = z.infer<typeof ProcessVoiceCommandOutputSchema>;

export async function processVoiceCommand(input: ProcessVoiceCommandInput): Promise<ProcessVoiceCommandOutput> {
  return processVoiceCommandFlow(input);
}

const prompt = ai.definePrompt({
  name: 'processVoiceCommandPrompt',
  input: {schema: ProcessVoiceCommandInputSchema},
  output: {schema: ProcessVoiceCommandOutputSchema},
  prompt: `You are a helpful AI assistant that analyzes voice commands related to product safety based on a user's health profile.

  User Health Profile: {{{healthProfile}}}
  Product Details (if available): {{{productDetails}}}
  Voice Command: {{{voiceCommand}}}

  Based on the user's health profile and the product details (if provided), respond to the voice command. If the voice command asks about product safety, analyze the product details against the health profile and provide a concise explanation of whether the product is safe, risky, or unsafe for the user. If no product details are available, ask the user to scan a product first. Return the response in a conversational tone.
  `,
});

const processVoiceCommandFlow = ai.defineFlow(
  {
    name: 'processVoiceCommandFlow',
    inputSchema: ProcessVoiceCommandInputSchema,
    outputSchema: ProcessVoiceCommandOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
