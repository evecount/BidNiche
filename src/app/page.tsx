
import Link from 'next/link';
import { ArrowRight, Zap, Award, Target, Briefcase } from 'lucide-react';
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
              Secure world-class talent through real-time auctions. From fractional CTOs to growth strategy sprints, BidNiche connects founders with the expertise they need to win.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full" asChild>
                <Link href="/auctions">
                  Browse Services <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-primary text-primary" asChild>
                <Link href="/dashboard/create">List Your Expertise</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Service Auctions */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-headline text-3xl font-bold mb-2">Live Service Auctions</h2>
            <p className="text-muted-foreground">Limited capacity packages from verified top-tier experts.</p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/auctions" className="flex items-center text-primary font-semibold">
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

      {/* Features Grid */}
      <section className="bg-card border-y py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-headline text-3xl font-bold mb-4">Why Auction Expertise?</h2>
            <p className="text-muted-foreground">Market-driven pricing for high-demand strategic talent and outcome-based services.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-2xl mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-3">Outcome-Focused</h3>
              <p className="text-muted-foreground leading-relaxed">Every auction is for a clearly defined package of work, ensuring buyers know exactly what results to expect.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-2xl mb-6">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-3">Vetted Expertise</h3>
              <p className="text-muted-foreground leading-relaxed">We verify professional credentials, case studies, and identity to maintain an elite talent standard.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-2xl mb-6">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-3">Real-Time Speed</h3>
              <p className="text-muted-foreground leading-relaxed">Secure urgent high-priority talent blocks in minutes through our dynamic bidding environment.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
