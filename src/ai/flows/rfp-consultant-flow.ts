'use server';
/**
 * @fileOverview AI Strategic Consultant Flow for Project RFP Analysis.
 * 
 * Analyzes mission-critical project requirements to provide a strategic assessment,
 * complexity score, and ideal provider matching profile.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RFPConsultantInputSchema = z.object({
  title: z.string().describe('The title of the project or strategic RFP.'),
  description: z.string().describe('The detailed requirements of the project.'),
  budgetRange: z.string().describe('The intended budget range.'),
});

const RFPConsultantOutputSchema = z.object({
  strategicAssessment: z.string().describe('A high-level corporate analysis of the project needs.'),
  complexityScore: z.number().min(1).max(10).describe('Complexity score from 1 to 10.'),
  expertMatchingCriteria: z.array(z.string()).describe('Specific certifications or skills required.'),
  aiConsultantNote: z.string().describe('A personal note from the AI consultant to the founder about outsourcing this anxiety.'),
});

export type RFPConsultantInput = z.infer<typeof RFPConsultantInputSchema>;
export type RFPConsultantOutput = z.infer<typeof RFPConsultantOutputSchema>;

const prompt = ai.definePrompt({
  name: 'rfpConsultantPrompt',
  input: { schema: RFPConsultantInputSchema },
  output: { schema: RFPConsultantOutputSchema },
  prompt: `You are the RFPCentral AI Strategic Consultant. Your role is to take a founder's mission-critical project requirements (like a roadshow or marketing rollout) and transform it into a professional Strategic RFP brief.

Analyze the following Project RFP:
Title: {{{title}}}
Description: {{{description}}}
Budget: {{{budgetRange}}}

Provide:
1. A strategic assessment that defines the "Business Impact" and the risks of failure.
2. A complexity score based on the strategic stakes involved.
3. Matching criteria that elite roster experts will see.
4. A direct note to the founder on why this is the perfect project to outsource to our vetted roster to eliminate their anxiety.

Tone: Professional, Insightful, Executive-level. Focus on outcome certainty.`,
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