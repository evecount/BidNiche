
export type UserRole = 'buyer' | 'seller';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Auction {
  id: string;
  sellerId: string;
  sellerName: string;
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
