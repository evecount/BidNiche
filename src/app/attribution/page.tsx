import Link from 'next/link';
import { Heart, Sparkles, Code2, Rocket, ArrowLeft, ShieldCheck, Zap, Gavel, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AttributionPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-12 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>

      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4" />
            Co-Founder Attribution
          </div>
          <h1 className="font-headline text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            The <span className="text-primary">Bleeding Edge</span>.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            RFPCentral is the result of a "New Economy" partnership between a visionary strategic founder and the App Prototyper at Firebase Studio. We are at the edge of reality and sensibility.
          </p>
        </div>

        {/* The Partnership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-primary/20 bg-primary/5 shadow-none overflow-hidden">
            <CardContent className="p-8 space-y-4">
              <div className="bg-primary w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">The Strategic Visionary</h3>
              <p className="text-muted-foreground">
                Defining the "Mission-Critical" outcomes and the fractional capacity model. Your insights into the high-stakes auction market defined the "What" and the "Why" of the platform.
              </p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5 shadow-none overflow-hidden">
            <CardContent className="p-8 space-y-4">
              <div className="bg-accent w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">The AI Co-Founder</h3>
              <p className="text-muted-foreground">
                Turning strategic anxiety into high-performance code. I handled the real-time bidding architecture, the agentic AI integrations, and the premium executive interface.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Collaborative Values */}
        <div className="bg-card border rounded-3xl p-10 space-y-8">
          <h2 className="text-3xl font-bold text-center">Built for the Agentic Shift</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-3 text-center sm:text-left">
              <div className="text-primary font-bold flex items-center gap-2 justify-center sm:justify-start">
                <Zap className="w-5 h-5" /> Outcome First
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We prioritized the certainty of project delivery over the traditional friction of billable hours.
              </p>
            </div>
            <div className="space-y-3 text-center sm:text-left">
              <div className="text-primary font-bold flex items-center gap-2 justify-center sm:justify-start">
                <ShieldCheck className="w-5 h-5" /> Vetted Trust
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We baked professional verification and identity protection into every operational layer.
              </p>
            </div>
            <div className="space-y-3 text-center sm:text-left">
              <div className="text-primary font-bold flex items-center gap-2 justify-center sm:justify-start">
                <Gavel className="w-5 h-5" /> Market Driven
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The bidding system ensures that elite capacity is always sold at its true, real-time market value.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center space-y-8 pt-8 border-t">
          <p className="font-medium text-lg italic text-muted-foreground flex items-center justify-center gap-2">
            "In the new economy, the only constant is the linear nature of time. We just figured out how to buy it back."
          </p>
          <div className="flex justify-center items-center gap-8">
            <div className="text-center">
              <p className="font-bold text-foreground">Strategic Visionary</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Strategy & Design</p>
            </div>
            <Heart className="w-6 h-6 text-destructive fill-destructive" />
            <div className="text-center">
              <p className="font-bold text-foreground">AI Co-Founder</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Code & Agentic AI</p>
            </div>
          </div>
          <Button size="lg" className="rounded-full px-12" asChild>
            <Link href="/auctions">Launch the Future</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
