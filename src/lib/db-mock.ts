
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
    description: 'A dedicated 20-hour outcome package including brand positioning, GTM strategy, and performance marketing oversight for Series A startups. Secure the expertise you need to scale without the full-time overhead.',
    imageUrl: PlaceHolderImages[0].imageUrl,
    startingPrice: 5000,
    currentPrice: 6200,
    reservePrice: 7500,
    createdAt: Date.now() - 86400000,
    endAt: Date.now() + 172800000,
    status: 'active'
  },
  {
    id: '2',
    sellerId: 'user-seller-2',
    sellerName: 'Vantage CFO Partners',
    sellerRating: 5.0,
    sellerSales: 18,
    isVerified: true,
    title: 'Fractional CFO: Cashflow & Burn Audit',
    description: 'Stop guessing your runway. This 10-hour intensive audit delivers a full 18-month cashflow forecast, unit economics analysis, and burn rate optimization roadmap. Perfect for founders prepping for a bridge round.',
    imageUrl: PlaceHolderImages[6].imageUrl,
    startingPrice: 3500,
    currentPrice: 4200,
    reservePrice: 4500,
    createdAt: Date.now() - 50000,
    endAt: Date.now() + 259200000,
    status: 'active'
  },
  {
    id: '3',
    sellerId: 'user-seller-3',
    sellerName: 'PeopleFirst Ops',
    sellerRating: 4.8,
    sellerSales: 25,
    isVerified: true,
    title: 'HR Infrastructure Sprint: Scale 5 to 20',
    description: 'Outsource your HR anxiety. We deliver a complete employee handbook, state-compliant offer letters, payroll setup, and an automated onboarding flow in a 15-hour capacity block.',
    imageUrl: PlaceHolderImages[7].imageUrl,
    startingPrice: 2500,
    currentPrice: 3100,
    reservePrice: 3500,
    createdAt: Date.now() - 30000,
    endAt: Date.now() + 172800000,
    status: 'active'
  },
  {
    id: '10',
    sellerId: 'user-seller-10',
    sellerName: 'Growth Engine Sales',
    sellerRating: 4.9,
    sellerSales: 34,
    isVerified: true,
    title: 'Outbound Sales Machine: 40-Hour Sprint',
    description: 'We build your outbound sales motion from scratch. Includes lead list building (500 qualified leads), email sequence design, and SDR training. Guaranteed lead-gen infrastructure for B2B startups.',
    imageUrl: PlaceHolderImages[9].imageUrl,
    startingPrice: 4500,
    currentPrice: 5100,
    reservePrice: 5500,
    createdAt: Date.now() - 100000,
    endAt: Date.now() + 345600000,
    status: 'active'
  },
  {
    id: '11',
    sellerId: 'user-seller-11',
    sellerName: 'Veritas PR',
    sellerRating: 5.0,
    sellerSales: 21,
    isVerified: true,
    title: 'Product Launch Communications Block',
    description: '15 hours of direct PR capacity. Includes drafting your announcement press release, journalist list curation, and 3 high-impact media pitches. Secure the narrative for your next launch.',
    imageUrl: PlaceHolderImages[10].imageUrl,
    startingPrice: 3000,
    currentPrice: 3800,
    reservePrice: 4000,
    createdAt: Date.now() - 200000,
    endAt: Date.now() + 518400000,
    status: 'active'
  },
  {
    id: '4',
    sellerId: 'user-seller-4',
    sellerName: 'Lexington Strategic Advisors',
    sellerRating: 5.0,
    sellerSales: 15,
    isVerified: true,
    title: 'Series A Investor Roadshow Preparation',
    description: 'Mission-critical capacity for founders preparing for a Series A raise. Includes pitch deck narrative audit, financial model stress-testing, and 10 hours of direct executive coaching. Outsource your roadshow anxiety.',
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
  { id: 'b1', auctionId: '1', bidderId: 'b-1', bidderName: 'TechScale Founders', amount: 6200, createdAt: Date.now() - 50000 },
  { id: 'b2', auctionId: '10', bidderId: 'b-2', bidderName: 'VentureReady SaaS', amount: 5100, createdAt: Date.now() - 100000 },
];

let rfps: RFP[] = [
  {
    id: 'rfp-1',
    buyerId: 'buyer-1',
    buyerName: 'Stealth AI Startup',
    title: 'Multi-Region Kubernetes Scaling Project',
    description: 'We need a strategic operator to design our multi-region Kubernetes deployment specifically for GPU-intensive workloads.',
    budgetRange: '$15k - $25k',
    timeline: '3 Weeks',
    status: 'open',
    createdAt: Date.now() - 43200000,
    expiresAt: Date.now() + 86400000,
    aiAssessment: 'Mission-critical infrastructure task. Requires AWS/GCP certification and CUDA optimization experience.'
  },
  {
    id: 'rfp-2',
    buyerId: 'buyer-2',
    buyerName: 'Series B FinTech',
    title: 'Regulatory Compliance & SOC2 Readiness',
    description: 'Need a fractional compliance officer to lead our SOC2 Type 2 audit preparation and vendor risk management framework.',
    budgetRange: '$20k - $40k',
    timeline: '2 Months',
    status: 'open',
    createdAt: Date.now() - 21600000,
    expiresAt: Date.now() + 604800000,
    aiAssessment: 'High-stakes compliance audit. Requires experience in FinTech regulatory environments and SOC2 frameworks.'
  }
];

let proposals: Proposal[] = [
  {
    id: 'p-1',
    rfpId: 'rfp-1',
    expertId: 'expert-1',
    expertName: 'CloudArchitects Group',
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
  if (!auction) throw new Error('Strategic outcome not found');
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
export const getMockUserBids = async (userId: string) => bids.filter(b => b.bidderId === userId).map(b => ({ ...b, auctionTitle: auctions.find(a => a.id === b.auctionId)?.title || 'Outcome Block' }));
