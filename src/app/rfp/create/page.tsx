'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Sparkles, Target, DollarSign, Calendar, ArrowRight, ShieldCheck, Zap, Lightbulb, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { rfpConsultant, type RFPConsultantOutput } from '@/ai/flows/rfp-consultant-flow';
import { createMockRFP } from '@/lib/db-mock';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const SUGGESTED_BOUNTIES = [
  {
    title: "Agentic Support Orchestration",
    description: "Design a 3-agent orchestration to handle tier-1 support, internal technical documentation search, and auto-routing of complex tickets.",
    budget: "$8k - $15k",
    icon: Bot
  },
  {
    title: "Short-Form Video Engine",
    description: "Chop 10 long-form podcasts into 40 high-engagement YouTube Shorts/TikToks. Includes AI captions and B-roll.",
    budget: "$2k - $4k",
    icon: Zap
  },
  {
    title: "SOC2 Compliance Roadmap",
    description: "Full gap analysis and evidence collection roadmap for SOC2 Type 1 readiness. Includes policy drafting.",
    budget: "$10k - $20k",
    icon: ShieldCheck
  },
  {
    title: "Zapier/Make Automation Sprint",
    description: "Connect HubSpot, Slack, and Stripe into a seamless automated lead-to-cash workflow to reduce manual data entry.",
    budget: "$2k - $6k",
    icon: Target
  }
];

export default function SubmitRFPPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysis, setAnalysis] = useState<RFPConsultantOutput | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budgetRange: '',
    timeline: ''
  });

  const applyTemplate = (template: typeof SUGGESTED_BOUNTIES[0]) => {
    setFormData({
      ...formData,
      title: template.title,
      description: template.description,
      budgetRange: template.budget,
    });
    toast({ title: "Template Applied", description: "You can now refine the details before submitting." });
  };

  const handleRunAnalysis = async () => {
    if (!formData.title || !formData.description) {
      toast({ title: "Missing Information", description: "Please provide a title and description for analysis.", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await rfpConsultant({
        title: formData.title,
        description: formData.description,
        budgetRange: formData.budgetRange || 'Not Specified',
      });
      setAnalysis(result);
      toast({ title: "Analysis Complete", description: "The AI Strategic Consultant has reviewed your RFP." });
    } catch (err: any) {
      toast({ title: "Analysis Failed", description: err.message, variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const rfpId = await createMockRFP({
        buyerId: 'current-user',
        buyerName: 'Operational Founder',
        title: formData.title,
        description: formData.description,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        expiresAt: Date.now() + (7 * 86400000), // 7 days
        aiAssessment: analysis?.strategicAssessment,
        status: 'open'
      });

      toast({ title: "Bounty Live", description: "Your strategic bounty has been broadcast to verified experts." });
      router.push(`/rfp/${rfpId}`);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight">Post a Strategic Bounty</h1>
            <p className="text-muted-foreground text-lg">Define your fractional outcome and have verified experts compete for the execution.</p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Lightbulb className="w-3.5 h-3.5 text-primary" /> Popular Bounties
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SUGGESTED_BOUNTIES.map((t, i) => (
                <button 
                  key={i} 
                  onClick={() => applyTemplate(t)}
                  className="text-left p-4 rounded-xl border bg-card hover:border-primary hover:bg-primary/5 transition-all group relative overflow-hidden"
                >
                  <t.icon className="absolute -right-2 -top-2 w-12 h-12 text-primary/5 group-hover:text-primary/10 transition-colors" />
                  <p className="text-sm font-bold group-hover:text-primary transition-colors">{t.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.description}</p>
                </button>
              ))}
            </div>
          </div>

          <Card className="border-primary/20 shadow-2xl overflow-hidden">
            <CardHeader className="bg-primary/5 border-b px-8 py-6">
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <FileText className="w-5 h-5 text-primary" />
                Bounty Definition
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Bounty Title</label>
                <Input 
                  placeholder="e.g. Multi-Agent System for Automated Sales Prospecting" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="h-12 text-lg focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Requirements & Deliverables</label>
                <Textarea 
                  placeholder="Describe the outcome you need. For AI work, specify if you need agent orchestration, fine-tuning, or a custom RAG system." 
                  className="min-h-[200px] focus-visible:ring-primary text-base"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" /> Budget Range
                  </label>
                  <Input 
                    placeholder="e.g. $5k - $15k" 
                    value={formData.budgetRange}
                    onChange={e => setFormData({...formData, budgetRange: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Expected Timeline
                  </label>
                  <Input 
                    placeholder="e.g. 3 Weeks" 
                    value={formData.timeline}
                    onChange={e => setFormData({...formData, timeline: e.target.value})}
                  />
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full h-12 border-dashed border-primary/40 text-primary hover:bg-primary/5 font-bold"
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "AI Consultant Analyzing..." : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Consult with AI Strategic Assistant
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* AI Consultant Column */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-6">
            <Card className={cn(
              "border-2 transition-all duration-500",
              analysis ? "border-accent shadow-accent/20 shadow-2xl" : "border-dashed border-muted-foreground/20 opacity-50"
            )}>
              <CardHeader className="bg-accent/5 border-b flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    Strategic Assessment
                  </CardTitle>
                </div>
                {analysis && (
                  <div className="bg-accent text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    Complexity: {analysis.complexityScore}/10
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6">
                {!analysis ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                      <Sparkles className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground px-4">
                      Submit your requirements to receive a professional AI-driven strategic assessment and complexity score.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Executive Summary</p>
                      <p className="text-sm leading-relaxed text-foreground italic">"{analysis.strategicAssessment}"</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Required Expert Profile</p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.expertMatchingCriteria.map((tag, i) => (
                          <div key={i} className="bg-accent/10 text-accent px-2.5 py-1 rounded-md text-[10px] font-bold border border-accent/20">
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-xl border border-dashed border-muted-foreground/30">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-2 flex items-center gap-1">
                        <Target className="w-3 h-3" /> Consultant's Note
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {analysis.aiConsultantNote}
                      </p>
                    </div>

                    <Button 
                      className="w-full h-14 bg-accent hover:bg-accent/90 text-white font-bold text-lg rounded-xl shadow-xl shadow-accent/30"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Broadcasting..." : (
                        <span className="flex items-center gap-2">
                          Launch Strategic Bounty <ArrowRight className="w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex gap-4 items-start">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                By launching this bounty, you authorize RFPCentral to reach out to our network of verified experts. Your funds will be held in escrow upon awarding the contract.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
