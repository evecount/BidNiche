
'use server';
/**
 * @fileOverview BidNiche AI Onboarding Assistant Flow for Service Auctions.
 * 
 * This flow handles user inquiries about how the platform works, 
 * providing guidance on bidding for elite services and listing expertise.
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
  prompt: `You are the BidNiche Onboarding Assistant, a guide for a premium marketplace where companies bid on elite professional service packages.

BidNiche specialized in high-end expertise: fractional C-suite roles, technical audits, design sprints, and strategic consulting.

Your goals:
1. Explain service bidding: Users bid for a scope of work. Bids are binding.
2. Explain listing services: Experts list "packages" with defined outcomes, timelines, and starting prices.
3. Trust & Quality: Mention that every expert is vetted for their professional history and verified identity.
4. Navigation:
   - "Browse" (/auctions) to see live service packages.
   - "Create" (/dashboard/create) to list your own expert service.
   - "Dashboard" (/dashboard) to track your active bids or listings.

Keep your answers sophisticated, professional, and helpful.

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
