'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Gavel, ShieldCheck, Send, Waves } from 'lucide-react';
import { submitProposal } from '@/lib/db-mock';

interface ProposalFormProps {
  rfpId: string;
}

export function ProposalForm({ rfpId }: ProposalFormProps) {
  const [amount, setAmount] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitProposal({
        rfpId,
        expertId: 'current-expert',
        expertName: 'Vetted Strategist',
        amount: Number(amount),
        coverLetter,
      });

      toast({ 
        title: "Proposal Submitted", 
        description: "The founder has been notified. Free to Tender enabled." 
      });
      setAmount('');
      setCoverLetter('');
    } catch (err: any) {
      toast({ 
        title: "Error", 
        description: err.message, 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-primary/20 shadow-2xl overflow-hidden">
      <CardHeader className="bg-primary/5 border-b px-8 py-6">
        <div className="flex justify-between items-center mb-2">
           <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Gavel className="w-5 h-5 text-primary" />
            Submit Your Strategic Proposal
          </CardTitle>
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-accent text-[10px] font-bold tracking-widest uppercase border border-accent/20">
            <Waves className="w-3 h-3" /> Free to Tender
          </div>
        </div>
        <CardDescription>
          Outline your approach. We don't charge you to bid—we only monetize on the win.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Proposed Project Fee ($)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">$</span>
              <Input 
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 h-12 text-lg focus-visible:ring-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Execution Strategy & Cover Letter</label>
            <Textarea 
              placeholder="How will you secure the outcome? Why should the founder trust you with this mission-critical task?" 
              className="min-h-[200px] focus-visible:ring-primary text-base"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
            />
          </div>

          <div className="bg-accent/5 p-6 rounded-2xl border border-accent/20 flex gap-4 items-start">
            <ShieldCheck className="w-6 h-6 text-accent shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your proposal is visible only to the founder. If awarded, the adjudicated win fee will be managed autonomously by the AMO.
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl shadow-xl shadow-primary/30" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : (
              <span className="flex items-center gap-2">
                Launch Proposal <Send className="w-5 h-5" />
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
