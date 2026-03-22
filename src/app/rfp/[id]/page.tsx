import { getMockRFP, getMockProposals } from '@/lib/db-mock';
import { notFound } from 'next/navigation';
import { 
  Target, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  CheckCircle2,
  Users,
  Cpu,
  Zap,
  Layout,
  Eye
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ProposalForm } from './ProposalForm';
import { AAOSynthesisTrigger } from '@/components/AAOSynthesisTrigger';
import { APOAdjudicatorTrigger } from '@/components/APOAdjudicatorTrigger';
import { VisualOutcomeTrigger } from '@/components/VisualOutcomeTrigger';

export default async function RFPDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rfp = await getMockRFP(id);
  
  if (!rfp) {
    notFound();
  }

  const proposals = await getMockProposals(id);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12 border-b pb-8">
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">
              Strategic RFP
            </Badge>
            <Badge variant="outline" className="text-muted-foreground border-border">
              {rfp.status === 'open' ? 'Accepting Proposals' : 'Closed'}
            </Badge>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {rfp.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                {rfp.buyerName.charAt(0)}
              </div>
              <span className="font-bold text-foreground">{rfp.buyerName}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Posted {new Date(rfp.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
          <Card className="bg-primary/5 border-primary/20 shadow-none px-6 py-4 flex flex-col justify-center min-w-[200px]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Target Budget</p>
            <p className="text-2xl font-mono font-bold text-primary">{rfp.budgetRange}</p>
          </Card>
          <div className="flex flex-col gap-2">
            <AAOSynthesisTrigger rfpContent={rfp.description} />
            <APOAdjudicatorTrigger rfpContent={rfp.description} proposals={proposals} />
          </div>
        </div>
      </div>

      <Tabs defaultValue="scope" className="space-y-12">
        <TabsList className="bg-muted/50 p-1 rounded-xl h-14 w-full md:w-auto grid grid-cols-4 md:inline-flex">
          <TabsTrigger value="scope" className="rounded-lg h-full px-8 text-sm font-bold data-[state=active]:bg-background">
            <FileText className="w-4 h-4 mr-2" /> Project Scope
          </TabsTrigger>
          <TabsTrigger value="visual" className="rounded-lg h-full px-8 text-sm font-bold data-[state=active]:bg-background">
            <Eye className="w-4 h-4 mr-2 text-primary" /> Visual Blueprint
          </TabsTrigger>
          <TabsTrigger value="review" className="rounded-lg h-full px-8 text-sm font-bold data-[state=active]:bg-background">
            <Sparkles className="w-4 h-4 mr-2 text-accent" /> Strategic Review
          </TabsTrigger>
          <TabsTrigger value="proposals" className="rounded-lg h-full px-8 text-sm font-bold data-[state=active]:bg-background">
            <Users className="w-4 h-4 mr-2" /> Proposals ({proposals.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scope" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-10">
              <section className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg"><Target className="w-5 h-5 text-primary" /></div>
                  Mission-Critical Requirements
                </h3>
                <div className="prose max-w-none text-muted-foreground leading-relaxed text-lg">
                  <p className="whitespace-pre-wrap">{rfp.description}</p>
                </div>
              </section>

              <div className="bg-muted/30 rounded-[2rem] p-8 border border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-foreground font-bold">
                    <Clock className="w-5 h-5 text-primary" /> Delivery Timeline
                  </div>
                  <p className="text-muted-foreground">{rfp.timeline}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-foreground font-bold">
                    <ShieldCheck className="w-5 h-5 text-accent" /> Outcome Guarantee
                  </div>
                  <p className="text-muted-foreground">Funds held in escrow until milestones are achieved.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <Card className="border-accent/20 bg-accent/5 overflow-hidden">
                <CardHeader className="bg-accent/10 border-b">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent" /> Vetting Standard
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>Only verified experts from the top 4% of our roster are eligible to bid on this mission-critical outcome.</p>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      ID & Background Verification
                    </li>
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      Strategic Portfolio Audit
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold">Interested?</CardTitle>
                  <CardDescription>If you are a vetted operator, you can submit a strategic proposal for this bounty.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full h-12 rounded-xl font-bold text-lg" asChild>
                    <Link href="#submit-proposal">Start Proposal</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="visual" className="animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="max-w-4xl mx-auto space-y-8 text-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase border border-primary/20">
                  <Layout className="w-4 h-4" /> Visual Outcome Blueprint
                </div>
                <h2 className="text-3xl font-bold">Visualize the Strategic Success</h2>
                <p className="text-muted-foreground text-lg">Use our AI to generate a visual representation of what a successful outcome looks like for this project.</p>
              </div>
              <div className="pt-8">
                <VisualOutcomeTrigger projectTitle={rfp.title} projectDescription={rfp.description} />
              </div>
           </div>
        </TabsContent>

        <TabsContent value="review" className="animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold tracking-wide uppercase border border-accent/20">
                <Sparkles className="w-4 h-4" /> AI Strategic Review
              </div>
              <h2 className="text-3xl font-bold">Outsourcing the Complexity</h2>
              <p className="text-muted-foreground text-lg">Our Strategic Orchestrator has analyzed these requirements to define the business impact and risk profile.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-accent shadow-xl shadow-accent/5">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center gap-2 text-accent">
                    <Target className="w-5 h-5" /> Executive Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose text-sm text-muted-foreground italic leading-relaxed">
                  "{rfp.aiAssessment}"
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center gap-2 text-primary">
                    <Zap className="w-5 h-5" /> Complexity Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <span>Outcome Certainty</span>
                      <span>85%</span>
                    </div>
                    <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on current roster capacity and project clarity, this outcome has a high delivery certainty score.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="proposals" className="animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Live Proposals</h3>
              {proposals.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {proposals.map((p) => (
                    <Card key={p.id} className="group hover:border-primary/50 transition-all">
                      <CardContent className="p-6 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-lg">
                            {p.expertName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{p.expertName}</h4>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">Vetted Operator</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Proposed Fee</p>
                          <p className="text-xl font-mono font-bold text-primary">${p.amount.toLocaleString()}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-dashed py-20 bg-muted/20 text-center space-y-4">
                  <Zap className="w-12 h-12 text-muted-foreground/30 mx-auto" />
                  <p className="text-muted-foreground">No proposals submitted yet. Be the first to secure this project.</p>
                </Card>
              )}
            </div>

            <div id="submit-proposal" className="pt-12 border-t">
              <ProposalForm rfpId={rfp.id} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
