import { TourItem } from './tours';

// Simple localStorage-based data management
export class TourDataManager {
  private static STORAGE_KEY = 'travel_tours_data';

  static saveTours(tours: TourItem[]): void {
    try {
      console.log('Saving tours to localStorage:', tours.length);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tours));
      console.log('Tours saved successfully to localStorage');
    } catch (error) {
      console.error('Error saving tours:', error);
    }
  }

  static loadTours(): TourItem[] {
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
      console.error('Error loading tours:', error);
    }
    return [];
  }

  static addTour(tour: TourItem): void {
    const tours = this.loadTours();
    tours.push(tour);
    this.saveTours(tours);
  }

  static updateTour(updatedTour: TourItem): void {
    const tours = this.loadTours();
    const index = tours.findIndex(tour => tour.id === updatedTour.id);
    if (index !== -1) {
      tours[index] = updatedTour;
      this.saveTours(tours);
    }
  }

  static deleteTour(tourId: string): void {
    const tours = this.loadTours();
    console.log('Tours before deletion:', tours.length);
    const filteredTours = tours.filter(tour => tour.id !== tourId);
    console.log('Tours after deletion:', filteredTours.length);
    this.saveTours(filteredTours);
    console.log('Tour deleted successfully from localStorage');
  }

  static getTourById(id: string): TourItem | undefined {
    const tours = this.loadTours();
    return tours.find(tour => tour.id === id);
  }

  static getTourBySlug(slug: string): TourItem | undefined {
    const tours = this.loadTours();
    return tours.find(tour => tour.slug === slug);
  }

  static getAllTours(): TourItem[] {
    return this.loadTours();
  }

  static exportTours(): string {
    const tours = this.loadTours();
    return JSON.stringify(tours, null, 2);
  }

  static importTours(jsonData: string): boolean {
    try {
      const tours = JSON.parse(jsonData);
      if (Array.isArray(tours)) {
        this.saveTours(tours);
        return true;
      }
    } catch (error) {
      console.error('Error importing tours:', error);
    }
    return false;
  }

  static clearAllTours(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static getToursByRegion(region: string): TourItem[] {
    const tours = this.loadTours();
    return tours.filter(tour => tour.region === region);
  }
}
