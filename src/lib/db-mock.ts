
import { Auction, Bid, UserProfile, RFP, Proposal, AICorpusItem } from './types';
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
  }
];

let bids: Bid[] = [
  { id: 'b-ai-1', auctionId: 'ai-1', bidderId: 'b-101', bidderName: 'Global SaaS Co', amount: 9500, createdAt: Date.now() - 3600000 },
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

let aiCorpus: AICorpusItem[] = [
  {
    id: 'dna-1',
    userId: 'current-user',
    category: 'preference',
    content: 'The founder prefers ROI-first narratives over pure technical depth for board-level reporting.',
    source: 'Onboarding session',
    createdAt: Date.now() - 100000
  },
  {
    id: 'dna-2',
    userId: 'current-user',
    category: 'risk_appetite',
    content: 'High tolerance for early-stage agentic experiments, but requires strict human-in-the-loop for financial approvals.',
    source: 'Strategic session',
    createdAt: Date.now() - 50000
  }
];

export const getMockAuctions = async (): Promise<Auction[]> => [...auctions];
export const getMockAuction = async (id: string) => auctions.find(a => a.id === id);
export const getMockBids = async (auctionId: string) => bids.filter(b => b.auctionId === auctionId).sort((a, b) => b.amount - a.amount);
export const getMockRFPs = async () => [...rfps];
export const getMockRFP = async (id: string) => rfps.find(r => r.id === id);
export const getMockProposals = async (rfpId: string) => proposals.filter(p => p.rfpId === rfpId);

export const placeMockBid = async (auctionId: string, bidder: UserProfile, amount: number) => {
  const auction = auctions.find(a => a.id === auctionId);
  if (!auction) throw new Error('Auction not found');
  auction.currentPrice = amount;
  bids.push({ id: `b-${Date.now()}`, auctionId, bidderId: bidder.id, bidderName: bidder.name, amount, createdAt: Date.now() });
};

export const createMockAuction = async (data: any) => {
  const id = `a-${Date.now()}`;
  auctions.push({ ...data, id, status: 'active', createdAt: Date.now(), currentPrice: data.startingPrice, sellerRating: 5.0, sellerSales: 1, isVerified: true });
  return id;
};

export const createMockRFP = async (data: any) => {
  const id = `rfp-${Date.now()}`;
  rfps.push({ ...data, id, status: 'open', createdAt: Date.now() });
  return id;
};

export const submitProposal = async (data: any) => {
  const id = `p-${Date.now()}`;
  proposals.push({ ...data, id, createdAt: Date.now() });
  return id;
};

// AI Corpus functions
export const saveCorpusItem = async (data: Omit<AICorpusItem, 'id' | 'createdAt'>) => {
  const id = `dna-${Date.now()}`;
  aiCorpus.push({ ...data, id, createdAt: Date.now() });
  return id;
};

export const getCorpusItems = async (userId: string) => aiCorpus.filter(item => item.userId === userId).sort((a, b) => b.createdAt - a.createdAt);

export const getMockUserAuctions = async (userId: string) => auctions.filter(a => a.sellerId === userId);
export const getMockUserBids = async (userId: string) => bids.filter(b => b.bidderId === userId).map(b => ({ ...b, auctionTitle: auctions.find(a => a.id === b.auctionId)?.title || 'Outcome Block' }));
