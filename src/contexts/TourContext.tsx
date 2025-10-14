import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TourItem, tours as defaultTours } from '../data/tours';
import { TourDataManager } from '../data/TourDataManager';

interface TourContextType {
  tours: TourItem[];
  loading: boolean;
  refreshTours: () => void;
  addTour: (tour: TourItem) => void;
  updateTour: (tour: TourItem) => void;
  deleteTour: (id: string) => void;
  getTourBySlug: (slug: string) => TourItem | undefined;
  forceRefresh: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export function TourProvider({ children }: { children: ReactNode }) {
  const [tours, setTours] = useState<TourItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshTours = () => {
    setLoading(true);
    try {
      const savedTours = TourDataManager.loadTours();
      console.log('RefreshTours - Loaded tours from localStorage:', savedTours.length);
      
      // Simply set the tours from localStorage without adding default tours
      // This prevents deleted tours from being restored
      setTours(savedTours);
    } catch (error) {
      console.error('Error loading tours:', error);
      // Fallback to default tours on error
      setTours(defaultTours);
    } finally {
      setLoading(false);
    }
  };

  const addTour = (tour: TourItem) => {
    TourDataManager.addTour(tour);
    setTours(prev => [...prev, tour]);
    // Notify other components
    window.dispatchEvent(new CustomEvent('tourChanged'));
  };

  const updateTour = (tour: TourItem) => {
    TourDataManager.updateTour(tour);
    setTours(prev => prev.map(t => t.id === tour.id ? tour : t));
    // Notify other components
    window.dispatchEvent(new CustomEvent('tourChanged'));
  };

  const deleteTour = (id: string) => {
    console.log('Deleting tour with id:', id);
    TourDataManager.deleteTour(id);
    setTours(prev => {
      const filtered = prev.filter(t => t.id !== id);
      console.log('Tours after deletion:', filtered.length);
      return filtered;
    });
    // Notify other components
    window.dispatchEvent(new CustomEvent('tourChanged'));
  };

  const forceRefresh = () => {
    // Force reload from default tours (useful for development)
    setTours(defaultTours);
    TourDataManager.saveTours(defaultTours);
    window.dispatchEvent(new CustomEvent('tourChanged'));
  };

  const getTourBySlug = (slug: string) => {
    return tours.find(tour => tour.slug === slug);
  };

  useEffect(() => {
    refreshTours();

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'travel_tours_data' && e.newValue !== e.oldValue) {
        console.log('Storage change detected, refreshing tours...');
        refreshTours();
      }
    };

    // Listen for window focus to refresh data (disabled for now)
    // const handleFocus = () => {
    //   refreshTours();
    // };

    window.addEventListener('storage', handleStorageChange);
    // window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      // window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <TourContext.Provider value={{
      tours,
      loading,
      refreshTours,
      addTour,
      updateTour,
      deleteTour,
      getTourBySlug,
      forceRefresh
    }}>
      {children}
    </TourContext.Provider>
  );
}

export function useTours() {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTours must be used within a TourProvider');
  }
  return context;
}
