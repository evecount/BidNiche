'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Cpu, Zap, ShieldAlert, Loader2, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { runAAOSynthesis, type AAOOutput } from '@/ai/flows/enterprise-orchestrator-flow';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function AAOSynthesisTrigger({ rfpContent }: { rfpContent: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [result, setResult] = useState<AAOOutput | null>(null);
  const [currentStep, setCurrentStep] = useState('');

  const handleRunAAO = async () => {
    setIsSynthesizing(true);
    setIsOpen(true);
    setCurrentStep('Spawning Swarm Specialist Agents...');
    
    try {
      // Simulate real-time progress steps
      setTimeout(() => setCurrentStep('Analyzing Global Win-Loss Telemetry...'), 1500);
      setTimeout(() => setCurrentStep('Injecting Persona-Based ROI Shaping...'), 3000);
      setTimeout(() => setCurrentStep('Verifying Trade & Compliance Guardrails...'), 4500);

      const output = await runAAOSynthesis({
        rfpContent,
        buyerPersona: 'CEO', // Defaulting to high-level strategic
      });
      
      setResult(output);
      setCurrentStep('Synthesis Complete');
    } catch (error) {
      console.error(error);
      setCurrentStep('Synthesis Failed');
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <>
      <Button 
        onClick={handleRunAAO}
        className="h-14 px-8 bg-foreground text-background hover:bg-foreground/90 font-bold rounded-xl shadow-2xl flex items-center gap-2 group transition-all"
      >
        <div className="bg-primary/20 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
          <Cpu className="w-5 h-5 text-primary" />
        </div>
        Invoke AAO Synthesis
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 overflow-hidden border-2 border-primary/20 bg-background shadow-2xl">
          <DialogHeader className="p-8 border-b bg-primary/5">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <DialogTitle className="text-2xl font-extrabold flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-primary" />
                  Autonomous Agentic Orchestrator
                </DialogTitle>
                <DialogDescription className="text-base font-medium text-muted-foreground uppercase tracking-widest text-[10px]">
                  Tier-0 Enterprise Logic Layer • Global Proposal Engine
                </DialogDescription>
              </div>
              {result && (
                <Badge variant="secondary" className="h-8 px-4 bg-primary text-white font-mono font-bold">
                  WIN PROB: {result.winProbability}%
                </Badge>
              )}
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 p-8">
            {isSynthesizing ? (
              <div className="h-full flex flex-col items-center justify-center space-y-8 py-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                  <Loader2 className="w-20 h-20 text-primary animate-spin relative z-10" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold animate-pulse">{currentStep}</h3>
                  <p className="text-sm text-muted-foreground">Allocating GPU resources & sub-agent worker swarms...</p>
                </div>
                <div className="w-full max-w-md space-y-2">
                   <Progress value={isSynthesizing ? 45 : 100} className="h-2" />
                   <p className="text-[10px] text-center font-bold uppercase tracking-widest text-muted-foreground opacity-50">Latency Target: &lt; 120s</p>
                </div>
              </div>
            ) : result ? (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
                {/* Proposal Section */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Synthesized Solution
                  </h4>
                  <div className="bg-muted/30 p-8 rounded-3xl border border-border/50 shadow-inner">
                    <p className="text-lg leading-relaxed text-foreground whitespace-pre-wrap font-medium">
                      {result.synthesizedProposal}
                    </p>
                  </div>
                </div>

                {/* Swarm Report Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-background/50 border-primary/10">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-bold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" /> Swarm Execution Report
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {result.swarmReport.agentsSpawned.map((agent, i) => (
                          <Badge key={i} variant="outline" className="border-primary/30 text-primary">
                            {agent} Spawned
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          <span>Compliance Score</span>
                          <span>{result.swarmReport.securityComplianceScore}%</span>
                        </div>
                        <Progress value={result.swarmReport.securityComplianceScore} className="h-1.5" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-accent/5 border-accent/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-bold flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-accent" /> Risk & Guardrails
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                         <span className="text-xs font-bold text-muted-foreground">Legal Risk Level</span>
                         <Badge className={result.swarmReport.legalRiskLevel === 'Low' ? 'bg-green-500' : 'bg-yellow-500'}>
                           {result.swarmReport.legalRiskLevel}
                         </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground italic leading-relaxed">
                        "{result.complianceGuardrailNote}"
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-primary p-6 rounded-2xl flex items-center justify-between text-white shadow-xl shadow-primary/20">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Pricing Optimization</p>
                    <p className="font-bold">{result.swarmReport.pricingOptimizationNote}</p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 opacity-50" />
                </div>
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <ShieldAlert className="w-12 h-12 text-destructive mx-auto" />
                <p className="text-muted-foreground">Failed to connect to Tier-0 Enterprise Logic. Please retry.</p>
                <Button onClick={handleRunAAO}>Retry Synthesis</Button>
              </div>
            )}
          </ScrollArea>

          <div className="p-6 border-t bg-muted/20 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="rounded-xl px-8">Close Session</Button>
            {result && (
              <Button className="rounded-xl px-8 bg-primary shadow-lg shadow-primary/20">
                Adopt & Launch Proposal
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
