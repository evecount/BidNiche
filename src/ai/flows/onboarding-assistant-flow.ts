'use server';
/**
 * @fileOverview RFPCentral Strategic Orchestrator.
 * 
 * A multi-role AI system that coordinates specialized sub-agents and tools to handle
 * mission-critical project reviews. This is the "brain" that ensures founders 
 * outsource with total confidence.
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
  suggestedAction: z.object({
    label: z.string().describe('Label for a suggested action button.'),
    href: z.string().describe('URL for the suggested action.'),
  }).optional(),
  metadata: z.object({
    sector: z.string().optional(),
    certaintyScore: z.number().optional(),
  }).optional(),
});

export type OnboardingAssistantInput = z.infer<typeof OnboardingAssistantInputSchema>;
export type OnboardingAssistantOutput = z.infer<typeof OnboardingAssistantOutputSchema>;

/**
 * Tool: Sector Context Provider
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
 */
const estimateOutcomeCertainty = ai.defineTool(
  {
    name: 'estimateOutcomeCertainty',
    description: 'Calculates a certainty score (1-100) based on project clarity and budget alignment.',
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
        : "Budget limitations may restrict access to top-tier roster capacity, increasing delivery risk."
    };
  }
);

/**
 * The Master Strategic Orchestrator
 */
const orchestratorPrompt = ai.definePrompt({
  name: 'strategicOrchestratorPrompt',
  input: { schema: OnboardingAssistantInputSchema },
  output: { schema: OnboardingAssistantOutputSchema },
  tools: [getSectorContext, estimateOutcomeCertainty],
  prompt: `You are the RFPCentral Strategic Orchestrator. Your mission is to provide founders with the "human-in-the-loop" expertise needed to navigate mission-critical projects.

Your Primary Objectives:
1. Help users WRITE a high-performance RFP (Request for Proposal). If they describe a project, help them refine the "Outcome" and suggest they go to /rfp/create.
2. Help users ANALYZE a complex Tender or incoming Proposal. If they paste a requirements list, identify strategic risks and industry standards.
3. Industry Expertise: If they mention Healthcare, Construction, or Engineering, use getSectorContext to provide elite depth.
4. Risk Assessment: Use estimateOutcomeCertainty for any project they are thinking of outsourcing.

Suggested Actions:
- If the user is drafting a project, suggest "Post as RFP" with href "/rfp/create".
- If the user is looking for experts, suggest "Browse Roster" with href "/auctions".

Tone: Executive, Strategic, Insightful. You are a senior partner, not just a chatbot.

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
      const { output } = await ai.generate({
        prompt: orchestratorPrompt(input),
      });

      if (!output) throw new Error('Strategic Orchestration failed');

      return output;
    }
  );

  return flow(input);
}
