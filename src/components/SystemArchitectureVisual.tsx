
'use client';

import { Cpu, ShieldAlert, Zap, Brain, Waves, ArrowRight, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SystemArchitectureVisual() {
  const layers = [
    {
      id: 'aao',
      name: 'AAO',
      full: 'Autonomous Agentic Orchestrator',
      role: 'Reasoning & Synthesis',
      icon: Cpu,
      color: 'text-primary',
      bg: 'bg-primary/10',
      description: 'Spawns sub-agent swarms for enterprise proposal synthesis and persona-based ROI shaping.'
    },
    {
      id: 'apo',
      name: 'APO',
      full: 'Autonomous Procurement Orchestrator',
      role: 'Governance & Risk',
      icon: ShieldAlert,
      color: 'text-accent',
      bg: 'bg-accent/10',
      description: 'Requirement harvesting, bid interrogation, and global logistics risk monitoring.'
    },
    {
      id: 'amo',
      name: 'AMO',
      full: 'Autonomous Monetization Orchestrator',
      role: 'Value & Yield',
      icon: Zap,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      description: 'Value-based price adjudication and autonomous escrow release based on outcome certainty.'
    }
  ];

  return (
    <div className="space-y-12 py-10">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-extrabold tracking-tight italic">Tier-0 <span className="text-primary">Logic Manifest</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">The architectural blueprint of the "Deep Water" method: Autonomous orchestration of high-stakes human capacity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connection Lines (Visual only for desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />
        
        {layers.map((layer) => (
          <Card key={layer.id} className="border-2 hover:border-primary/50 transition-all group bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className={`${layer.bg} ${layer.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <layer.icon className="w-6 h-6" />
              </div>
              <CardTitle className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter">{layer.name}</span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{layer.role}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed italic">"{layer.description}"</p>
              <div className="pt-4 border-t border-dashed">
                 <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">Capabilities</p>
                 <ul className="space-y-1.5">
                   <li className="flex items-center gap-2 text-[10px] font-bold">
                     <ArrowRight className="w-3 h-3 text-primary" /> Multi-modal Synthesis
                   </li>
                   <li className="flex items-center gap-2 text-[10px] font-bold">
                     <ArrowRight className="w-3 h-3 text-primary" /> Autonomous Negotiation
                   </li>
                 </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="flex items-center gap-4 bg-muted/50 p-6 rounded-[2rem] border border-dashed flex-1 max-w-md">
          <Brain className="w-10 h-10 text-accent" />
          <div>
            <h4 className="font-bold text-sm">Strategic DNA (Persistent Corpus)</h4>
            <p className="text-[10px] text-muted-foreground leading-relaxed">The shared memory layer that informs all orchestrators of the founder\'s specific risk appetite and technical context.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-primary/5 p-6 rounded-[2rem] border border-primary/20 flex-1 max-w-md">
          <Database className="w-10 h-10 text-primary" />
          <div>
            <h4 className="font-bold text-sm">Deep Water Escrow</h4>
            <p className="text-[10px] text-muted-foreground leading-relaxed">Immutable ledger managed by the AMO to ensure payment release only occurs upon strategic outcome verification.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
