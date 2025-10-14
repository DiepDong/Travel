import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTours } from '../contexts/TourContext';

// Hook to refresh tours when navigating between pages
export function useNavigationRefresh() {
  const location = useLocation();
  const { refreshTours } = useTours();

  useEffect(() => {
    // Only refresh if we have tours data, don't refresh on initial load
    const timeoutId = setTimeout(() => {
      refreshTours();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [location.pathname, refreshTours]);
}
