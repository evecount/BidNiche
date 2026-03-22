import { Briefcase, ShieldCheck, Zap, Users, Globe, Award, Target, Scale, Star } from 'lucide-react';
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
            <Star className="w-3 h-3 fill-primary" /> The Premium Outcome Standard
          </div>
          <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-7xl mb-8">
            The World's Roster for <span className="text-primary italic">Elite Expertise</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            RFPCentral bridges the gap between high-growth companies and a vetted roster of the world's most talented independent experts. We've modernized professional services by moving away from opaque billable hours and into transparent, market-driven auctions.
          </p>
        </div>
      </section>

      {/* Disruption Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="font-headline text-4xl font-bold italic text-primary">Death of the Billable Hour</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Traditional professional services—law, consulting, engineering—are built on the flawed incentive of the billable hour. It rewards inefficiency and creates unnecessary friction between clients and experts.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
              At RFPCentral, we acquire and vet elite talent for our roster, then allow them to auction **packaged outcomes**. Whether it's a 40-hour legal sprint or a fractional CTO block, the market decides the value based on results, not the ticking clock.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 h-fit rounded-2xl border border-primary/20 shadow-sm shadow-primary/10">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Fair Market Value</h4>
                  <p className="text-sm text-muted-foreground">True pricing discovery for high-demand, limited-capacity talent.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 h-fit rounded-2xl border border-primary/20 shadow-sm shadow-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Guaranteed Results</h4>
                  <p className="text-sm text-muted-foreground">Secure urgent talent blocks with delivery held in escrow.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl group-hover:bg-primary/30 transition-all duration-500"></div>
            <div className="relative aspect-square lg:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img 
                src="https://picsum.photos/seed/elite-vetting/800/600" 
                alt="Elite Professional Vetting" 
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card py-24 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Strategic Outcomes', value: '4.2k+', icon: Briefcase },
              { label: 'Vetted Experts', value: '850+', icon: Users },
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-primary rounded-[3rem] p-16 lg:p-24 text-center text-primary-foreground space-y-10 shadow-[0_40px_80px_-20px_rgba(var(--primary),0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-5xl lg:text-6xl font-extrabold tracking-tight">Ready to hire elite talent?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Secure your next strategic partner through our dynamic bidding platform. Join the founders who are changing the way high-ticket work gets done.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
            <Button size="lg" variant="secondary" className="h-16 px-12 rounded-full font-bold text-lg shadow-xl" asChild>
              <Link href="/auctions">Browse the Roster</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-12 rounded-full font-bold text-lg border-white/30 hover:bg-white/10 text-white" asChild>
              <Link href="/rfp/create">Post Strategic RFP</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
