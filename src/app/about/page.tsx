
import { Briefcase, ShieldCheck, Zap, Users, Globe, Award, Target, Scale } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24 text-foreground">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary/5 border-b overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-6xl mb-8">
            The Marketplace for <span className="text-primary">Elite Outcomes</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            BidNiche bridges the gap between high-growth companies and the world's most talented independent experts. We've modernized professional services by moving away from opaque billable hours and into transparent, market-driven auctions.
          </p>
        </div>
      </section>

      {/* Disruption Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="font-headline text-3xl font-bold">Death of the Billable Hour</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Traditional professional services—law, consulting, engineering—are built on the flawed incentive of the billable hour. It rewards inefficiency and creates friction. 
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At BidNiche, we auction **packaged outcomes**. Whether it's a 40-hour legal sprint or a fractional CTO block, the market decides the value based on the results, not the ticking clock.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4">
                <div className="bg-primary/10 p-2 h-fit rounded-lg">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Fair Market Value</h4>
                  <p className="text-sm text-muted-foreground">True pricing for high-demand talent.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary/10 p-2 h-fit rounded-lg">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Instant Access</h4>
                  <p className="text-sm text-muted-foreground">Secure urgent talent blocks in minutes.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-square lg:aspect-video rounded-3xl overflow-hidden shadow-2xl border">
            <img 
              src="https://picsum.photos/seed/legal-audit/800/600" 
              alt="Elite Professional Collaboration" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card py-20 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Services Delivered', value: '4.2k+', icon: Briefcase },
              { label: 'Active Experts', value: '850+', icon: Users },
              { label: 'Global Founders', value: '15k+', icon: Globe },
              { label: 'Expert Vetting Rate', value: '4.2%', icon: Award },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="bg-primary/5 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-extrabold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-primary rounded-3xl p-12 text-center text-primary-foreground space-y-8 shadow-2xl shadow-primary/30">
          <h2 className="text-4xl font-extrabold tracking-tight">Ready to hire elite talent?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Secure your next strategic partner through our dynamic bidding platform. Join the founders who are changing the way work gets done.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="h-14 px-10 rounded-full font-bold" asChild>
              <Link href="/auctions">Browse Services</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 rounded-full font-bold border-white/20 hover:bg-white/10 text-white" asChild>
              <Link href="/dashboard/create">List Your Expertise</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
