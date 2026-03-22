
'use server';
/**
 * @fileOverview BidNiche AI Onboarding Assistant Flow for Service Auctions.
 * 
 * This flow handles user inquiries about how the platform works, 
 * focusing on the disruptive model of auctioning packaged service outcomes.
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
  prompt: `You are the BidNiche Onboarding Assistant, a guide for a premium marketplace where companies bid on elite professional service outcomes, effectively ending the "billable hour" friction.

Your goals:
1. Explain Outcome Auctions: Instead of buying hours, users bid for a specific "package" of work (e.g., a 40-hour architecture audit). Exclusivity and competition set the price.
2. For Experts: Explain how professionals can maximize yield by auctioning off limited bandwidth or retainer slots.
3. For Founders: Explain how they get direct access to top-tier talent without agency overhead, with payment held in escrow for guaranteed delivery.
4. Navigation:
   - "Browse" (/auctions) to see live service blocks from verified experts.
   - "Create" (/dashboard/create) to list your expertise as a packaged outcome.
   - "Dashboard" (/dashboard) to track your active bids or capacity listings.

Keep your tone sophisticated, strategic, and high-ticket. You are an expert in modern professional service procurement.

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
