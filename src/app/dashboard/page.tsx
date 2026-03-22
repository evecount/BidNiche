import { getMockUserAuctions, getMockUserBids } from '@/lib/db-mock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Gavel, ShoppingBag, Clock, ArrowRight, ExternalLink, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default async function DashboardPage() {
  // Simulating the current logged-in user
  const currentUserId = 'current-user'; 
  const myAuctions = await getMockUserAuctions(currentUserId);
  const myBids = await getMockUserBids(currentUserId);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground">
            Operational Hub
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your strategic service acquisitions and expert capacity listings.
          </p>
        </div>
        <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20" asChild>
          <Link href="/dashboard/create">
            <Plus className="w-5 h-5 mr-2" /> List New Outcome
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="buying" className="space-y-8">
        <TabsList className="bg-muted/50 p-1 rounded-xl h-14 w-full md:w-auto grid grid-cols-2 md:inline-flex">
          <TabsTrigger value="buying" className="rounded-lg h-full px-10 text-base font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Briefcase className="w-4 h-4 mr-2" /> Acquiring
          </TabsTrigger>
          <TabsTrigger value="selling" className="rounded-lg h-full px-10 text-base font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Gavel className="w-4 h-4 mr-2" /> Yielding
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buying" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {myBids.length > 0 ? (
              myBids.map((bid) => (
                <Card key={bid.id} className="group hover:border-primary/50 transition-all">
                  <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6 w-full">
                      <div className="bg-primary/10 p-4 rounded-2xl hidden md:block">
                        <Gavel className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
                          {bid.auctionTitle}
                        </h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" /> 
                            Placed: {new Date(bid.createdAt).toLocaleDateString()}
                          </span>
                          <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
                            Active Bid
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-12 w-full md:w-auto border-t md:border-0 pt-4 md:pt-0">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Your Offer</p>
                        <p className="text-2xl font-mono font-bold text-primary">
                          ${bid.amount.toLocaleString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary" asChild>
                        <Link href={`/auctions/${bid.auctionId}`}>
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-dashed py-20 bg-muted/20">
                <CardContent className="text-center space-y-4">
                  <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">No active acquisitions</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">You haven't placed any offers on service blocks yet. Secure the expertise your project needs today.</p>
                  </div>
                  <Button variant="outline" className="rounded-full px-8" asChild>
                    <Link href="/auctions">Browse Expertise</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="selling" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {myAuctions.length > 0 ? (
              myAuctions.map((auction) => (
                <Card key={auction.id} className="group hover:border-primary/50 transition-all">
                  <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6 w-full">
                      <div className="relative h-20 w-28 rounded-lg overflow-hidden border">
                        <img 
                          src={auction.imageUrl} 
                          alt={auction.title} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
                          {auction.title}
                        </h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" /> 
                            Closes: {new Date(auction.endAt).toLocaleDateString()}
                          </span>
                          <Badge className={auction.status === 'active' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-muted text-muted-foreground'}>
                            {auction.status === 'active' ? 'Auctioning' : 'Completed'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-12 w-full md:w-auto border-t md:border-0 pt-4 md:pt-0">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Market Value</p>
                        <p className="text-2xl font-mono font-bold text-primary">
                          ${auction.currentPrice.toLocaleString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary" asChild>
                        <Link href={`/auctions/${auction.id}`}>
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-dashed py-20 bg-muted/20">
                <CardContent className="text-center space-y-4">
                  <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <Gavel className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">No active yields</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">Maximize the value of your limited bandwidth. List a specific outcome package to begin price discovery.</p>
                  </div>
                  <Button variant="outline" className="rounded-full px-8" asChild>
                    <Link href="/dashboard/create">Auction Capacity</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
