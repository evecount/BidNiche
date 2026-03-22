
import { AuctionCard } from '@/components/AuctionCard';
import { getMockAuctions } from '@/lib/db-mock';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function BrowseAuctionsPage() {
  const auctions = await getMockAuctions();
  const activeAuctions = auctions.filter(a => a.status === 'active');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="font-headline text-4xl font-extrabold mb-4">Discover Unique Finds</h1>
        <p className="text-muted-foreground text-lg">Browse our curated collection of live auctions from around the globe.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search by title, brand, or category..." 
            className="pl-10 h-12 bg-white/50 border-border/60 focus-visible:ring-primary"
          />
        </div>
        <Button variant="outline" className="h-12 px-6 flex items-center gap-2 border-border/60">
          <Filter className="w-5 h-5" /> Filter Results
        </Button>
      </div>

      {activeAuctions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-card rounded-2xl border-2 border-dashed">
          <p className="text-xl text-muted-foreground">No active auctions found matching your criteria.</p>
          <Button variant="link" className="text-primary mt-2">Clear all filters</Button>
        </div>
      )}
    </div>
  );
}
