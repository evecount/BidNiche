
import { getCorpusItems } from '@/lib/db-mock';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Brain, Target, ShieldCheck, History, ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function StrategicDNAPage() {
  const dnaItems = await getCorpusItems('current-user');

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase border border-accent/20">
            <Sparkles className="w-3 h-3" /> Private Strategic Memory
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Strategic <span className="text-accent italic">DNA</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your AI assistant's private corpus. This represents the cumulative "human-in-the-loop" insights that inform your RFPs, auctions, and adjudications.
          </p>
        </div>
        <div className="bg-muted/50 p-6 rounded-2xl border border-dashed flex items-center gap-4">
          <Brain className="w-10 h-10 text-accent" />
          <div>
            <p className="text-2xl font-mono font-bold">{dnaItems.length}</p>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Active Fragments</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <History className="w-4 h-4" /> Recent Insight Extractions
          </h3>
          <div className="space-y-4">
            {dnaItems.length > 0 ? (
              dnaItems.map((item) => (
                <Card key={item.id} className="group hover:border-accent/50 transition-all overflow-hidden border-border/50 shadow-none">
                  <div className="flex">
                    <div className={cn(
                      "w-1.5 shrink-0",
                      item.category === 'preference' ? "bg-primary" : 
                      item.category === 'risk_appetite' ? "bg-accent" : 
                      "bg-muted-foreground/30"
                    )} />
                    <CardContent className="p-6 flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-tighter">
                            {item.category.replace('_', ' ')}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground font-mono">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-foreground italic">
                          "{item.content}"
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[8px] font-bold uppercase text-muted-foreground tracking-widest">Source</p>
                        <p className="text-[10px] font-bold text-accent">{item.source}</p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="border-dashed py-20 bg-muted/20 text-center">
                <p className="text-muted-foreground">No strategic DNA fragments found yet. Chat with the orchestrator to begin extraction.</p>
              </Card>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" /> Why this matters
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground leading-relaxed space-y-4">
              <p>
                In the "New Economy," context is everything. This corpus allows your RFPCentral AI to understand:
              </p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                  Your specific risk thresholds for agentic systems.
                </li>
                <li className="flex gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                  Your preferred narrative style for board-level reports.
                </li>
                <li className="flex gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                  Technical debt and legacy system context.
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-4 text-[10px] font-bold uppercase tracking-widest border-accent/40 text-accent" asChild>
                <Link href="/dashboard">Explore Hub</Link>
              </Button>
            </CardContent>
          </Card>

          <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20 space-y-4">
             <div className="flex items-center gap-3">
               <ShieldCheck className="w-5 h-5 text-primary" />
               <h4 className="text-sm font-bold">Encrypted & Private</h4>
             </div>
             <p className="text-xs text-muted-foreground leading-relaxed">
               This dataset is exclusively yours. It is never used for training foundation models and is only accessed by your personal orchestrator during active sessions.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
