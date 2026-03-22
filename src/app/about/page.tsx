
import { Gavel, ShieldCheck, Zap, Users, Globe, Award } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary/5 border-b overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight sm:text-6xl mb-8 text-foreground">
            The World's Premier <span className="text-primary">Trust-First</span> Auction House
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            BidNiche was founded on a simple principle: high-end transactions require high-end trust. We've built the world's most responsive bidding engine to bring the excitement of the auction floor to your fingertips.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="font-headline text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We connect passionate collectors with one-of-a-kind items through a platform that prioritizes transparency and speed. Whether it's a vintage Leica or a classic Porsche, we ensure that every bid is real, every seller is verified, and every transaction is secure.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4">
                <div className="bg-primary/10 p-2 h-fit rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Verified Only</h4>
                  <p className="text-sm text-muted-foreground">Every participant is vetted.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary/10 p-2 h-fit rounded-lg">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Low Latency</h4>
                  <p className="text-sm text-muted-foreground">Millisecond-accurate bidding.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-square lg:aspect-video rounded-3xl overflow-hidden shadow-2xl border">
            <img 
              src="https://picsum.photos/seed/about1/800/600" 
              alt="Auction House" 
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
              { label: 'Total Bids', value: '1.2M+', icon: Gavel },
              { label: 'Happy Collectors', value: '45k+', icon: Users },
              { label: 'Countries', value: '120+', icon: Globe },
              { label: 'Verified Items', value: '8.5k+', icon: Award },
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
          <h2 className="text-4xl font-extrabold tracking-tight">Ready to join the elite?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Experience the future of auctions today. Whether you're hunting for a masterpiece or liquidating a collection, BidNiche is your partner in excellence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="h-14 px-10 rounded-full font-bold" asChild>
              <Link href="/auctions">Start Bidding</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 rounded-full font-bold border-white/20 hover:bg-white/10 text-white" asChild>
              <Link href="/dashboard/create">List an Item</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
