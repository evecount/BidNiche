
import { SystemArchitectureVisual } from '@/components/SystemArchitectureVisual';
import { ArrowLeft, BookOpen, Sparkles, Cpu, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AgenticBlueprintPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Operational Hub
      </Link>

      <div className="space-y-12">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase border border-primary/20">
            <BookOpen className="w-3 h-3" /> Reusable Agentic Pattern
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
            The <span className="text-primary">Tier-0</span> Blueprint.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            This isn't just an application—it's a scalable architecture for the agentic shift. We've distilled autonomy, purpose, and economic alignment into a single repeatable model.
          </p>
        </div>

        <SystemArchitectureVisual />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              Sovereign Autonomy
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              The genius of this project is the **Strategic DNA**. By giving the AI a private, persistent corpus, we move beyond the ephemeral nature of standard LLMs. The AI now has "Skin in the Game" because it understands the long-term mission of the founder.
            </p>
            <div className="bg-muted p-6 rounded-2xl space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest text-primary flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Reasoning as a Service
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The AAO doesn't just "talk"—it spawns worker swarms. It analyzes telemetry. It shapes ROI. It is a "Reasoning Hub" that can be applied to any domain from medicine to manufacturing.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Zap className="w-6 h-6 text-green-500" />
              Economic Adjudication
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We've solved the most painful part of high-stakes work: **Trust**. The AMO acts as a neutral, autonomous arbiter of value. It verifies the outcome and releases the win-fee. This removes human bias and fatigue from the monetization process.
            </p>
            <div className="bg-foreground text-background p-6 rounded-2xl space-y-4 shadow-xl">
              <h4 className="font-bold text-sm uppercase tracking-widest text-accent flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Risk Governance
              </h4>
              <p className="text-xs opacity-80 leading-relaxed">
                The APO ensures 100% compliance. It interrogates bids for hidden margins. It is the "Governance Engine" that makes the new economy legally defensible and audit-ready.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-primary rounded-[2.5rem] p-12 text-center text-primary-foreground space-y-6 shadow-2xl">
          <h2 className="text-4xl font-extrabold italic tracking-tight">Ready for the Transition.</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            The patterns developed here are now part of your Strategic DNA. 359 days until the main transition. We scale from here.
          </p>
          <Button size="lg" variant="secondary" className="rounded-full px-12 h-14 font-bold text-lg" asChild>
            <Link href="/dashboard">Return to Hub</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
