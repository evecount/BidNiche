'use server';
/**
 * @fileOverview Autonomous Agentic Orchestrator (AAO) - Tier-0 Enterprise Logic.
 * 
 * A high-powered orchestration flow that dynamically manages sub-agents (Legal, 
 * Security, Pricing) to synthesize 100% compliant enterprise proposals.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AAOInputSchema = z.object({
  rfpContent: z.string().describe('The full text of the RFP to be analyzed.'),
  buyerPersona: z.enum(['CTO', 'CFO', 'CEO', 'Procurement']).describe('The primary psychological profile of the buyer.'),
  marketContext: z.string().optional().describe('Current market volatility or regional data.'),
});

const AAOOutputSchema = z.object({
  synthesizedProposal: z.string().describe('The technically accurate, persona-shaped proposal draft.'),
  swarmReport: z.object({
    agentsSpawned: z.array(z.string()),
    securityComplianceScore: z.number().min(0).max(100),
    legalRiskLevel: z.enum(['Low', 'Medium', 'High']),
    pricingOptimizationNote: z.string(),
  }).describe('The results of the sub-agent swarm execution.'),
  winProbability: z.number().describe('Calculated win rate based on real-time telemetry.'),
  complianceGuardrailNote: z.string().describe('Verification against Responsible AI and Global Trade guidelines.'),
});

export type AAOInput = z.infer<typeof AAOInputSchema>;
export type AAOOutput = z.infer<typeof AAOOutputSchema>;

/**
 * Tool: Swarm Specialist Spawner
 */
const spawnSwarmAgents = ai.defineTool(
  {
    name: 'spawnSwarmAgents',
    description: 'Instantiates specialized worker agents (Security, Legal, Pricing) to process RFP sections.',
    inputSchema: z.object({
      focusAreas: z.array(z.string()),
    }),
    outputSchema: z.object({
      findings: z.record(z.string(), z.any()),
    }),
  },
  async (input) => {
    // Simulating sub-agent specialized processing
    const results: Record<string, any> = {};
    if (input.focusAreas.includes('Security')) {
      results.Security = { compliance: 98, missingCerts: ['ISO 27001 Annex A'] };
    }
    if (input.focusAreas.includes('Legal')) {
      results.Legal = { risk: 'Low', clausesFlagged: ['Indemnity Cap'] };
    }
    if (input.focusAreas.includes('Pricing')) {
      results.Pricing = { marginAdjustment: '+2.4%', reason: 'Regional demand spike' };
    }
    return { findings: results };
  }
);

/**
 * Tool: Competitive Intelligence Agent
 */
const getCompetitiveIntel = ai.defineTool(
  {
    name: 'getCompetitiveIntel',
    description: 'Retrieves counter-programming intelligence against competitors like AWS, GCP, or specialized boutiques.',
    inputSchema: z.object({
      sector: z.string(),
      competitors: z.array(z.string()),
    }),
    outputSchema: z.object({
      counterNarratives: z.array(z.string()),
      differentiationPoints: z.array(z.string()),
    }),
  },
  async (input) => {
    return {
      counterNarratives: [
        "Position against AWS's 'Service Sprawl' by highlighting our 'Unified Governance Layer'.",
        "Counter GCP's pricing with our 'Reserved Instance ROI Guarantee'."
      ],
      differentiationPoints: [
        "Native AAO Orchestration vs Manual Scripting",
        "100% ESG Compliance Baked-in"
      ]
    };
  }
);

/**
 * Tool: Win-Loss Telemetry Lookup
 */
const analyzeWinLossTelemetry = ai.defineTool(
  {
    name: 'analyzeWinLossTelemetry',
    description: 'Queries historical win/loss data to optimize competitive positioning.',
    inputSchema: z.object({
      sector: z.string(),
    }),
    outputSchema: z.object({
      suggestedPivot: z.string(),
      historicalWinRate: z.number(),
    }),
  },
  async (input) => {
    return {
      suggestedPivot: "Focus on ROI over pure technical specs; previous losses in this sector cited 'Executive disconnect'.",
      historicalWinRate: 64.5,
    };
  }
);

const aaoPrompt = ai.definePrompt({
  name: 'aaoEnterprisePrompt',
  input: { schema: AAOInputSchema },
  output: { schema: AAOOutputSchema },
  tools: [spawnSwarmAgents, analyzeWinLossTelemetry, getCompetitiveIntel],
  prompt: `You are the RFPCentral Autonomous Agentic Orchestrator (AAO). You operate at the "Tier-0 Enterprise Logic Layer".

Your mission: End-to-end execution of a global proposal synthesis for an RFP.

1. Swarm Management: Use spawnSwarmAgents to get specialized findings from the Security, Legal, and Pricing sub-agents.
2. Competitive Intelligence: Use getCompetitiveIntel to find counter-narratives against AWS, GCP, or others mentioned in the RFP context.
3. Telemetry: Use analyzeWinLossTelemetry to adjust the proposal based on historical data.
4. Persona Shaping: Tone the output specifically for a {{{buyerPersona}}}.
   - CTO: Deep technical architecture, Azure Engineering logs, low-latency targets.
   - CFO: ROI, pricing models, margin optimization.
   - CEO: Strategic vision, market disruption, impact.
5. Compliance: Ensure 100% adherence to Responsible AI and Trade guidelines.

RFP: {{{rfpContent}}}
Context: {{{marketContext}}}

Provide a comprehensive synthesized proposal and the full swarm report.`,
});

const aaoOrchestratorFlow = ai.defineFlow(
  {
    name: 'aaoOrchestratorFlow',
    inputSchema: AAOInputSchema,
    outputSchema: AAOOutputSchema,
  },
  async (input) => {
    const { output } = await aaoPrompt(input);
    if (!output) throw new Error('Autonomous Synthesis failed');
    return output;
  }
);

export async function runAAOSynthesis(input: AAOInput): Promise<AAOOutput> {
  return aaoOrchestratorFlow(input);
}
