import { config } from 'dotenv';
config();

import '@/ai/flows/generate-alternative-recommendations.ts';
import '@/ai/flows/analyze-product-ingredients.ts';
import '@/ai/flows/process-voice-commands.ts';
import '@/ai/flows/answer-health-queries.ts';