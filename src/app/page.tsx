import Link from 'next/link';
import { ArrowRight, Zap, Award, Target, Briefcase, Gavel, ShieldCheck, Clock, Star, Layout, Sparkles, Waves, Search, BarChart3, Cpu, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuctionCard } from '@/components/AuctionCard';
import { getMockAuctions } from '@/lib/db-mock';

export default async function Home() {
  const auctions = await getMockAuctions();
  const activeAuctions = auctions.filter(a => a.status === 'active').slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      {/* Client-Facing Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32 border-b">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.DEFAULT),white)] opacity-10"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 border border-primary/20">
              <ShieldCheck className="w-3 h-3" /> Tier-0 Enterprise Logic Layer
            </div>
            <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 text-foreground leading-[1.1]">
              Secure <span className="text-primary italic">Human Capacity</span> for the Agentic Shift.
            </h1>
            <h2 className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
              The <span className="text-foreground font-bold italic">Deep Water</span> Marketplace: Free to Post, Free to Tender. We adjudicate the "Worth" and charge only for the Strategic Win.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-2xl shadow-primary/30 font-bold" asChild>
                <Link href="/auctions">
                  Secure Expertise <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-primary/50 text-primary hover:bg-primary/5 font-bold" asChild>
                <Link href="/rfp/create">Post a Free Project RFP</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Deep Water Workflow */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary">The Deep Water Method</h2>
          <h3 className="text-4xl font-extrabold tracking-tight">How we scale mission-critical sales.</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Post', desc: 'Founders post strategic RFPs for free. No upfront discovery fees.', icon: Target },
            { step: '02', title: 'Tender', desc: 'Elite experts submit proposals for free. No cost-of-entry.', icon: Gavel },
            { step: '03', title: 'Adjudicate', desc: 'The AMO autonomously determines the true Worth of the outcome.', icon: Cpu },
            { step: '04', title: 'Win', desc: 'Value is extracted only when the Strategic Win is secured.', icon: Award },
          ].map((item, i) => (
            <div key={i} className="relative group p-8 rounded-[2rem] bg-card border hover:border-primary/50 transition-all">
              <div className="absolute top-4 right-6 text-4xl font-black opacity-5 text-primary group-hover:opacity-10 transition-opacity">{item.step}</div>
              <item.icon className="w-10 h-10 text-primary mb-6" />
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Strategic Outcomes */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10 border-b pb-6">
          <div>
            <h2 className="font-headline text-3xl font-bold mb-2 text-foreground italic">Available Fractional Capacity</h2>
            <p className="text-muted-foreground">Immediate strategic blocks from our verified partners.</p>
          </div>
          <Button variant="ghost" asChild className="text-primary hover:text-primary/80 font-bold flex items-center">
            <Link href="/auctions">
              View full roster <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </section>

      {/* Tier-0 Core Orchestrators */}
      <section className="bg-primary/5 py-24 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl font-bold">Powered by <span className="text-primary italic">Tier-0</span> Logic</h2>
            <p className="text-muted-foreground">A specialized suite of autonomous orchestrators managing the high-stakes project lifecycle.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="bg-foreground text-background p-4 rounded-2xl w-fit"><Cpu className="w-8 h-8" /></div>
              <h4 className="text-2xl font-bold">AAO</h4>
              <p className="text-sm text-muted-foreground leading-relaxed italic">"Autonomous Agentic Orchestrator: End-to-end enterprise proposal synthesis & sub-agent swarm management."</p>
              <ul className="space-y-2 text-xs font-bold text-foreground">
                <li className="flex items-center gap-2"><BarChart3 className="w-3 h-3 text-primary" /> Win-Loss Telemetry Lookup</li>
                <li className="flex items-center gap-2"><Sparkles className="w-3 h-3 text-primary" /> Persona-Based ROI Shaping</li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="bg-foreground text-background p-4 rounded-2xl w-fit"><ShieldAlert className="w-8 h-8" /></div>
              <h4 className="text-2xl font-bold">APO</h4>
              <p className="text-sm text-muted-foreground leading-relaxed italic">"Autonomous Procurement Orchestrator: Requirement harvesting, bid interrogation, & global logistics risk monitoring."</p>
              <ul className="space-y-2 text-xs font-bold text-foreground">
                <li className="flex items-center gap-2"><ShieldCheck className="w-3 h-3 text-accent" /> ESG Standards Validation</li>
                <li className="flex items-center gap-2"><Waves className="w-3 h-3 text-accent" /> Global Logistics Risk Monitor</li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="bg-foreground text-background p-4 rounded-2xl w-fit"><Zap className="w-8 h-8" /></div>
              <h4 className="text-2xl font-bold">AMO</h4>
              <p className="text-sm text-muted-foreground leading-relaxed italic">"Autonomous Monetization Orchestrator: Value-based yield optimization & autonomous escrow adjudication."</p>
              <ul className="space-y-2 text-xs font-bold text-foreground">
                <li className="flex items-center gap-2"><Zap className="w-3 h-3 text-green-500" /> Dynamic Win-Fee Calculation</li>
                <li className="flex items-center gap-2"><Waves className="w-3 h-3 text-green-500" /> Yield Window Analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Roster Standards */}
      <section className="container mx-auto px-4">
        <div className="bg-card border-2 border-dashed rounded-[3rem] p-16 text-center space-y-10">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">The 4% Roster</h3>
            <h2 className="text-5xl font-extrabold tracking-tight italic">Outcome Certainty, Guaranteed.</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We hand-vet every expert through a rigorous professional portfolio review and identity audit. No discovery fees. No billing for hours. Only results.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="rounded-full px-12" asChild>
              <Link href="/rfp/create">Post Mission-Critical RFP</Link>
            </Button>
            <Button size="lg" variant="ghost" className="rounded-full px-12 font-bold" asChild>
              <Link href="/about">Our Philosophy <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}