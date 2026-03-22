'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gavel, Plus, User, Search, Menu, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Services', href: '/auctions', icon: Search },
    { name: 'Bounties', href: '/rfp', icon: FileText },
    { name: 'Post Outcome', href: '/dashboard/create', icon: Plus },
    { name: 'Operational Hub', href: '/dashboard', icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20">
            <Gavel className="w-6 h-6 text-white" />
          </div>
          <span className="font-headline font-extrabold text-2xl tracking-tight text-primary">
            RFPCentral
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
          <Button variant="outline" className="rounded-full px-6 border-accent text-accent hover:bg-accent hover:text-white transition-all font-bold" asChild>
            <Link href="/rfp/create">Submit RFP</Link>
          </Button>
        </div>

        {/* Mobile Nav Toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
                pathname === item.href ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
          <Button className="w-full rounded-full bg-accent hover:bg-accent/90" asChild>
            <Link href="/rfp/create">Post Project RFP</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
