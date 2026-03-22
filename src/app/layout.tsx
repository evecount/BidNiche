import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { AiOnboardingAssistant } from '@/components/AiOnboardingAssistant';
import Link from 'next/link';
import { Gavel, Heart, Mail, Twitter, Instagram, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'BidNiche | Elite Service Outcome Auctions',
  description: 'The world\'s first real-time bidding platform for packaged professional service outcomes. Ending the billable hour friction.',
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
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        
        <footer className="border-t bg-card pt-16 pb-8 mt-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              {/* Brand Section: The 'Who' and 'Why' */}
              <div className="space-y-6">
                <Link href="/" className="flex items-center gap-2">
                  <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20">
                    <Gavel className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-headline font-extrabold text-xl tracking-tight text-primary">
                    BidNiche
                  </span>
                </Link>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  The premier auction house for packaged service outcomes. We help elite experts maximize yield and founders secure guaranteed strategic delivery.
                </p>
                <div className="flex gap-4">
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Marketplace Section: Core Product Routes */}
              <div className="space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Marketplace</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><Link href="/auctions" className="hover:text-primary transition-colors">Browse Service Blocks</Link></li>
                  <li><Link href="/dashboard/create" className="hover:text-primary transition-colors">Auction Your Expertise</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Active Sprints</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Featured Experts</Link></li>
                </ul>
              </div>

              {/* Support Section: Trust-Building Links */}
              <div className="space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Support</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><Link href="#" className="hover:text-primary transition-colors">Expert Help Center</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Vetting Standards</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Escrow Protocols</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Platform Ethics</Link></li>
                </ul>
              </div>

              {/* Company Section: Brand Story and Legal */}
              <div className="space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Company</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><Link href="/about" className="hover:text-primary transition-colors">The Outcome Vision</Link></li>
                  <li><Link href="/attribution" className="font-bold text-primary hover:underline">Co-Founder Attribution</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Terms of Engagement</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} BidNiche. Disrupting the billable hour. A collaborative venture.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                Built with <Heart className="w-3 h-3 text-destructive fill-destructive" /> by the Founders
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
