
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
              Auction Elite <span className="text-primary">Services</span> & Strategic Expertise
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              The end of the billable hour. Secure world-class talent through real-time auctions for packaged outcomes. BidNiche connects visionary founders with the results they need to scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25" asChild>
                <Link href="/auctions">
                  Browse Services <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-primary text-primary hover:bg-primary/5" asChild>
                <Link href="/dashboard/create">List Your Expertise</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Service Auctions */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10 border-b pb-6">
          <div>
            <h2 className="font-headline text-3xl font-bold mb-2">Live Service Auctions</h2>
            <p className="text-muted-foreground">Limited capacity packages from verified top-tier experts.</p>
          </div>
          <Button variant="ghost" asChild className="text-primary hover:text-primary/80 font-bold">
            <Link href="/auctions" className="flex items-center">
              View all services <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-primary/5 rounded-[3rem] p-12 lg:p-20 border border-primary/10">
          <div className="max-w-3xl mb-16">
            <h2 className="font-headline text-4xl font-bold mb-6 italic text-primary">"The market decides the value of your outcome."</h2>
            <p className="text-xl text-muted-foreground">We've replaced friction-heavy negotiations with a transparent, real-time bidding environment for high-end professional work.</p>
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
                    <p className="font-bold">Package Your Result</p>
                    <p className="text-muted-foreground">Define a specific block of work (e.g., 10 hours of legal audit) with clear deliverables.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-mono text-primary font-bold">02.</span>
                  <div>
                    <p className="font-bold">Set Your Floor</p>
                    <p className="text-muted-foreground">Establish a starting price that respects your worth. No more race-to-the-bottom bidding.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-mono text-primary font-bold">03.</span>
                  <div>
                    <p className="font-bold">Maximize Yield</p>
                    <p className="text-muted-foreground">Let multiple clients compete for your limited bandwidth, ensuring you're paid true market value.</p>
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
                    <p className="font-bold">Access Elite Talent</p>
                    <p className="text-muted-foreground">Secure time blocks from experts who are normally "unhirable" through traditional channels.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-mono text-accent font-bold">02.</span>
                  <div>
                    <p className="font-bold">Transparent Pricing</p>
                    <p className="text-muted-foreground">See exactly what others are willing to pay. No hidden fees or surprise billable hours.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-mono text-accent font-bold">03.</span>
                  <div>
                    <p className="font-bold">Guaranteed Outcome</p>
                    <p className="text-muted-foreground">Funds are held in escrow until the defined service package deliverables are fulfilled.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center group">
            <div className="bg-primary/10 p-4 rounded-2xl mb-6 group-hover:bg-primary/20 transition-colors">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-headline text-xl font-bold mb-3 text-foreground">Vetted Expertise</h3>
            <p className="text-muted-foreground leading-relaxed">We verify professional credentials and portfolios to maintain an elite talent standard.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="bg-primary/10 p-4 rounded-2xl mb-6 group-hover:bg-primary/20 transition-colors">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-headline text-xl font-bold mb-3 text-foreground">Instant Availability</h3>
            <p className="text-muted-foreground leading-relaxed">Secure urgent talent blocks in minutes. Perfect for critical strategic needs.</p>
          </div>
          <div className="flex flex-col items-center text-center group">
            <div className="bg-primary/10 p-4 rounded-2xl mb-6 group-hover:bg-primary/20 transition-colors">
              <Gavel className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-headline text-xl font-bold mb-3 text-foreground">Market Fair Pricing</h3>
            <p className="text-muted-foreground leading-relaxed">Ensure you never overpay or undersell with our dynamic bidding environment.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
