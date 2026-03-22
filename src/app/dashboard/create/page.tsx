
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Image as ImageIcon, Calendar, DollarSign, ArrowLeft, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { createMockAuction } from '@/lib/db-mock';

export default function CreateServicePackagePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    startingPrice: '',
    reservePrice: '',
    endDate: '',
    endTime: '12:00'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const endTimestamp = new Date(`${formData.endDate}T${formData.endTime}`).getTime();
      
      if (isNaN(endTimestamp) || endTimestamp < Date.now()) {
        throw new Error('Please select a valid future auction end date and time');
      }

      const auctionId = await createMockAuction({
        sellerId: 'current-user',
        sellerName: 'Elite Strategist',
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl || 'https://picsum.photos/seed/newservice/600/400',
        startingPrice: Number(formData.startingPrice),
        reservePrice: Number(formData.reservePrice),
        endAt: endTimestamp,
      });

      toast({ title: "Service Auction Live!", description: "Bidders can now offer for your expertise." });
      router.push(`/auctions/${auctionId}`);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>

      <Card className="border-border shadow-2xl">
        <CardHeader className="border-b bg-muted/20 px-8 py-6">
          <CardTitle className="text-3xl font-headline font-extrabold flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            Auction Your Expertise
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Define your service package outcomes and let the market decide the value of your time.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 py-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Service Package Title</label>
                <Input 
                  placeholder="e.g. Fractional CTO Strategy (20-Hour Block)" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required
                  className="h-12 text-lg focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                   <Target className="w-4 h-4" /> Scope & Deliverables
                </label>
                <Textarea 
                  placeholder="Clearly define what is included in this package, your methodology, and expected outcomes..." 
                  className="min-h-[150px] focus-visible:ring-primary"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Portfolio Image URL
                  </label>
                  <Input 
                    placeholder="https://images.unsplash.com/..." 
                    value={formData.imageUrl}
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                    className="focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Minimum Starting Bid ($)
                  </label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    value={formData.startingPrice}
                    onChange={e => setFormData({...formData, startingPrice: e.target.value})}
                    required
                    className="focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Reserve Price ($)</label>
                  <Input 
                    type="number" 
                    placeholder="Optional" 
                    value={formData.reservePrice}
                    onChange={e => setFormData({...formData, reservePrice: e.target.value})}
                    className="focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Auction End Time
                  </label>
                  <div className="flex gap-2">
                    <Input 
                      type="date" 
                      value={formData.endDate}
                      onChange={e => setFormData({...formData, endDate: e.target.value})}
                      required
                      className="focus-visible:ring-primary"
                    />
                    <Input 
                      type="time" 
                      value={formData.endTime}
                      onChange={e => setFormData({...formData, endTime: e.target.value})}
                      required
                      className="focus-visible:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-bold rounded-xl transition-all shadow-xl shadow-primary/20" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Launching Auction..." : "Launch Service Auction"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
