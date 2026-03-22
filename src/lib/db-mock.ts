
import { Auction, Bid, UserProfile, RFP, Proposal } from './types';
import { PlaceHolderImages } from './placeholder-images';

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
    description: 'High-level legal oversight for contract negotiations, IP strategy, and regulatory compliance.',
    imageUrl: PlaceHolderImages[4].imageUrl,
    startingPrice: 12000,
    currentPrice: 14500,
    reservePrice: 15000,
    createdAt: Date.now() - 200000,
    endAt: Date.now() + 259200000, 
    status: 'active'
  }
];

let bids: Bid[] = [
  { id: 'b1', auctionId: '1', bidderId: 'b-1', bidderName: 'TechScale Inc', amount: 5500, createdAt: Date.now() - 50000 },
];

let rfps: RFP[] = [
  {
    id: 'rfp-1',
    buyerId: 'buyer-1',
    buyerName: 'Stealth AI Startup',
    title: 'Infrastructure Architecture for LLM Scaling',
    description: 'We need an elite DevOps architect to design our multi-region Kubernetes deployment specifically for GPU-intensive workloads.',
    budgetRange: '$15k - $25k',
    timeline: '3 Weeks',
    status: 'open',
    createdAt: Date.now() - 43200000,
    expiresAt: Date.now() + 86400000,
    aiAssessment: 'High-complexity infrastructure task. Requires AWS/GCP elite certification and CUDA optimization experience.'
  }
];

let proposals: Proposal[] = [
  {
    id: 'p-1',
    rfpId: 'rfp-1',
    expertId: 'expert-1',
    expertName: 'CloudArchitects Elite',
    amount: 18000,
    coverLetter: 'We have built similar pipelines for three YC companies in the last year.',
    createdAt: Date.now() - 10000
  }
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

export const getMockRFPs = async (): Promise<RFP[]> => {
  return [...rfps];
};

export const getMockRFP = async (id: string): Promise<RFP | undefined> => {
  return rfps.find(r => r.id === id);
};

export const getMockProposals = async (rfpId: string): Promise<Proposal[]> => {
  return proposals.filter(p => p.rfpId === rfpId).sort((a, b) => a.amount - b.amount);
};

export const placeMockBid = async (auctionId: string, bidder: UserProfile, amount: number): Promise<void> => {
  const auction = auctions.find(a => a.id === auctionId);
  if (!auction) throw new Error('Service auction not found');
  auction.currentPrice = amount;
  bids.push({ id: `b-${Date.now()}`, auctionId, bidderId: bidder.id, bidderName: bidder.name, amount, createdAt: Date.now() });
};

export const createMockAuction = async (data: any): Promise<string> => {
  const id = `a-${Date.now()}`;
  auctions.push({ ...data, id, status: 'active', createdAt: Date.now(), currentPrice: data.startingPrice, sellerRating: 5.0, sellerSales: 1, isVerified: true });
  return id;
};

export const createMockRFP = async (data: Omit<RFP, 'id' | 'status' | 'createdAt'>): Promise<string> => {
  const id = `rfp-${Date.now()}`;
  rfps.push({ ...data, id, status: 'open', createdAt: Date.now() });
  return id;
};

export const submitProposal = async (data: Omit<Proposal, 'id' | 'createdAt'>): Promise<string> => {
  const id = `p-${Date.now()}`;
  proposals.push({ ...data, id, createdAt: Date.now() });
  return id;
};

export const getMockUserAuctions = async (userId: string) => auctions.filter(a => a.sellerId === userId);
export const getMockUserBids = async (userId: string) => bids.filter(b => b.bidderId === userId).map(b => ({ ...b, auctionTitle: auctions.find(a => a.id === b.auctionId)?.title || 'Service' }));
