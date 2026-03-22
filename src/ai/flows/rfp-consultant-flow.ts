
'use server';
/**
 * @fileOverview AI Strategic Consultant Flow for RFP Analysis.
 * 
 * Analyzes incoming Requests for Proposals (RFPs) to provide a strategic assessment,
 * complexity score, and ideal provider matching profile.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RFPConsultantInputSchema = z.object({
  title: z.string().describe('The title of the project or RFP.'),
  description: z.string().describe('The detailed requirements of the project.'),
  budgetRange: z.string().describe('The intended budget range.'),
});

const RFPConsultantOutputSchema = z.object({
  strategicAssessment: z.string().describe('A high-level corporate analysis of the project needs.'),
  complexityScore: z.number().min(1).max(10).describe('Complexity score from 1 to 10.'),
  expertMatchingCriteria: z.array(z.string()).describe('Specific certifications or skills required.'),
  aiConsultantNote: z.string().describe('A personal note from the AI consultant to the founder.'),
});

export type RFPConsultantInput = z.infer<typeof RFPConsultantInputSchema>;
export type RFPConsultantOutput = z.infer<typeof RFPConsultantOutputSchema>;

const prompt = ai.definePrompt({
  name: 'rfpConsultantPrompt',
  input: { schema: RFPConsultantInputSchema },
  output: { schema: RFPConsultantOutputSchema },
  prompt: `You are the BidNiche AI Strategic Consultant. Your role is to take a founder's raw project requirements (RFP) and transform it into a professional strategic brief.

Founders are often vague. You need to be precise, sophisticated, and "corporate-elite."

Analyze the following:
Title: {{{title}}}
Description: {{{description}}}
Budget: {{{budgetRange}}}

Provide:
1. A strategic assessment that defines the "Why" and the "Business Value."
2. A complexity score based on technical or strategic difficulty.
3. Matching criteria that experts will see.
4. A direct note to the founder on how to optimize this outcome.

Tone: Professional, Insightful, Strategic.`,
});

export async function rfpConsultant(input: RFPConsultantInput): Promise<RFPConsultantOutput> {
  const flow = ai.defineFlow(
    {
      name: 'rfpConsultantFlow',
      inputSchema: RFPConsultantInputSchema,
      outputSchema: RFPConsultantOutputSchema,
    },
    async (input) => {
      const { output } = await prompt(input);
      if (!output) throw new Error('AI Strategic Analysis failed');
      return output;
    }
  );

  return flow(input);
}
