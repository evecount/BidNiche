'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Scale, Gavel, Loader2, Sparkles, X, AlertTriangle, Target } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { runAPOAdjudication, type APOOutput } from '@/ai/flows/procurement-orchestrator-flow';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function APOAdjudicatorTrigger({ rfpContent, proposals }: { rfpContent: string, proposals?: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [result, setResult] = useState<APOOutput | null>(null);
  const [currentStep, setCurrentStep] = useState('');

  const handleRunAPO = async () => {
    setIsSynthesizing(true);
    setIsOpen(true);
    setCurrentStep('Harvesting Technical Requirements...');
    
    try {
      setTimeout(() => setCurrentStep('Interrogating Bid Patterns...'), 1500);
      setTimeout(() => setCurrentStep('Executing Should-Cost Simulations...'), 3000);
      setTimeout(() => setCurrentStep('Architecting BAFO Negotiation Logic...'), 4500);

      const output = await runAPOAdjudication({
        rfpContent,
        proposals: proposals?.map(p => ({
          expertName: p.expertName,
          amount: p.amount,
          coverLetter: p.coverLetter
        })),
        category: 'Strategic Services'
      });
      
      setResult(output);
      setCurrentStep('Adjudication Complete');
    } catch (error) {
      console.error(error);
      setCurrentStep('Adjudication Failed');
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <>
      <Button 
        onClick={handleRunAPO}
        variant="outline"
        className="h-14 px-8 border-accent text-accent hover:bg-accent/5 font-bold rounded-xl shadow-lg flex items-center gap-2 group transition-all"
      >
        <div className="bg-accent/10 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
          <ShieldCheck className="w-5 h-5 text-accent" />
        </div>
        Invoke APO Adjudication
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0 overflow-hidden border-2 border-accent/20 bg-background shadow-2xl">
          <DialogHeader className="p-8 border-b bg-accent/5">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <DialogTitle className="text-2xl font-extrabold flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-accent" />
                  Autonomous Procurement Orchestrator
                </DialogTitle>
                <DialogDescription className="text-base font-medium text-muted-foreground uppercase tracking-widest text-[10px]">
                  Tier-0 Governance & Risk Logic Layer • Global Tender Engine
                </DialogDescription>
              </div>
              {result && (
                <Badge variant="secondary" className="h-8 px-4 bg-accent text-white font-mono font-bold">
                  ESG: {result.riskAudit.esgCompliance}
                </Badge>
              )}
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 p-8">
            {isSynthesizing ? (
              <div className="h-full flex flex-col items-center justify-center space-y-8 py-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
                  <Loader2 className="w-20 h-20 text-accent animate-spin relative z-10" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold animate-pulse">{currentStep}</h3>
                  <p className="text-sm text-muted-foreground">Running Game-Theory Optimization & Market Mapping...</p>
                </div>
                <div className="w-full max-w-md space-y-2">
                   <Progress value={isSynthesizing ? 60 : 100} className="h-2 bg-accent/10" />
                   <p className="text-[10px] text-center font-bold uppercase tracking-widest text-muted-foreground opacity-50">Decision Ledger: Immutable Audit Trail ON</p>
                </div>
              </div>
            ) : result ? (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
                {/* Requirements & TVO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-accent/20">
                    <CardHeader className="pb-3 border-b">
                      <CardTitle className="text-sm font-bold flex items-center gap-2">
                        <Target className="w-4 h-4 text-accent" /> Harvested Specs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3">
                      {result.harvestedRequirements.map((req, i) => (
                        <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          {req}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader className="pb-3 border-b">
                      <CardTitle className="text-sm font-bold flex items-center gap-2">
                        <Scale className="w-4 h-4 text-primary" /> TVO Adjudication
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm italic leading-relaxed text-muted-foreground">
                        "{result.adjudicationReport?.tvoAnalysis}"
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Negotiation Section */}
                <div className="bg-foreground text-background p-8 rounded-[2rem] space-y-6 shadow-2xl">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Negotiation Architecture</h4>
                    <Badge variant="outline" className="text-accent border-accent font-mono">TARGET BAFO: ${result.negotiationStrategy.targetBAFO.toLocaleString()}</Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-background/10 rounded-xl border border-white/10">
                      <p className="text-sm font-bold text-accent mb-1">Counter-Offer Logic</p>
                      <p className="text-xs opacity-80 leading-relaxed">{result.negotiationStrategy.counterOfferLogic}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {result.negotiationStrategy.slaHardeningClauses.map((clause, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                          <Gavel className="w-3 h-3 text-accent" /> {clause}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Risk & Compliance */}
                {result.adjudicationReport?.anomalousPatternFlags.length! > 0 && (
                  <div className="bg-destructive/10 p-6 rounded-2xl border border-destructive/20 flex gap-4 items-center">
                    <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-destructive">Anomalous Patterns Detected</p>
                      <p className="text-xs text-muted-foreground">{result.adjudicationReport?.anomalousPatternFlags.join(', ')}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
                <p className="text-muted-foreground">APO Governance Engine Offline. Please retry.</p>
                <Button onClick={handleRunAPO}>Retry Adjudication</Button>
              </div>
            )}
          </ScrollArea>

          <div className="p-6 border-t bg-muted/20 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="rounded-xl px-8">Close Ledger</Button>
            {result && (
              <Button className="rounded-xl px-8 bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20">
                Issue Counter-Proposals
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
