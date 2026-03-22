
import Link from 'next/link';
import { ArrowRight, Zap, Award, Target, Briefcase, Gavel, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuctionCard } from '@/components/AuctionCard';
import { getMockAuctions } from '@/lib/db-mock';

export default async function Home() {
  const auctions = await getMockAuctions();
  const activeAuctions = auctions.filter(a => a.status === 'active').slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.DEFAULT),white)] opacity-20"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 text-foreground">
              The End of the <span className="text-primary">Billable Hour</span>.
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Auction elite professional services as packaged outcomes. We connect visionary founders with the world's most talented independent experts through real-time, high-ticket matchmaking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25" asChild>
                <Link href="/auctions">
                  Secure Expertise <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-primary text-primary hover:bg-primary/5" asChild>
                <Link href="/dashboard/create">Auction Your Bandwidth</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Service Auctions */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10 border-b pb-6">
          <div>
            <h2 className="font-headline text-3xl font-bold mb-2 text-primary italic">Live Outcome Auctions</h2>
            <p className="text-muted-foreground">Strategic capacity packages from verified elite partners.</p>
          </div>
          <Button variant="ghost" asChild className="text-primary hover:text-primary/80 font-bold">
            <Link href="/auctions" className="flex items-center">
              Browse all services <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-primary/5 rounded-[3rem] p-12 lg:p-20 border border-primary/10">
          <div className="max-w-3xl mb-16">
            <h2 className="font-headline text-4xl font-bold mb-6 italic text-primary">"Price discovery for brilliance."</h2>
            <p className="text-xl text-muted-foreground">We've replaced the exhaustive RFP dance and opaque hourly billing with a transparent, real-time bidding environment for high-end professional results.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <div className="bg-primary text-white p-2 rounded-lg"><Briefcase className="w-5 h-5" /></div>
                For Experts
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="font-mono text-primary font-bold">01.</span>
                  <div>
                    <p className="font-bold">Auction Your Yield</p>
                    <p className="text-muted-foreground">List your monthly retainer slots or specific service blocks. Let the market decide your worth based on your history of outcomes.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-mono text-primary font-bold">02.</span>
                  <div>
                    <p className="font-bold">Eliminate Proposals</p>
                    <p className="text-muted-foreground">No more chasing leads. Verified buyers compete for your time, ensuring you work with the clients who value you most.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <div className="bg-accent text-white p-2 rounded-lg"><Target className="w-5 h-5" /></div>
                For Founders
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="font-mono text-accent font-bold">01.</span>
                  <div>
                    <p className="font-bold">Bypass the Agency Fee</p>
                    <p className="text-muted-foreground">Secure direct access to elite independent operators. Pay for the execution, not the overhead.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-mono text-accent font-bold">02.</span>
                  <div>
                    <p className="font-bold">Guaranteed Delivery</p>
                    <p className="text-muted-foreground">Service outcomes are held in escrow. Funds are only released once the pre-defined deliverables are verified.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Credential Vetting</h3>
            <p className="text-muted-foreground">Every expert is vetted for their professional history, past outcomes, and verified identity.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Immediate Capacity</h3>
            <p className="text-muted-foreground">Secure urgent talent blocks in minutes. Perfect for critical strategic pivots or audits.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Gavel className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Market Efficient</h3>
            <p className="text-muted-foreground">Ensure you never overpay or undersell expertise with our competitive bidding environment.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
