'use client';

import { useState } from 'react';
import { runAMOMonetization, type AMOOutput } from '@/ai/flows/monetization-orchestrator-flow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Zap, TrendingUp, Gavel, Loader2, Sparkles, ShieldCheck, ArrowLeft, BarChart3, Scale } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

export default function YieldOptimizationPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AMOOutput | null>(null);
  const { toast } = useToast();

  const handleOptimizeYield = async () => {
    setIsAnalyzing(true);
    try {
      const output = await runAMOMonetization({
        projectContext: "40-Hour AI Strategy Sprint",
        complexityScore: 8.5,
        currentMarketDemand: 0.92,
      });
      setResult(output);
      toast({ title: "Yield Strategy Generated", description: "The AMO has calculated your tender worth and win fees." });
    } catch (err: any) {
      toast({ title: "Analysis Failed", description: err.message, variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Operational Hub
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-bold tracking-widest uppercase border border-green-500/20">
            <DollarSign className="w-3 h-3" /> Tier-0 Monetization Engine
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
            Yield <span className="text-primary italic">Optimization</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The Autonomous Monetization Orchestrator (AMO) adjudicates the "Worth" of your capacity. RFPCentral is free to post and tender—we only monetize on the strategic win.
          </p>
        </div>
        {!result && (
          <Button 
            onClick={handleOptimizeYield} 
            disabled={isAnalyzing}
            size="lg"
            className="h-16 px-10 bg-primary shadow-2xl shadow-primary/20 font-bold rounded-2xl flex items-center gap-3 transition-all"
          >
            {isAnalyzing ? <Loader2 className="w-6 h-6 animate-spin" /> : <Zap className="w-6 h-6" />}
            Calculate Tender Worth
          </Button>
        )}
      </div>

      {!result ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-60 grayscale">
           <Card className="border-dashed h-48 flex items-center justify-center text-center p-6">
             <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Tender Fee Pending</p>
           </Card>
           <Card className="border-dashed h-48 flex items-center justify-center text-center p-6">
             <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Market Window Locked</p>
           </Card>
           <Card className="border-dashed h-48 flex items-center justify-center text-center p-6">
             <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Yield Adjudication Logic Offline</p>
           </Card>
        </div>
      ) : (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-primary text-white border-none shadow-xl shadow-primary/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-20"><TrendingUp className="w-12 h-12" /></div>
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-white/70">Suggested Price Floor</CardDescription>
                <CardTitle className="text-4xl font-mono font-bold">${result.suggestedFloorPrice.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-foreground text-background border-none shadow-xl overflow-hidden relative">
               <div className="absolute top-0 right-0 p-4 opacity-20"><Scale className="w-12 h-12" /></div>
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tender Win Fee</CardDescription>
                <CardTitle className="text-4xl font-mono font-bold">${result.tenderWinFee.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="md:col-span-2 border-primary/20 bg-primary/5">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                   <BarChart3 className="w-3 h-3" /> Strategic Yield Window
                </CardDescription>
                <CardTitle className="text-xl font-bold">{result.yieldStrategy}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Our data indicates maximum win probability and fee optimization during this window.</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> Value Extraction Ledger
              </h3>
              <Card className="border-border/60 overflow-hidden">
                <div className="bg-muted/30 p-8 space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">AMO Value Delta Analysis</p>
                    <p className="text-lg font-medium text-foreground leading-relaxed italic">"{result.valueDeltaNote}"</p>
                  </div>
                  <div className="p-6 bg-background rounded-2xl border border-dashed space-y-4">
                    <p className="text-xs font-bold uppercase text-primary tracking-widest">Autonomous Milestone Adjudication</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {result.escrowAdjudicationLogic}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-primary/10 rounded-3xl p-8 border border-primary/20 space-y-4">
                <h4 className="text-lg font-bold text-primary">Free to Tender. Pay for the Win.</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We believe expertise should be discoverable without barrier. You only pay the adjudicated "Tender Win Fee" when your strategic proposal is awarded. The AMO ensures this fee is always proportionate to the project's true market value.
                </p>
                <div className="pt-4 space-y-2">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                     <span>Platform Win Confidence</span>
                     <span>98%</span>
                   </div>
                   <Progress value={98} className="h-1" />
                </div>
              </div>

              <Button className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20" asChild>
                 <Link href="/dashboard/create">Launch Outcome Auction</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
