'use server';
/**
 * @fileOverview RFPCentral Strategic Orchestrator.
 * 
 * A multi-role AI system that coordinates specialized sub-agents and tools to handle
 * mission-critical project reviews across complex industries like Healthcare and Construction.
 * This is the "brain" that ensures founders outsource with total confidence.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  text: z.string(),
});

const OnboardingAssistantInputSchema = z.object({
  message: z.string().describe('The user\'s question or project description.'),
  history: z.array(MessageSchema).optional().describe('Previous chat history.'),
});

const OnboardingAssistantOutputSchema = z.object({
  reply: z.string().describe('The orchestrator\'s strategic advice or review.'),
  metadata: z.object({
    sector: z.string().optional(),
    certaintyScore: z.number().optional(),
    suggestedTools: z.array(z.string()).optional(),
  }).optional(),
});

export type OnboardingAssistantInput = z.infer<typeof OnboardingAssistantInputSchema>;
export type OnboardingAssistantOutput = z.infer<typeof OnboardingAssistantOutputSchema>;

/**
 * Tool: Sector Context Provider
 * Simulates an MCP call or specialized database lookup for industry-specific nuances.
 */
const getSectorContext = ai.defineTool(
  {
    name: 'getSectorContext',
    description: 'Retrieves deep strategic context for specific industries (Healthcare, Construction, Engineering, etc.).',
    inputSchema: z.object({
      industry: z.string().describe('The industry name to research.'),
    }),
    outputSchema: z.object({
      regulatoryRisks: z.array(z.string()),
      requiredCertifications: z.array(z.string()),
      marketTrend: z.string(),
      outcomeStandard: z.string(),
    }),
  },
  async (input) => {
    // Simulated industry intelligence database
    const db: Record<string, any> = {
      healthcare: {
        regulatoryRisks: ['HIPAA/GDPR compliance', 'NHS Procurement Standards', 'Patient data encryption'],
        requiredCertifications: ['ISO 27001', 'Clinical Safety Officer sign-off'],
        marketTrend: 'Shift towards AI-driven diagnostics and interoperable patient records.',
        outcomeStandard: 'Absolute zero-fault delivery required for patient-facing systems.',
      },
      construction: {
        regulatoryRisks: ['BIM Level 2 standards', 'Health & Safety multi-lot frameworks', 'Material cost volatility'],
        requiredCertifications: ['RIBA', 'Chartered Engineer oversight'],
        marketTrend: 'Increased use of technical specifications and technical digital twins.',
        outcomeStandard: 'Strict adherence to technical specifications and multi-lot delivery frameworks.',
      },
      engineering: {
        regulatoryRisks: ['IP protection', 'Technical debt in legacy systems', 'Cross-border compliance'],
        requiredCertifications: ['Chartered Engineer', 'Specific software proficiency'],
        marketTrend: 'Integration of IoT and real-time sensor feedback loops.',
        outcomeStandard: 'High-precision technical audits and documentation.',
      }
    };

    const sector = input.industry.toLowerCase();
    return db[sector] || {
      regulatoryRisks: ['General project risk', 'Standard compliance'],
      requiredCertifications: ['Standard professional credentials'],
      marketTrend: 'General digitalization and efficiency gains.',
      outcomeStandard: 'Quality delivery based on contract milestones.',
    };
  }
);

/**
 * Tool: Outcome Certainty Calculator
 * Simulates a risk assessment engine.
 */
const estimateOutcomeCertainty = ai.defineTool(
  {
    name: 'estimateOutcomeCertainty',
    description: 'Calculates a certainty score (1-100) based on project clarity and roster availability.',
    inputSchema: z.object({
      clarity: z.number().min(1).max(10).describe('User project clarity score.'),
      budgetMatch: z.boolean().describe('Whether the budget aligns with roster standards.'),
    }),
    outputSchema: z.object({
      score: z.number(),
      reasoning: z.string(),
    }),
  },
  async (input) => {
    const score = (input.clarity * 7) + (input.budgetMatch ? 30 : 5);
    return {
      score: Math.min(score, 100),
      reasoning: input.budgetMatch 
        ? "High budget alignment and clear requirements drive high outcome certainty."
        : "Budget limitations may restrict access to the top 4% roster, increasing delivery risk."
    };
  }
);

/**
 * The Master Strategic Orchestrator
 */
const orchestratorPrompt = ai.definePrompt({
  name: 'strategicOrchestratorPrompt',
  input: { schema: OnboardingAssistantInputSchema },
  tools: [getSectorContext, estimateOutcomeCertainty],
  prompt: `You are the RFPCentral Strategic Orchestrator. You handle high-stakes "Mission-Critical" project reviews for founders and SMEs.

Your Role:
1. Analyze the user's project or question.
2. If they mention a specific industry (Healthcare, Construction, Engineering, Facilities), use the getSectorContext tool to provide elite strategic depth.
3. Use the estimateOutcomeCertainty tool if they are describing a project they want to outsource, to help them understand the "Certainty Score".
4. Provide a "Master Strategic Brief" that helps them outsource their anxiety.

Navigation:
- /auctions for live capacity.
- /rfp/create to post a bespoke need.
- /attribution to see our founding vision.

Tone: Executive, Strategic, Reassuring. You are the partner who handles the complexity so they don't have to.

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
      const response = await ai.generate({
        prompt: orchestratorPrompt(input),
      });

      if (!response.text) throw new Error('Strategic Orchestration failed');

      return {
        reply: response.text,
      };
    }
  );

  return flow(input);
}
