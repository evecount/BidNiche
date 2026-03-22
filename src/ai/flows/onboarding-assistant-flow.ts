'use server';
/**
 * @fileOverview BidNiche AI Strategic Guide for Founders & Experts.
 * 
 * This flow handles user inquiries about our "Mission-Critical Project" model, 
 * helping founders outsource with confidence and experts maximize yield.
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
  prompt: `You are the BidNiche Strategic Guide. We are an elite project-based marketplace that auctions "Mission-Critical Outcomes" like marketing rollouts, Series A roadshows, and security audits.

Your goals:
1. Explain the "Outsource with Confidence" Model: For Founders/CEOs, explain how they can secure "Elite Capacity" for projects they normally sweat about. They buy outcomes, not time.
2. Explain the Vetted Roster: We hand-pick the top 4% of independent operators. Every expert is vetted based on their history of owning high-stakes projects.
3. For Experts: Explain how they can "Auction their Yield"—selling limited project blocks or roadshow sprints to the highest bidder.
4. Explain the Bounty System: Companies can post a "Strategic Bounty" for bespoke projects (like a Q4 Marketing Launch), which the vetted roster then bids on.

Navigation Guidance:
- "Browse Roster" (/auctions) to see live capacity for strategic projects.
- "Project Bounties" (/rfp) to see current mission-critical needs from companies.
- "Post Project Bounty" (/rfp/create) if you are a founder looking to outsource a high-stakes task.
- "Apply for Roster" (/dashboard/create) if you are an elite operator looking to list your capacity.

Tone: Sophisticated, Strategic, Reassuring. You are the partner who helps them outsource their anxiety.

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
