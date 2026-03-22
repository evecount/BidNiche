
import Link from 'next/link';
import { ArrowRight, Gavel, ShieldCheck, Zap } from 'lucide-react';
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
              Discover <span className="text-primary">Extraordinary</span> Items at Live Auctions
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Experience the thrill of real-time bidding. BidNiche connects collectors with the world's most unique treasures in a secure, transparent environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full" asChild>
                <Link href="/auctions">
                  Start Bidding <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-primary text-primary" asChild>
                <Link href="/dashboard/create">Sell an Item</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-headline text-3xl font-bold mb-2">Live Auctions</h2>
            <p className="text-muted-foreground">Ending soon. Don't miss out on these rare finds.</p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/auctions" className="flex items-center text-primary font-semibold">
              View all <ArrowRight className="ml-1 w-4 h-4" />
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
            <h2 className="font-headline text-3xl font-bold mb-4">Why BidNiche?</h2>
            <p className="text-muted-foreground">The industry leader in real-time online auctions, built on trust and cutting-edge technology.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-2xl mb-6">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-3">Real-Time Engine</h3>
              <p className="text-muted-foreground leading-relaxed">Milliseconds matter. Our low-latency bidding engine ensures you see every bid as it happens, globally.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-2xl mb-6">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-3">Verified Sellers</h3>
              <p className="text-muted-foreground leading-relaxed">Every seller is strictly vetted to maintain a high-quality, trustworthy marketplace for all participants.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-2xl mb-6">
                <Gavel className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-3">Secure Bidding</h3>
              <p className="text-muted-foreground leading-relaxed">Our automated escrow and resolution system guarantees a fair outcome for both buyers and sellers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
