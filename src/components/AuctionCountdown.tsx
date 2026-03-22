
'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuctionCountdownProps {
  endAt: number;
  onEnd?: () => void;
  className?: string;
}

export function AuctionCountdown({ endAt, onEnd, className }: AuctionCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = endAt - now;

      if (difference <= 0) {
        if (!timeLeft.expired) {
          onEnd?.();
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false,
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
      if (updated.expired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endAt, onEnd]);

  if (timeLeft.expired) {
    return (
      <div className={cn("text-destructive font-semibold flex items-center gap-1.5", className)}>
        <Clock className="w-4 h-4" />
        Auction Ended
      </div>
    );
  }

  const isEndingSoon = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes < 10;

  return (
    <div className={cn(
      "font-mono flex items-center gap-2 text-sm",
      isEndingSoon ? "text-destructive animate-pulse" : "text-primary",
      className
    )}>
      <Clock className="w-4 h-4" />
      <div className="flex gap-1">
        {timeLeft.days > 0 && <span>{timeLeft.days}d</span>}
        <span>{timeLeft.hours.toString().padStart(2, '0')}h</span>
        <span>{timeLeft.minutes.toString().padStart(2, '0')}m</span>
        <span>{timeLeft.seconds.toString().padStart(2, '0')}s</span>
      </div>
    </div>
  );
}
