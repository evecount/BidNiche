import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { AiOnboardingAssistant } from '@/components/AiOnboardingAssistant';

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
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BidNiche Auction House. All rights reserved.
            </p>
          </div>
        </footer>
        <Toaster />
        <AiOnboardingAssistant />
      </body>
    </html>
  );
}
