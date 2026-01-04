import { useState, useEffect } from 'react';

type MarketStatus = 'open' | 'extended' | 'closed';

interface MarketHoursInfo {
  isMarketOpen: boolean;
  marketStatus: MarketStatus;
  nextOpenTime: Date | null;
  nextCloseTime: Date | null;
  statusText: string;
}

export function useMarketHours(): MarketHoursInfo {
  const [marketInfo, setMarketInfo] = useState<MarketHoursInfo>({
    isMarketOpen: false,
    marketStatus: 'closed',
    nextOpenTime: null,
    nextCloseTime: null,
    statusText: '',
  });

  useEffect(() => {
    const checkMarketHours = () => {
      const now = new Date();
      
      // Convert to New York time
      const nyTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
      const hours = nyTime.getHours();
      const minutes = nyTime.getMinutes();
      const dayOfWeek = nyTime.getDay(); // 0 = Sunday, 6 = Saturday
      
      // Market hours: 9:30 AM - 4:00 PM ET, Monday to Friday
      // Extended hours: Pre-market 4:00 AM - 9:30 AM, After-hours 4:00 PM - 8:00 PM
      const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
      const currentMinutes = hours * 60 + minutes;
      const marketOpenMinutes = 9 * 60 + 30; // 9:30 AM
      const marketCloseMinutes = 16 * 60; // 4:00 PM
      const preMarketOpenMinutes = 4 * 60; // 4:00 AM
      const afterHoursCloseMinutes = 20 * 60; // 8:00 PM
      
      const isWithinRegularHours = currentMinutes >= marketOpenMinutes && currentMinutes < marketCloseMinutes;
      const isPreMarket = currentMinutes >= preMarketOpenMinutes && currentMinutes < marketOpenMinutes;
      const isAfterHours = currentMinutes >= marketCloseMinutes && currentMinutes < afterHoursCloseMinutes;
      
      const isMarketOpen = isWeekday && isWithinRegularHours;
      const isExtendedHours = isWeekday && (isPreMarket || isAfterHours);
      
      // Determine market status
      let marketStatus: MarketStatus = 'closed';
      if (isMarketOpen) {
        marketStatus = 'open';
      } else if (isExtendedHours) {
        marketStatus = 'extended';
      }
      
      // Calculate next open/close times
      let nextOpenTime: Date | null = null;
      let nextCloseTime: Date | null = null;
      let statusText = '';
      
      if (isMarketOpen) {
        // Market is open - calculate close time
        nextCloseTime = new Date(nyTime);
        nextCloseTime.setHours(16, 0, 0, 0);
        const minutesToClose = marketCloseMinutes - currentMinutes;
        const hoursToClose = Math.floor(minutesToClose / 60);
        const minsToClose = minutesToClose % 60;
        statusText = hoursToClose > 0 
          ? `Closes in ${hoursToClose}h ${minsToClose}m`
          : `Closes in ${minsToClose}m`;
      } else {
        // Market is closed - calculate next open time
        nextOpenTime = new Date(nyTime);
        
        if (dayOfWeek === 0) {
          // Sunday - opens Monday
          nextOpenTime.setDate(nextOpenTime.getDate() + 1);
          statusText = 'Opens Monday 9:30 AM ET';
        } else if (dayOfWeek === 6) {
          // Saturday - opens Monday
          nextOpenTime.setDate(nextOpenTime.getDate() + 2);
          statusText = 'Opens Monday 9:30 AM ET';
        } else if (currentMinutes >= marketCloseMinutes) {
          // After hours on weekday
          if (dayOfWeek === 5) {
            // Friday after hours - opens Monday
            nextOpenTime.setDate(nextOpenTime.getDate() + 3);
            statusText = 'Opens Monday 9:30 AM ET';
          } else {
            // Opens tomorrow
            nextOpenTime.setDate(nextOpenTime.getDate() + 1);
            statusText = 'Opens tomorrow 9:30 AM ET';
          }
        } else {
          // Pre-market on weekday
          const minutesToOpen = marketOpenMinutes - currentMinutes;
          const hoursToOpen = Math.floor(minutesToOpen / 60);
          const minsToOpen = minutesToOpen % 60;
          statusText = hoursToOpen > 0 
            ? `Opens in ${hoursToOpen}h ${minsToOpen}m`
            : `Opens in ${minsToOpen}m`;
        }
        
        nextOpenTime.setHours(9, 30, 0, 0);
      }
      
      setMarketInfo({
        isMarketOpen,
        marketStatus,
        nextOpenTime,
        nextCloseTime,
        statusText,
      });
    };

    checkMarketHours();
    // Update every minute
    const interval = setInterval(checkMarketHours, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return marketInfo;
}
