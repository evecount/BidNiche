
export type UserRole = 'buyer' | 'seller';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface AICorpusItem {
  id: string;
  userId: string;
  category: 'preference' | 'fact' | 'risk_appetite' | 'technical_debt' | 'past_win';
  content: string;
  source: string;
  createdAt: number;
}

export interface Auction {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  sellerSales: number;
  isVerified: boolean;
  title: string;
  description: string;
  imageUrl: string;
  startingPrice: number;
  currentPrice: number;
  reservePrice: number;
  createdAt: number;
  endAt: number;
  status: 'active' | 'closed';
  winnerId?: string;
  winnerName?: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  createdAt: number;
}

export interface RFP {
  id: string;
  buyerId: string;
  buyerName: string;
  title: string;
  description: string;
  budgetRange: string;
  timeline: string;
  status: 'open' | 'awarded' | 'closed';
  createdAt: number;
  expiresAt: number;
  aiAssessment?: string;
}

export interface Proposal {
  id: string;
  rfpId: string;
  expertId: string;
  expertName: string;
  amount: number;
  coverLetter: string;
  createdAt: number;
}
