
import { Auction, Bid, UserProfile } from './types';
import { PlaceHolderImages } from './placeholder-images';

// We simulate a real-time reactive store for the mock implementation
let auctions: Auction[] = [
  {
    id: '1',
    sellerId: 'user-seller-1',
    sellerName: 'FractionalCMO Group',
    sellerRating: 4.9,
    sellerSales: 42,
    isVerified: true,
    title: '1-Month Fractional CMO Strategy Block',
    description: 'A dedicated 20-hour package including brand positioning, GTM strategy, and performance marketing oversight for Series A startups.',
    imageUrl: PlaceHolderImages[0].imageUrl,
    startingPrice: 5000,
    currentPrice: 6200,
    reservePrice: 7500,
    createdAt: Date.now() - 86400000,
    endAt: Date.now() + 172800000,
    status: 'active'
  },
  {
    id: '4',
    sellerId: 'user-seller-4',
    sellerName: 'Lexington Legal Partners',
    sellerRating: 5.0,
    sellerSales: 15,
    isVerified: true,
    title: 'General Counsel 40-Hour Retainer Block',
    description: 'High-level legal oversight for contract negotiations, IP strategy, and regulatory compliance. Perfect for scaling startups needing elite legal advice without the $1k/hr billable friction.',
    imageUrl: PlaceHolderImages[4].imageUrl,
    startingPrice: 12000,
    currentPrice: 14500,
    reservePrice: 15000,
    createdAt: Date.now() - 200000,
    endAt: Date.now() + 259200000, // 3 days
    status: 'active'
  },
  {
    id: '2',
    sellerId: 'user-seller-2',
    sellerName: 'PixelPerfect Labs',
    sellerRating: 5.0,
    sellerSales: 112,
    isVerified: true,
    title: 'High-Intensity 1-Week UX Design Sprint',
    description: 'Complete UI overhaul for a core product feature. Includes user research, wireframing, high-fidelity prototypes, and developer handoff.',
    imageUrl: PlaceHolderImages[1].imageUrl,
    startingPrice: 3500,
    currentPrice: 4800,
    reservePrice: 5000,
    createdAt: Date.now() - 43200000,
    endAt: Date.now() + 3600000, // 1 hour left
    status: 'active'
  },
  {
    id: '3',
    sellerId: 'user-seller-3',
    sellerName: 'CloudArchitects Elite',
    sellerRating: 4.8,
    sellerSales: 89,
    isVerified: true,
    title: 'Enterprise AI Infrastructure Audit',
    description: 'Deep-dive assessment of your current data pipeline and AI readiness. Full report with security, scalability, and cost optimization roadmap.',
    imageUrl: PlaceHolderImages[5].imageUrl,
    startingPrice: 8000,
    currentPrice: 8000,
    reservePrice: 10000,
    createdAt: Date.now() - 10000,
    endAt: Date.now() + 600000, // 10 mins left
    status: 'active'
  },
  {
    id: '5',
    sellerId: 'user-seller-5',
    sellerName: 'GrowthHackers Collective',
    sellerRating: 4.7,
    sellerSales: 215,
    isVerified: true,
    title: 'Q3 SEO & Content Growth Package',
    description: 'Full audit and strategy for the next quarter. Includes keyword mapping, technical SEO fix list, and 10 high-authority content outlines.',
    imageUrl: PlaceHolderImages[3].imageUrl,
    startingPrice: 4500,
    currentPrice: 4500,
    reservePrice: 6000,
    createdAt: Date.now() - 5000,
    endAt: Date.now() + 86400000 * 2, // 2 days
    status: 'active'
  }
];

let bids: Bid[] = [
  { id: 'b1', auctionId: '1', bidderId: 'b-1', bidderName: 'TechScale Inc', amount: 5500, createdAt: Date.now() - 50000 },
  { id: 'b2', auctionId: '1', bidderId: 'b-2', bidderName: 'Venture Partners', amount: 6200, createdAt: Date.now() - 10000 },
  { id: 'b4', auctionId: '4', bidderId: 'b-4', bidderName: 'NeoBank Corp', amount: 14500, createdAt: Date.now() - 5000 },
  { id: 'b3', auctionId: '2', bidderId: 'b-3', bidderName: 'SaaS Founder', amount: 4800, createdAt: Date.now() - 20000 },
];

export const getMockAuctions = async (): Promise<Auction[]> => {
  return [...auctions];
};

export const getMockAuction = async (id: string): Promise<Auction | undefined> => {
  return auctions.find(a => a.id === id);
};

export const getMockBids = async (auctionId: string): Promise<Bid[]> => {
  return bids.filter(b => b.auctionId === auctionId).sort((a, b) => b.amount - a.amount);
};

export const getMockUserAuctions = async (userId: string): Promise<Auction[]> => {
  return auctions.filter(a => a.sellerId === userId);
};

export const getMockUserBids = async (userId: string): Promise<(Bid & { auctionTitle: string })[]> => {
  return bids
    .filter(b => b.bidderId === userId)
    .map(b => ({
      ...b,
      auctionTitle: auctions.find(a => a.id === b.auctionId)?.title || 'Unknown Service'
    }))
    .sort((a, b) => b.createdAt - a.createdAt);
};

export const placeMockBid = async (auctionId: string, bidder: UserProfile, amount: number): Promise<void> => {
  const auction = auctions.find(a => a.id === auctionId);
  if (!auction) throw new Error('Service auction not found');
  if (auction.status === 'closed' || auction.endAt < Date.now()) throw new Error('Auction is closed');
  if (amount <= auction.currentPrice) throw new Error('Bid must be higher than current price');

  const newBid: Bid = {
    id: `b-${Date.now()}`,
    auctionId,
    bidderId: bidder.id,
    bidderName: bidder.name,
    amount,
    createdAt: Date.now()
  };

  bids.push(newBid);
  auction.currentPrice = amount;
};

export const createMockAuction = async (data: Omit<Auction, 'id' | 'currentPrice' | 'status' | 'createdAt' | 'sellerRating' | 'sellerSales' | 'isVerified'>): Promise<string> => {
  const id = `a-${Date.now()}`;
  const newAuction: Auction = {
    ...data,
    id,
    sellerRating: 5.0,
    sellerSales: 1,
    isVerified: true,
    currentPrice: data.startingPrice,
    status: 'active',
    createdAt: Date.now()
  };
  auctions.push(newAuction);
  return id;
};
