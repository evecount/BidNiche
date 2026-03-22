import { Auction, Bid, UserProfile, RFP, Proposal } from './types';
import { PlaceHolderImages } from './placeholder-images';

let auctions: Auction[] = [
  {
    id: 'ai-1',
    sellerId: 'user-seller-ai-1',
    sellerName: 'NeuralOps Architects',
    sellerRating: 5.0,
    sellerSales: 12,
    isVerified: true,
    title: 'Agentic Workflow Orchestration (3-Agent System)',
    description: 'Deploy a custom multi-agent system using LangGraph or CrewAI. Includes lead research agent, content generation agent, and quality audit agent specialized for your industry.',
    imageUrl: PlaceHolderImages[5].imageUrl,
    startingPrice: 8000,
    currentPrice: 9500,
    reservePrice: 12000,
    createdAt: Date.now() - 3600000,
    endAt: Date.now() + 259200000,
    status: 'active'
  },
  {
    id: 'ai-2',
    sellerId: 'user-seller-ai-2',
    sellerName: 'LogicStream AI',
    sellerRating: 4.9,
    sellerSales: 24,
    isVerified: true,
    title: 'Custom RAG Implementation & LLM Fine-Tuning',
    description: 'Connect your internal documentation to a private, secure LLM. Includes vector database setup (Pinecone/Weaviate) and custom system prompt engineering for proprietary data.',
    imageUrl: PlaceHolderImages[11].imageUrl,
    startingPrice: 6000,
    currentPrice: 7200,
    reservePrice: 8000,
    createdAt: Date.now() - 7200000,
    endAt: Date.now() + 172800000,
    status: 'active'
  },
  {
    id: '1',
    sellerId: 'user-seller-1',
    sellerName: 'FractionalCMO Group',
    sellerRating: 4.9,
    sellerSales: 42,
    isVerified: true,
    title: '1-Month Fractional CMO Strategy Block',
    description: 'A dedicated 20-hour outcome package including brand positioning, GTM strategy, and performance marketing oversight for Series A startups.',
    imageUrl: PlaceHolderImages[0].imageUrl,
    startingPrice: 5000,
    currentPrice: 6200,
    reservePrice: 7500,
    createdAt: Date.now() - 86400000,
    endAt: Date.now() + 172800000,
    status: 'active'
  },
  {
    id: '12',
    sellerId: 'user-seller-12',
    sellerName: 'ShortsFactory',
    sellerRating: 5.0,
    sellerSales: 156,
    isVerified: true,
    title: 'Short-Form Video Engine (30 Clips)',
    description: 'We turn your long-form podcasts or webinars into 30 high-drama YouTube Shorts/TikToks. Includes professional captions, B-roll, and sound design.',
    imageUrl: PlaceHolderImages[10].imageUrl,
    startingPrice: 1500,
    currentPrice: 1850,
    reservePrice: 2000,
    createdAt: Date.now() - 10000,
    endAt: Date.now() + 259200000,
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
    description: 'Stop guessing your runway. This 10-hour intensive audit delivers a full 18-month cashflow forecast and unit economics analysis.',
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
    description: 'Outsource your HR anxiety. We deliver a complete employee handbook, offer letters, payroll setup, and an automated onboarding flow.',
    imageUrl: PlaceHolderImages[7].imageUrl,
    startingPrice: 2500,
    currentPrice: 3100,
    reservePrice: 3500,
    createdAt: Date.now() - 30000,
    endAt: Date.now() + 172800000,
    status: 'active'
  }
];

let bids: Bid[] = [
  { id: 'b-ai-1', auctionId: 'ai-1', bidderId: 'b-101', bidderName: 'Global SaaS Co', amount: 9500, createdAt: Date.now() - 3600000 },
  { id: 'b1', auctionId: '1', bidderId: 'b-1', bidderName: 'TechScale Founders', amount: 6200, createdAt: Date.now() - 50000 },
  { id: 'b2', auctionId: '12', bidderId: 'b-2', bidderName: 'CreatorX Studio', amount: 1850, createdAt: Date.now() - 10000 },
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
  }
];

let proposals: Proposal[] = [];

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
