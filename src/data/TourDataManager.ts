import { TourItem } from './tours';
import { TourFirestore } from '../services/tourFirestore';

// Hybrid data manager: Uses Firestore when available, falls back to localStorage
export class TourDataManager {
  private static STORAGE_KEY = 'travel_tours_data';
  private static useFirestore = false;

  /**
   * Check if Firestore is configured and use it
   */
  private static isFirestoreEnabled(): boolean {
    try {
      // Check if Firebase config has valid credentials
      // firebase.ts has hardcoded fallback values, so Firestore should always work
      // Only disable if explicitly in localStorage-only mode
      
      const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
      
      // If no env var, firebase.ts will use hardcoded fallback, so allow Firestore
      // If env var exists, check if it's valid Firebase key
      if (!apiKey) {
        // No env, but firebase.ts has hardcoded credentials, so allow
        return true;
      }
      
      // Has env var - check if it's valid
      const isDemoKey = apiKey === 'demo-key';
      const isValid = apiKey.includes('AIza'); // Firebase API keys start with AIza
      
      return !isDemoKey && isValid;
    } catch {
      return false;
    }
  }

  static async saveTours(tours: TourItem[]): Promise<void> {
    if (this.isFirestoreEnabled()) {
      try {
        await TourFirestore.saveTours(tours);
      } catch (error) {
        console.error('Failed to save to Firestore, falling back to localStorage:', error);
        this.saveToursLocal(tours);
      }
    } else {
      this.saveToursLocal(tours);
    }
  }

