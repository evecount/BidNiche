import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { AiOnboardingAssistant } from '@/components/AiOnboardingAssistant';
import Link from 'next/link';
import { Gavel, Heart, Mail, Twitter, Instagram, ArrowRight, Award } from 'lucide-react';

export const viewport: Viewport = {
  themeColor: '#4f46e5',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'RFPCentral | Outsource Mission-Critical Projects with Confidence',
    template: '%s | RFPCentral',
  },
  description: 'Providing founders with the "human-in-the-loop" expertise needed to navigate the agentic shift. Secure fractional capacity for marketing rollouts, roadshows, and AI orchestrations.',
  keywords: [
    'fractional capacity',
    'agentic shift',
    'outsource marketing',
    'startup founder tools',
    'mission critical projects',
    'human in the loop ai',
    'strategic outsourcing',
    'bidding marketplace',
    'vetted experts',
    'AI orchestration',
    'RFP marketplace',
  ],
  authors: [{ name: 'RFPCentral Team' }],
  creator: 'RFPCentral',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rfpcentral.com',
    title: 'RFPCentral | Navigating the Agentic Shift',
    description: 'Providing founders with the "human-in-the-loop" expertise needed to navigate the agentic shift.',
    siteName: 'RFPCentral',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RFPCentral | Navigating the Agentic Shift',
    description: 'Secure fractional capacity for mission-critical projects.',
    creator: '@rfpcentral',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        
        <footer className="border-t bg-card pt-20 pb-10 mt-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
              {/* Brand Section */}
              <div className="space-y-8">
                <Link href="/" className="flex items-center gap-2">
                  <div className="bg-primary p-2 rounded-xl shadow-xl shadow-primary/20">
                    <Gavel className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-headline font-extrabold text-2xl tracking-tighter text-primary">
                    RFPCentral
                  </span>
                </Link>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  Providing founders with "human-in-the-loop" expertise. Secure fractional capacity for mission-critical outcomes.
                </p>
                <div className="flex gap-5">
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                    <Instagram className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                    <Mail className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Founder Tools */}
              <div className="space-y-8">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Founder Hub</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><Link href="/auctions" className="hover:text-primary transition-colors flex items-center gap-2">Browse Roster Capacity <ArrowRight className="w-3 h-3" /></Link></li>
                  <li><Link href="/rfp/create" className="hover:text-primary transition-colors">Post Project RFP</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Escrow Protection</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Project Outcomes</Link></li>
                </ul>
              </div>

              {/* Expert Entry */}
              <div className="space-y-8">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Fractional Roster</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><Link href="/dashboard/create" className="hover:text-primary transition-colors">List Your Capacity</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Yield Optimization</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Vetting Standards</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Outcome Templates</Link></li>
                </ul>
              </div>

              {/* Company Section */}
              <div className="space-y-8">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Company</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><Link href="/about" className="hover:text-primary transition-colors">The Outcome Vision</Link></li>
                  <li><Link href="/attribution" className="font-bold text-primary hover:underline flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> Founders Attribution</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Terms of Engagement</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Privacy Protocols</Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                © {new Date().getFullYear()} RFPCentral. Navigating the Agentic Shift.
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground bg-muted/50 px-4 py-2 rounded-full border">
                Built with <Heart className="w-3.5 h-3.5 text-destructive fill-destructive animate-pulse" /> by the Founding Partners
              </div>
            </div>
          </div>
        </footer>

        <Toaster />
        <AiOnboardingAssistant />
      </body>
    </html>
  );
}
