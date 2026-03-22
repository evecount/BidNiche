import Link from 'next/link';
import { ArrowRight, Zap, Award, Target, Briefcase, Gavel, ShieldCheck, Clock, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuctionCard } from '@/components/AuctionCard';
import { getMockAuctions } from '@/lib/db-mock';

export default async function Home() {
  const auctions = await getMockAuctions();
  const activeAuctions = auctions.filter(a => a.status === 'active').slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Client-Facing Hero Section */}
      <section className="relative overflow-hidden bg-background py-24 sm:py-32 border-b">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.DEFAULT),white)] opacity-10"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 border border-primary/20">
              <ShieldCheck className="w-3 h-3" /> Vetted Roster of Strategic Operators
            </div>
            <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 text-foreground leading-[1.1]">
              Secure Fractional <span className="text-primary italic">Capacity</span> for Mission-Critical Projects.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
              Stop hiring by the hour. Secure guaranteed project outcomes—like marketing rollouts and investor roadshows—through real-time price discovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-2xl shadow-primary/30 font-bold" asChild>
                <Link href="/auctions">
                  Outsource with Confidence <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-primary/50 text-primary hover:bg-primary/5 font-bold" asChild>
                <Link href="/rfp/create">Post a Strategic Bounty</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Strategic Outcomes */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10 border-b pb-6">
          <div>
            <h2 className="font-headline text-3xl font-bold mb-2 text-foreground italic">Fractional Capacity</h2>
            <p className="text-muted-foreground">Immediate strategic outcome blocks from our verified partners.</p>
          </div>
          <Button variant="ghost" asChild className="text-primary hover:text-primary/80 font-bold">
            <Link href="/auctions" className="flex items-center">
              View all capacity <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              quote: "I used to sweat over our marketing rollouts. Now, I just secure a vetted capacity block on RFPCentral and know the outcome is guaranteed by an expert who's done it before.",
              author: "Marcus Chen",
              role: "CEO, NexaStream"
            },
            {
              quote: "Our Series A roadshow was high-stakes. Posting a Strategic Bounty on RFPCentral brought the experts to us, with AI vetting the complexity first.",
              author: "Sarah Jenkins",
              role: "Founder, Bloom Capital"
            },
            {
              quote: "Auctioning my monthly bandwidth as fractional capacity has doubled our yield. We only work on mission-critical projects now, and clients get our total focus.",
              author: "David Vark",
              role: "Principal, Vark Strategy"
            }
          ].map((t, i) => (
            <div key={i} className="bg-card p-8 rounded-3xl border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <Quote className="w-10 h-10 text-primary/20 mb-6" />
              <p className="text-lg text-foreground italic leading-relaxed mb-8">"{t.quote}"</p>
              <div>
                <p className="font-bold text-foreground">{t.author}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Value Prop */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-primary/5 rounded-[3rem] p-12 lg:p-20 border border-primary/10">
          <div className="max-w-3xl mb-16">
            <h2 className="font-headline text-4xl font-bold mb-6 italic text-primary">Price discovery for mission-critical outcomes.</h2>
            <p className="text-xl text-muted-foreground">We've replaced the exhaustive agency pitch dance with a transparent, market-driven environment for high-ticket results.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold flex items-center gap-3 text-foreground">
                <div className="bg-primary text-white p-2 rounded-lg shadow-lg"><Briefcase className="w-5 h-5" /></div>
                For Founders & CEOs
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-xs border border-primary/20">01</div>
                  <div>
                    <p className="font-bold">Bypass Procurement Friction</p>
                    <p className="text-muted-foreground">Secure direct access to the world's most talented operators without weeks of contract negotiation.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-xs border border-primary/20">02</div>
                  <div>
                    <p className="font-bold">Guaranteed Results</p>
                    <p className="text-muted-foreground">Payments are held in escrow. Funds are only released when the pre-defined strategic deliverables are met.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold flex items-center gap-3 text-foreground">
                <div className="bg-accent text-white p-2 rounded-lg shadow-lg"><Gavel className="w-5 h-5" /></div>
                For Strategic Operators
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent font-bold text-xs border border-accent/20">01</div>
                  <div>
                    <p className="font-bold">Auction Your Yield</p>
                    <p className="text-muted-foreground">Maximize the value of your limited monthly bandwidth. Let exclusivity drive your price floor.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent font-bold text-xs border border-accent/20">02</div>
                  <div>
                    <p className="font-bold">No More Pitching</p>
                    <p className="text-muted-foreground">Stop writing proposals for free. We bring qualified, high-intent founders directly to your capacity auctions.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Roster Verification Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Our Standards</h3>
          <h2 className="text-4xl font-extrabold">The High-Yield Roster</h2>
          <p className="text-muted-foreground mt-4">We hand-vet every operator on RFPCentral to ensure only the highest quality strategic outcomes are delivered.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Vetted Expertise</h3>
            <p className="text-muted-foreground text-sm">Every operator undergoes identity verification and a rigorous review of past project outcomes.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 -rotate-3">
              <Zap className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Instant Capacity</h3>
            <p className="text-muted-foreground text-sm">Secure urgent technical audits or marketing sprints in minutes. No procurement cycles.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-6">
              <Award className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Outcome Focused</h3>
            <p className="text-muted-foreground text-sm">Our roster includes former Big 4 partners, YC-backed founders, and boutique agency leads focused on results.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