  private static saveToursLocal(tours: TourItem[]): void {
    try {
      console.log('💾 Saving tours to localStorage:', tours.length);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tours));
      console.log('✅ Tours saved successfully to localStorage');
    } catch (error) {
      console.error('❌ Error saving tours:', error);
    }
  }

  static async loadTours(): Promise<TourItem[]> {
    if (this.isFirestoreEnabled()) {
      try {
        return await TourFirestore.loadTours();
      } catch (error) {
        console.error('Failed to load from Firestore, falling back to localStorage:', error);
        return this.loadToursLocal();
      }
    } else {
      return this.loadToursLocal();
    }
  }

  private static loadToursLocal(): TourItem[] {
    try {
      // Migrate legacy storage key if needed
      const legacy = localStorage.getItem('tours');
      if (legacy) {
        localStorage.setItem(this.STORAGE_KEY, legacy);
        localStorage.removeItem('tours');
      }
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('❌ Error loading tours:', error);
    }
    return [];
  }

  static async addTour(tour: TourItem): Promise<void> {
    if (this.isFirestoreEnabled()) {
      try {
        await TourFirestore.addTour(tour);
      } catch (error) {
        console.error('Failed to add to Firestore, falling back to localStorage:', error);
        this.addTourLocal(tour);
      }
    } else {
      this.addTourLocal(tour);
    }
  }

  private static addTourLocal(tour: TourItem): void {
    const tours = this.loadToursLocal();
    tours.push(tour);
    this.saveToursLocal(tours);
  }

  static async updateTour(updatedTour: TourItem): Promise<void> {
    if (this.isFirestoreEnabled()) {
      try {
        await TourFirestore.updateTour(updatedTour);
      } catch (error) {
        console.error('Failed to update in Firestore, falling back to localStorage:', error);
        this.updateTourLocal(updatedTour);
      }
    } else {
      this.updateTourLocal(updatedTour);
    }
  }

  private static updateTourLocal(updatedTour: TourItem): void {
    const tours = this.loadToursLocal();
    const index = tours.findIndex(tour => tour.id === updatedTour.id);
    if (index !== -1) {
      tours[index] = updatedTour;
      this.saveToursLocal(tours);
    }
  }

  static async deleteTour(tourId: string): Promise<void> {
    if (this.isFirestoreEnabled()) {
      try {
        await TourFirestore.deleteTour(tourId);
      } catch (error) {
        console.error('Failed to delete from Firestore, falling back to localStorage:', error);
        this.deleteTourLocal(tourId);
      }
    } else {
      this.deleteTourLocal(tourId);
    }
  }

  private static deleteTourLocal(tourId: string): void {
    const tours = this.loadToursLocal();
    console.log('🗑️ Tours before deletion:', tours.length);
    const filteredTours = tours.filter(tour => tour.id !== tourId);
    console.log('✅ Tours after deletion:', filteredTours.length);
    this.saveToursLocal(filteredTours);
    console.log('✅ Tour deleted successfully from localStorage');
  }

  static async getTourById(id: string): Promise<TourItem | undefined> {
    if (this.isFirestoreEnabled()) {
      try {
        return await TourFirestore.getTourById(id);
      } catch (error) {
        console.error('Failed to get from Firestore, falling back to localStorage:', error);
        return this.getTourByIdLocal(id);
      }
    } else {
      return this.getTourByIdLocal(id);
    }
  }

  private static getTourByIdLocal(id: string): TourItem | undefined {
    const tours = this.loadToursLocal();
    return tours.find(tour => tour.id === id);
  }

  static async getTourBySlug(slug: string): Promise<TourItem | undefined> {
    if (this.isFirestoreEnabled()) {
      try {
        return await TourFirestore.getTourBySlug(slug);
      } catch (error) {
        console.error('Failed to get from Firestore, falling back to localStorage:', error);
        return this.getTourBySlugLocal(slug);
      }
    } else {
      return this.getTourBySlugLocal(slug);
    }
  }

  private static getTourBySlugLocal(slug: string): TourItem | undefined {
    const tours = this.loadToursLocal();
    return tours.find(tour => tour.slug === slug);
  }

  static async getAllTours(): Promise<TourItem[]> {
    return await this.loadTours();
  }

  static async exportTours(): Promise<string> {
    if (this.isFirestoreEnabled()) {
      try {
        return await TourFirestore.exportTours();
      } catch (error) {
        console.error('Failed to export from Firestore, falling back to localStorage:', error);
        return this.exportToursLocal();
      }
    } else {
      return this.exportToursLocal();
    }
  }

  private static exportToursLocal(): string {
    const tours = this.loadToursLocal();
    return JSON.stringify(tours, null, 2);
  }

  static async importTours(jsonData: string): Promise<boolean> {
    if (this.isFirestoreEnabled()) {
      try {
        return await TourFirestore.importTours(jsonData);
      } catch (error) {
        console.error('Failed to import to Firestore, falling back to localStorage:', error);
        return this.importToursLocal(jsonData);
      }
    } else {
      return this.importToursLocal(jsonData);
    }
  }

  private static importToursLocal(jsonData: string): boolean {
    try {
      const tours = JSON.parse(jsonData);
      if (Array.isArray(tours)) {
        this.saveToursLocal(tours);
        return true;
      }
    } catch (error) {
      console.error('❌ Error importing tours:', error);
    }
    return false;
  }

  static async clearAllTours(): Promise<void> {
    if (this.isFirestoreEnabled()) {
      try {
        await TourFirestore.clearAllTours();
      } catch (error) {
        console.error('Failed to clear from Firestore, falling back to localStorage:', error);
        this.clearAllToursLocal();
      }
    } else {
      this.clearAllToursLocal();
    }
  }

  private static clearAllToursLocal(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static async getToursByRegion(region: string): Promise<TourItem[]> {
    if (this.isFirestoreEnabled()) {
      try {
        return await TourFirestore.getToursByRegion(region);
      } catch (error) {
        console.error('Failed to get from Firestore, falling back to localStorage:', error);
        return this.getToursByRegionLocal(region);
      }
    } else {
      return this.getToursByRegionLocal(region);
    }
  }

  private static getToursByRegionLocal(region: string): TourItem[] {
    const tours = this.loadToursLocal();
    return tours.filter(tour => tour.region === region);
  }
}
