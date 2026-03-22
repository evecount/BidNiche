
import { getMockAuction, getMockBids } from '@/lib/db-mock';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Gavel, History, Info, User, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AuctionCountdown } from '@/components/AuctionCountdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BiddingInterface } from './BiddingInterface';

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
        
        {/* Left Column: Media & Details */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border">
            <Image
              src={auction.imageUrl}
              alt={auction.title}
              fill
              className="object-cover"
              priority
              data-ai-hint="auction item hero"
            />
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-3 py-1">
                <Tag className="w-3.5 h-3.5 mr-1" /> Collectibles
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Info className="w-3.5 h-3.5 mr-1" /> {auction.status === 'active' ? 'Ends in' : 'Status'}: 
                <span className="ml-1 font-mono">
                  {auction.status === 'active' ? <AuctionCountdown endAt={auction.endAt} className="inline-flex" /> : 'Closed'}
                </span>
              </Badge>
            </div>

            <h1 className="font-headline text-4xl font-bold text-foreground">
              {auction.title}
            </h1>

            <div className="flex items-center gap-4 py-4 border-y">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Seller</p>
                  <p className="text-sm font-bold">{auction.sellerName}</p>
                </div>
              </div>
            </div>

            <div className="prose max-w-none text-muted-foreground leading-relaxed">
              <h3 className="text-foreground font-bold">About this item</h3>
              <p>{auction.description}</p>
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
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="w-5 h-5 text-muted-foreground" />
                Bid History
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
                  <p className="text-sm text-center text-muted-foreground py-8">No bids yet. Be the first!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

// Helper for conditional classNames since it's not exported globally from @/lib/utils in this context
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
