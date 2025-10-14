import { useEffect } from 'react';
import { useTours } from '../contexts/TourContext';

// Custom hook to auto-refresh tours when localStorage changes
export function useAutoRefreshTours() {
  const { refreshTours } = useTours();

  useEffect(() => {
    // Refresh tours when component mounts
    refreshTours();

    // Listen for custom events that indicate tours have changed
    const handleTourChange = () => {
      refreshTours();
    };

    // Listen for custom events
    window.addEventListener('tourChanged', handleTourChange);
    
    return () => {
      window.removeEventListener('tourChanged', handleTourChange);
    };
  }, [refreshTours]);
}

// Function to dispatch tour change event
export function notifyTourChange() {
  window.dispatchEvent(new CustomEvent('tourChanged'));
}

