
import { getMockRFPs } from '@/lib/db-mock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Clock, DollarSign, ArrowRight, Sparkles, FileText } from 'lucide-react';
import Link from 'next/link';

export default async function RFPBrowsePage() {
  const rfps = await getMockRFPs();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
        <h1 className="font-headline text-5xl font-extrabold tracking-tight">The <span className="text-accent italic">Bounty</span> Board</h1>
        <p className="text-xl text-muted-foreground">Strategic requests from elite founders looking for guaranteed delivery outcomes.</p>
        <div className="pt-4">
          <Button size="lg" className="rounded-full px-8 shadow-xl shadow-primary/20" asChild>
            <Link href="/rfp/create">Post Your Outcome Needs</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {rfps.map((rfp) => (
          <Link key={rfp.id} href={`/rfp/${rfp.id}`}>
            <Card className="group border-accent/20 hover:border-accent hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
              <div className="bg-accent/5 p-4 border-b flex justify-between items-center">
                <Badge variant="outline" className="border-accent/40 text-accent bg-accent/5">
                  Strategic Bounty
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  Expires in 3d
                </div>
              </div>
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold group-hover:text-accent transition-colors">
                  {rfp.title}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                    {rfp.buyerName.charAt(0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Posted by <span className="text-foreground font-bold">{rfp.buyerName}</span></p>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-1 space-y-6">
                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed italic">
                  "{rfp.aiAssessment}"
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" /> Budget
                    </p>
                    <p className="text-sm font-bold text-accent font-mono">{rfp.budgetRange}</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1 flex items-center gap-1">
                      <Target className="w-3 h-3" /> Timeline
                    </p>
                    <p className="text-sm font-bold text-foreground">{rfp.timeline}</p>
                  </div>
                </div>

                <div className="pt-4 border-t flex items-center justify-between">
                  <span className="text-xs font-bold text-accent flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> AI Consultant Verified
                  </span>
                  <div className="flex items-center gap-1 text-sm font-bold text-accent">
                    Submit Proposal <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {rfps.length === 0 && (
        <div className="text-center py-32 bg-card rounded-[2rem] border-2 border-dashed">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-20" />
          <h3 className="text-xl font-bold">No active bounties found</h3>
          <p className="text-muted-foreground max-w-xs mx-auto mt-2">Check back soon for new strategic service requirements from our network.</p>
        </div>
      )}
    </div>
  );
}
