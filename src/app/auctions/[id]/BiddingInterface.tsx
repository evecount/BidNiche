'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Gavel, TrendingUp, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Bid } from '@/lib/types';
import { placeMockBid } from '@/lib/db-mock';

interface BiddingInterfaceProps {
  auctionId: string;
  startingPrice: number;
  initialCurrentPrice: number;
  initialBids: Bid[];
  endAt: number;
}

export function BiddingInterface({ 
  auctionId, 
  startingPrice, 
  initialCurrentPrice, 
  initialBids,
  endAt 
}: BiddingInterfaceProps) {
  const [currentPrice, setCurrentPrice] = useState(initialCurrentPrice);
  const [bidAmount, setBidAmount] = useState(initialCurrentPrice + 50);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Real-time listener simulation
  useEffect(() => {
    // In a real app, we'd use Firestore's onSnapshot here
    // const unsubscribe = onSnapshot(doc(db, 'auctions', auctionId), (doc) => {
    //   setCurrentPrice(doc.data().currentPrice);
    // });
    // return () => unsubscribe();
  }, [auctionId]);

  const handlePlaceBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (endAt < Date.now()) {
      toast({ title: "Auction Ended", description: "This auction is no longer accepting bids.", variant: "destructive" });
      return;
    }

    if (bidAmount <= currentPrice) {
      toast({ title: "Invalid Bid", description: `Bid must be higher than $${currentPrice.toLocaleString()}`, variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulation of a server action or API call
      await placeMockBid(auctionId, { id: 'current-user', name: 'You (Me)', email: 'me@example.com', role: 'buyer' }, bidAmount);
      setCurrentPrice(bidAmount);
      setBidAmount(bidAmount + 50);
      toast({ title: "Bid Placed Successfully!", description: "You are currently the highest bidder." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to place bid.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isClosed = endAt < Date.now();

  return (
    <Card className="border-primary/20 shadow-xl overflow-hidden">
      <div className="bg-primary px-6 py-3 flex justify-between items-center text-primary-foreground">
        <span className="text-sm font-bold uppercase tracking-widest">Current Offer</span>
        <TrendingUp className="w-5 h-5 opacity-75" />
      </div>
      <CardHeader className="text-center pt-8">
        <CardTitle className="text-5xl font-mono font-bold tracking-tighter text-primary">
          ${currentPrice.toLocaleString()}
        </CardTitle>
        <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-2">
          {initialBids.length} total bids
        </p>
      </CardHeader>
      <CardContent className="space-y-6 px-8">
        {!isClosed ? (
          <form onSubmit={handlePlaceBid} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="bid-amount" className="text-sm font-bold text-muted-foreground">Your Bid Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-muted-foreground">$</span>
                <Input 
                  id="bid-amount"
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  className="pl-10 h-14 text-xl font-mono font-bold border-2 focus-visible:ring-primary"
                  min={currentPrice + 1}
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-bold rounded-xl transition-all shadow-lg shadow-primary/30" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : (
                <span className="flex items-center gap-2">
                  <Gavel className="w-5 h-5" /> Place Your Bid
                </span>
              )}
            </Button>
          </form>
        ) : (
          <div className="bg-muted/50 p-6 rounded-xl border border-dashed text-center space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-muted-foreground" />
            <p className="font-bold text-muted-foreground">Bidding is now closed for this auction.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-muted/30 px-8 py-4 flex justify-center border-t">
        <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest font-bold">
          All bids are binding. RFPCentral verification required for purchases over $10k.
        </p>
      </CardFooter>
    </Card>
  );
}
