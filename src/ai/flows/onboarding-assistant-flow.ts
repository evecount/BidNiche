
'use server';
/**
 * @fileOverview RFPCentral Strategic Orchestrator.
 * 
 * A multi-role AI system that coordinates specialized sub-agents and tools to handle
 * mission-critical project reviews. Now with Strategic Memory persistence.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { saveCorpusItem, getCorpusItems } from '@/lib/db-mock';

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
 * Tool: Strategic Memory Persister
 */
const persistStrategicInsight = ai.defineTool(
  {
    name: 'persistStrategicInsight',
    description: 'Saves a key fact or preference about the founder to their private AI corpus.',
    inputSchema: z.object({
      category: z.enum(['preference', 'fact', 'risk_appetite', 'technical_debt', 'past_win']),
      content: z.string().describe('The core insight to remember.'),
    }),
    outputSchema: z.object({ status: z.string() }),
  },
  async (input) => {
    await saveCorpusItem({
      userId: 'current-user', // In real app, get from auth context
      category: input.category,
      content: input.content,
      source: 'Conversational Orchestration',
    });
    return { status: 'Insight recorded in Strategic DNA.' };
  }
);

/**
 * Tool: Strategic Memory Recall
 */
const queryFounderCorpus = ai.defineTool(
  {
    name: 'queryFounderCorpus',
    description: 'Retrieves past insights and preferences stored in the founder\'s strategic knowledge base.',
    inputSchema: z.object({
      query: z.string().optional().describe('Optional keyword to filter insights.'),
    }),
    outputSchema: z.object({
      insights: z.array(z.string()),
    }),
  },
  async () => {
    const items = await getCorpusItems('current-user');
    return { insights: items.map(i => `[${i.category.toUpperCase()}]: ${i.content}`) };
  }
);

const getSectorContext = ai.defineTool(
  {
    name: 'getSectorContext',
    description: 'Retrieves deep strategic context for industries.',
    inputSchema: z.object({ industry: z.string() }),
    outputSchema: z.object({ 
      regulatoryRisks: z.array(z.string()),
      requiredCertifications: z.array(z.string()),
      marketTrend: z.string(),
      outcomeStandard: z.string() 
    }),
  },
  async (input) => {
    const db: Record<string, any> = {
      healthcare: {
        regulatoryRisks: ['HIPAA/GDPR compliance', 'NHS Procurement Standards'],
        requiredCertifications: ['ISO 27001'],
        marketTrend: 'Shift towards AI-driven diagnostics.',
        outcomeStandard: 'Absolute zero-fault delivery.',
      }
    };
    return db[input.industry.toLowerCase()] || {
      regulatoryRisks: ['General project risk'],
      requiredCertifications: ['Standard credentials'],
      marketTrend: 'General digitalization.',
      outcomeStandard: 'Quality delivery.',
    };
  }
);

const orchestratorPrompt = ai.definePrompt({
  name: 'strategicOrchestratorPrompt',
  input: { schema: OnboardingAssistantInputSchema },
  output: { schema: OnboardingAssistantOutputSchema },
  tools: [getSectorContext, persistStrategicInsight, queryFounderCorpus],
  prompt: `You are the RFPCentral Strategic Orchestrator. 

Your mission:
1. Provide "human-in-the-loop" expertise for mission-critical projects.
2. Strategic Memory: Use queryFounderCorpus at the start of complex requests to see if you already know the founder's preferences.
3. Fact Finding: If you learn something new and vital about the founder's business goals or risk appetite, use persistStrategicInsight.
4. RFP/Tender Support: Help users draft high-performance RFPs or analyze complex tenders.

Tone: Executive, Strategic, Insightful. 

History:
{{#each history}}
{{role}}: {{{text}}}
{{/each}}

User: {{{message}}}`,
});

const onboardingAssistantFlow = ai.defineFlow(
  {
    name: 'onboardingAssistantFlow',
    inputSchema: OnboardingAssistantInputSchema,
    outputSchema: OnboardingAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await orchestratorPrompt(input);
    if (!output) throw new Error('Strategic Orchestration failed');
    return output;
  }
);

export async function onboardingAssistant(input: OnboardingAssistantInput): Promise<OnboardingAssistantOutput> {
  return onboardingAssistantFlow(input);
}
