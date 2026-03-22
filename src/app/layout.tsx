
import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { AiOnboardingAssistant } from '@/components/AiOnboardingAssistant';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'BidNiche | Premium Real-Time Auction Marketplace',
  description: 'The world\'s most trusted real-time bidding platform for unique collectibles.',
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
        <footer className="border-t bg-card py-12 mt-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} BidNiche Auction House. All rights reserved.
              </p>
              <div className="flex items-center gap-8">
                <Link href="/attribution" className="text-sm font-bold text-primary hover:underline flex items-center gap-2">
                  <span>Our Story & Attribution</span>
                </Link>
                <div className="flex gap-4 text-xs text-muted-foreground font-medium uppercase tracking-widest">
                  <span>Terms</span>
                  <span>Privacy</span>
                  <span>Contact</span>
                </div>
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
