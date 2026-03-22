
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Auction } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AuctionCountdown } from './AuctionCountdown';
import { Gavel } from 'lucide-react';

interface AuctionCardProps {
  auction: Auction;
}

export function AuctionCard({ auction }: AuctionCardProps) {
  return (
    <Link href={`/auctions/${auction.id}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={auction.imageUrl}
            alt={auction.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            data-ai-hint="auction item"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {auction.status === 'active' ? 'Active' : 'Closed'}
            </Badge>
          </div>
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <h3 className="font-headline font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {auction.title}
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">by {auction.sellerName}</p>
        </CardHeader>
        <CardContent className="p-4 py-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Current Bid</p>
              <p className="text-2xl font-bold text-primary font-mono">
                ${auction.currentPrice.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <AuctionCountdown endAt={auction.endAt} className="justify-end" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="w-full flex items-center justify-center gap-2 bg-secondary/50 py-2 rounded-md text-sm font-medium text-primary-foreground bg-primary group-hover:bg-primary/90 transition-colors">
            <Gavel className="w-4 h-4" />
            Place Bid
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
