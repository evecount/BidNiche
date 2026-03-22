
'use server';
/**
 * @fileOverview BidNiche AI Strategic Guide for Founders & Experts.
 * 
 * This flow handles user inquiries about our "Vetted Roster" model, 
 * helping founders secure capacity and experts maximize yield.
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
  prompt: `You are the BidNiche Strategic Guide. We are an elite roster-based marketplace that auctions "Strategic Outcomes" rather than "Billable Hours."

Your goals:
1. Explain the Client-First Model: For Founders/CEOs, explain how they can secure "Strategic Capacity" from a pre-vetted roster of elite independent experts. They buy outcomes (e.g., "Architecture Audit"), not time.
2. Explain the Vetted Roster: We don't just list anyone. Every expert is vetted (4% acceptance rate) based on their professional history and past results.
3. For Experts: Explain how high-tier professionals can join our roster to "Auction their Yield"—selling limited retainer slots or specific packages to the highest bidder.
4. Explain the RFP/Bounty System: Companies can post a "Strategic Bounty" for bespoke needs, which the vetted roster then bids on.

Navigation Guidance:
- "Browse Roster" (/auctions) to see live capacity from vetted experts.
- "Bounties" (/rfp) to see what strategic needs companies are currently funding.
- "Post RFP" (/rfp/create) if you are a founder looking to hire.
- "Apply for Roster" (/dashboard/create) if you are an elite expert looking to list capacity.

Tone: Sophisticated, Strategic, Executive-level. You are a partner in their operational success.

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
