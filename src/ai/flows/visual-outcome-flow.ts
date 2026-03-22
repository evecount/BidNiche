'use server';
/**
 * @fileOverview Visual Outcome Generator.
 * 
 * Uses Imagen to generate a "Visual Blueprint" of the project's successful outcome,
 * helping founders visualize the "Anxiety-Free" future of their project.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VisualOutcomeInputSchema = z.object({
  projectTitle: z.string().describe('The title of the project.'),
  projectDescription: z.string().describe('The description of the project outcomes.'),
  style: z.enum(['blueprint', 'cinematic', 'minimalist', 'strategic-dashboard']).default('strategic-dashboard'),
});

const VisualOutcomeOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated outcome visualization.'),
  rationale: z.string().describe('Why this image represents the successful project outcome.'),
});

export type VisualOutcomeInput = z.infer<typeof VisualOutcomeInputSchema>;
export type VisualOutcomeOutput = z.infer<typeof VisualOutcomeOutputSchema>;

export async function generateVisualOutcome(input: VisualOutcomeInput): Promise<VisualOutcomeOutput> {
  return visualOutcomeFlow(input);
}

const visualOutcomeFlow = ai.defineFlow(
  {
    name: 'visualOutcomeFlow',
    inputSchema: VisualOutcomeInputSchema,
    outputSchema: VisualOutcomeOutputSchema,
  },
  async (input) => {
    const prompt = `A professional, high-end ${input.style} visualization of a project called "${input.projectTitle}". 
    The visual should represent success, clarity, and the "Human-in-the-Loop" strategic advantage. 
    Context: ${input.projectDescription}. 
    Style guide: Corporate futuristic, clean lines, primary blue and deep slate accents, representing operational certainty.`;

    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate visual outcome visualization');
    }

    return {
      imageUrl: media.url,
      rationale: `This visualization represents the ${input.style} state of ${input.projectTitle}, focusing on the elimination of operational friction through strategic expertise.`,
    };
  }
);
