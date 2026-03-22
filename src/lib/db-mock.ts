
import { Auction, Bid, UserProfile } from './types';
import { PlaceHolderImages } from './placeholder-images';

// We simulate a real-time reactive store for the mock implementation
let auctions: Auction[] = [
  {
    id: '1',
    sellerId: 'user-seller-1',
    sellerName: 'Global Collectibles',
    title: 'Vintage 1960s Leica M3 Camera',
    description: 'A beautifully preserved Leica M3 from 1962. Minimal wear, fully functional shutter speeds. A collector\'s dream.',
    imageUrl: PlaceHolderImages[3].imageUrl,
    startingPrice: 1500,
    currentPrice: 1850,
    reservePrice: 2000,
    createdAt: Date.now() - 86400000,
    endAt: Date.now() + 172800000,
    status: 'active'
  },
  {
    id: '2',
    sellerId: 'user-seller-2',
    sellerName: 'Retro Wheels',
    title: '1974 Porsche 911 Carrera',
    description: 'Fully restored 911 Carrera in guards red. 45,000 original miles. Showroom condition.',
    imageUrl: PlaceHolderImages[1].imageUrl,
    startingPrice: 45000,
    currentPrice: 52000,
    reservePrice: 60000,
    createdAt: Date.now() - 43200000,
    endAt: Date.now() + 3600000, // 1 hour left
    status: 'active'
  },
  {
    id: '3',
    sellerId: 'user-seller-1',
    sellerName: 'Global Collectibles',
    title: 'Handmade Swiss Chronograph',
    description: 'Exquisite timepiece with 72-hour power reserve. Sapphire crystal, genuine leather strap.',
    imageUrl: PlaceHolderImages[0].imageUrl,
    startingPrice: 2500,
    currentPrice: 2500,
    reservePrice: 3000,
    createdAt: Date.now() - 10000,
    endAt: Date.now() + 600000, // 10 mins left
    status: 'active'
  }
];

let bids: Bid[] = [
  { id: 'b1', auctionId: '1', bidderId: 'b-1', bidderName: 'John Doe', amount: 1600, createdAt: Date.now() - 50000 },
  { id: 'b2', auctionId: '1', bidderId: 'b-2', bidderName: 'Jane Smith', amount: 1850, createdAt: Date.now() - 10000 },
  { id: 'b3', auctionId: '2', bidderId: 'b-3', bidderName: 'Car Enthusiast', amount: 52000, createdAt: Date.now() - 20000 },
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

export const placeMockBid = async (auctionId: string, bidder: UserProfile, amount: number): Promise<void> => {
  const auction = auctions.find(a => a.id === auctionId);
  if (!auction) throw new Error('Auction not found');
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

export const createMockAuction = async (data: Omit<Auction, 'id' | 'currentPrice' | 'status' | 'createdAt'>): Promise<string> => {
  const id = `a-${Date.now()}`;
  const newAuction: Auction = {
    ...data,
    id,
    currentPrice: data.startingPrice,
    status: 'active',
    createdAt: Date.now()
  };
  auctions.push(newAuction);
  return id;
};
