import { getMockAuction, getMockBids } from '@/lib/db-mock';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { History, Info, User, ShieldCheck, Star, Award, Target, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AuctionCountdown } from '@/components/AuctionCountdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BiddingInterface } from './BiddingInterface';
import { cn } from '@/lib/utils';

export default async function AuctionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auction = await getMockAuction(id);
  
  if (!auction) {
    notFound();
  }

  const bids = await getMockBids(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Expert Details & Scope */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border">
            <Image
              src={auction.imageUrl}
              alt={auction.title}
              fill
              className="object-cover"
              priority
              data-ai-hint="service expert portfolio"
            />
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-3 py-1">
                <Target className="w-3.5 h-3.5 mr-1" /> Strategic Services
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Info className="w-3.5 h-3.5 mr-1" /> {auction.status === 'active' ? 'Auction Ends' : 'Status'}: 
                <span className="ml-1 font-mono">
                  {auction.status === 'active' ? <AuctionCountdown endAt={auction.endAt} className="inline-flex" /> : 'Closed'}
                </span>
              </Badge>
              {auction.isVerified && (
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 px-3 py-1">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified Professional
                </Badge>
              )}
            </div>

            <h1 className="font-headline text-4xl font-bold text-foreground">
              {auction.title}
            </h1>

            <div className="flex items-center justify-between gap-4 py-6 border-y">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  {auction.sellerName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">{auction.sellerName}</p>
                    <Award className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-foreground">{auction.sellerRating}</span>
                    <span>•</span>
                    <span>{auction.sellerSales} services completed</span>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="h-8 border-primary/20 text-primary">
                Elite Partner
              </Badge>
            </div>

            <div className="prose max-w-none text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-bold text-xl mb-4">Service Scope & Outcomes</h3>
              <p className="text-lg whitespace-pre-wrap">{auction.description}</p>
            </div>

            {/* Business Trust Section */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <h4 className="font-bold text-foreground flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-accent" />
                The RFPCentral Service Guarantee
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="font-bold">Credential Verification</p>
                  <p className="text-muted-foreground">This expert has been verified through professional portfolio review and identity check.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold">Escrow-Backed Delivery</p>
                  <p className="text-muted-foreground">Payment is only released to the expert once the pre-defined project milestones are met.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bidding Interface */}
        <div className="lg:col-span-5 space-y-8">
          <BiddingInterface 
            auctionId={auction.id} 
            startingPrice={auction.startingPrice}
            initialCurrentPrice={auction.currentPrice}
            initialBids={bids}
            endAt={auction.endAt}
          />

          <Card className="border-border/50">
            <CardHeader className="pb-3 border-b mb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="w-5 h-5 text-muted-foreground" />
                Bid Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bids.length > 0 ? (
                  bids.map((bid, index) => (
                    <div key={bid.id} className="flex justify-between items-center animate-in fade-in slide-in-from-bottom-2">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                          index === 0 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                        )}>
                          {bid.bidderName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{bid.bidderName}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {new Date(bid.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <p className={cn("font-mono font-bold", index === 0 ? "text-primary text-lg" : "text-muted-foreground")}>
                        ${bid.amount.toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-center text-muted-foreground py-8">No bids yet. Be the first to secure this expertise.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
