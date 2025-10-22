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
      
      // Always use tours from localStorage, even if empty
      // This allows users to delete all tours if they want
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
    console.log('TourContext - Deleting tour with id:', id);
    console.log('TourContext - Tours before deletion:', tours.length);
    TourDataManager.deleteTour(id);
    setTours(prev => {
      const filtered = prev.filter(t => t.id !== id);
      console.log('TourContext - Tours after deletion:', filtered.length);
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
    // Always load from localStorage, never auto-initialize with default tours
    refreshTours();

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'travel_tours_data' && e.newValue !== e.oldValue) {
        console.log('Storage change detected, refreshing tours...');
        refreshTours();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
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
