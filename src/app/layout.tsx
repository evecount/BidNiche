import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { AiOnboardingAssistant } from '@/components/AiOnboardingAssistant';
import Link from 'next/link';
import { Gavel, Heart, Mail, Twitter, Instagram, Globe, Award, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'BidNiche | Elite Strategic Outcome Auctions',
  description: 'The world\'s premier roster for packaged professional service outcomes. Ending the billable hour friction for global founders.',
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
              {/* Brand Section: The 'Who' and 'Why' */}
              <div className="space-y-8">
                <Link href="/" className="flex items-center gap-2">
                  <div className="bg-primary p-2 rounded-xl shadow-xl shadow-primary/20">
                    <Gavel className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-headline font-extrabold text-2xl tracking-tighter text-primary">
                    BidNiche
                  </span>
                </Link>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  The premier outcome roster. We vet the world's most talented independent experts so founders can secure guaranteed strategic capacity in minutes.
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

              {/* Founder Tools: Client-Facing Routes */}
              <div className="space-y-8">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Founder Hub</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><Link href="/auctions" className="hover:text-primary transition-colors flex items-center gap-2">Browse Expert Roster <ArrowRight className="w-3 h-3" /></Link></li>
                  <li><Link href="/rfp/create" className="hover:text-primary transition-colors">Post Strategic RFP</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Escrow Protection</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Client Case Studies</Link></li>
                </ul>
              </div>

              {/* Expert Entry: Supply-Side Routes */}
              <div className="space-y-8">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Expert Roster</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><Link href="/dashboard/create" className="hover:text-primary transition-colors">Apply for Roster</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Yield Optimization</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Vetting Standards</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Outcome Templates</Link></li>
                </ul>
              </div>

              {/* Company Section: Brand Story and Legal */}
              <div className="space-y-8">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Company</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><Link href="/about" className="hover:text-primary transition-colors">The Outcome Vision</Link></li>
                  <li><Link href="/attribution" className="font-bold text-primary hover:underline flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> Co-Founder Attribution</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Terms of Engagement</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Privacy Protocols</Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                © {new Date().getFullYear()} BidNiche. Ending the Billable Hour. Vetted Roster Model.
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
