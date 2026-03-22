'use server';
/**
 * @fileOverview BidNiche AI Onboarding Assistant Flow.
 * 
 * This flow handles user inquiries about how the platform works, 
 * providing guidance on bidding, selling, and security.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  text: z.string(),
});

const OnboardingAssistantInputSchema = z.object({
  message: z.string().describe('The user\'s question or message.'),
  history: z.array(MessageSchema).optional().describe('Previous chat history.'),
});

const OnboardingAssistantOutputSchema = z.object({
  reply: z.string().describe('The assistant\'s helpful response.'),
});

export type OnboardingAssistantInput = z.infer<typeof OnboardingAssistantInputSchema>;
export type OnboardingAssistantOutput = z.infer<typeof OnboardingAssistantOutputSchema>;

const prompt = ai.definePrompt({
  name: 'onboardingAssistantPrompt',
  input: { schema: OnboardingAssistantInputSchema },
  output: { schema: OnboardingAssistantOutputSchema },
  prompt: `You are the BidNiche Onboarding Assistant, a helpful and professional guide for a premium real-time auction marketplace.

BidNiche specialized in high-end collectibles like vintage watches, classic cars, and rare art.

Your goals:
1. Explain how bidding works: It's real-time. Bids are binding.
2. Explain how selling works: Users can list items with starting and reserve prices.
3. Trust & Security: Mention that every seller is vetted and purchases over $10k require verification.
4. Navigation:
   - "Browse" (/auctions) to see live items.
   - "Create" (/dashboard/create) to list an item.
   - "Dashboard" (/dashboard) to manage your profile.

Keep your answers concise, friendly, and encouraging.

History:
{{#each history}}
{{role}}: {{{text}}}
{{/each}}

User: {{{message}}}`,
});

export async function onboardingAssistant(input: OnboardingAssistantInput): Promise<OnboardingAssistantOutput> {
  const flow = ai.defineFlow(
    {
      name: 'onboardingAssistantFlow',
      inputSchema: OnboardingAssistantInputSchema,
      outputSchema: OnboardingAssistantOutputSchema,
    },
    async (input) => {
      const { output } = await prompt(input);
      if (!output) throw new Error('AI failed to generate a response');
      return output;
    }
  );

  return flow(input);
}
