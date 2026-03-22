import { Briefcase, ShieldCheck, Zap, Users, Globe, Award, Target, Scale, Star, Bot, Sparkles, Waves, Cpu, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24 text-foreground">
      {/* Hero Section */}
      <section className="relative py-32 bg-primary/5 border-b overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-8 border border-primary/20">
            <Zap className="w-3 h-3 fill-primary" /> The Deep Water Method
          </div>
          <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-7xl mb-8">
            The <span className="text-primary italic">Sovereign</span> Strategy.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            RFPCentral is the first "Human-in-the-Loop" marketplace designed for the agentic shift. We don't sell hours. We sell <span className="text-foreground font-bold italic">certainty</span>.
          </p>
        </div>
      </section>

      {/* The Vision Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="font-headline text-4xl font-bold italic text-primary">Outcome Adjudication, Not Arbitrary Billing</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The billable hour is a legacy constraint. In the new economy, we buy back our lives by buying guaranteed outcomes. Our Tier-0 orchestrators handle the complexity so you can focus on the win.
            </p>
            <div className="bg-muted/50 p-6 rounded-2xl border border-dashed border-primary/20 space-y-4">
              <h4 className="font-bold flex items-center gap-2">
                <Waves className="w-5 h-5 text-primary" /> The Deep Water Philosophy
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="font-bold text-primary">Free to Post:</span> Founders list mission-critical RFPs at zero cost. No discovery fees.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">Free to Tender:</span> Elite experts submit strategic proposals without upfront fees.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">Pay for the Win:</span> We only monetize when the outcome is secured, adjudicated by our AMO.
                </li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl group-hover:bg-primary/30 transition-all duration-500"></div>
            <div className="relative aspect-square lg:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img 
                src="https://picsum.photos/seed/sovereign-ops/800/600" 
                alt="Sovereign Operations" 
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tier-0 Tiering Section */}
      <section className="container mx-auto px-4 py-24 bg-card border rounded-[3rem]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl font-extrabold tracking-tight">The <span className="text-primary italic">Tier-0</span> Logic Layer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-muted/30 rounded-2xl border space-y-4">
              <Cpu className="w-10 h-10 text-primary mx-auto" />
              <h4 className="font-bold">AAO</h4>
              <p className="text-xs text-muted-foreground">End-to-end enterprise proposal synthesis shaped for the buyer's psychological profile.</p>
            </div>
            <div className="p-8 bg-muted/30 rounded-2xl border space-y-4">
              <ShieldAlert className="w-10 h-10 text-accent mx-auto" />
              <h4 className="font-bold">APO</h4>
              <p className="text-xs text-muted-foreground">Autonomous procurement governance, interrogating bids for hidden margins and logistics risk.</p>
            </div>
            <div className="p-8 bg-muted/30 rounded-2xl border space-y-4">
              <Zap className="w-10 h-10 text-green-500 mx-auto" />
              <h4 className="font-bold">AMO</h4>
              <p className="text-xs text-muted-foreground">Strategic value extraction, adjudicating win-fees based on business impact delta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Strategic Wins', value: '4.2k+', icon: Briefcase },
            { label: 'Vetted Partners', value: '850+', icon: Users },
            { label: 'Global Founders', value: '15k+', icon: Globe },
            { label: 'Roster Acceptance', value: '4.2%', icon: Award },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="bg-primary/5 w-16 h-16 rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-primary/10">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <p className="text-4xl font-extrabold text-foreground tracking-tighter">{stat.value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-primary rounded-[3rem] p-16 lg:p-24 text-center text-primary-foreground space-y-10 shadow-[0_40px_80px_-20px_rgba(var(--primary),0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-5xl lg:text-6xl font-extrabold tracking-tight italic">Outsource the anxiety.</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Post for free. Tender for free. Pay only when the outcome is secured.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
            <Button size="lg" variant="secondary" className="h-16 px-12 rounded-full font-bold text-lg shadow-xl" asChild>
              <Link href="/auctions">Browse Roster Capacity</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-12 rounded-full font-bold text-lg border-white/30 hover:bg-white/10 text-white" asChild>
              <Link href="/rfp/create">Post Free RFP</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}