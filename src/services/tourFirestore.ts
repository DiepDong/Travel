import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { TourItem } from '../data/tours';

const COLLECTION_NAME = 'tours';

export class TourFirestore {
  /**
   * Save all tours to Firestore
   */
  static async saveTours(tours: TourItem[]): Promise<void> {
    try {
      // First, delete all existing tours
      const existingTours = await this.getAllTours();
      for (const tour of existingTours) {
        if (tour.id) {
          await deleteDoc(doc(db, COLLECTION_NAME, tour.id));
        }
      }
      
      // Then add all tours
      for (const tour of tours) {
        await addDoc(collection(db, COLLECTION_NAME), {
          ...tour,
          createdAt: tour.createdAt ? Timestamp.fromDate(new Date(tour.createdAt)) : Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }
      
      console.log('✅ Tours saved successfully to Firestore');
    } catch (error) {
      console.error('❌ Error saving tours:', error);
      throw error;
    }
  }

  /**
   * Load all tours from Firestore
   */
  static async loadTours(): Promise<TourItem[]> {
    try {
      const toursRef = collection(db, COLLECTION_NAME);
      const q = query(toursRef, orderBy('updatedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const tours: TourItem[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tours.push({
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
        } as TourItem);
      });
      
      console.log('✅ Loaded tours from Firestore:', tours.length);
      return tours;
    } catch (error) {
      console.error('❌ Error loading tours:', error);
      return [];
    }
  }

  /**
   * Add a new tour
   */
  static async addTour(tour: TourItem): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...tour,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      console.log('✅ Tour added successfully to Firestore:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('❌ Error adding tour:', error);
      throw error;
    }
  }

  /**
   * Update an existing tour
   */
  static async updateTour(updatedTour: TourItem): Promise<void> {
    if (!updatedTour.id) {
      throw new Error('Tour ID is required for update');
    }
    
    try {
      const tourRef = doc(db, COLLECTION_NAME, updatedTour.id);
      await updateDoc(tourRef, {
        ...updatedTour,
        updatedAt: Timestamp.now()
      });
      console.log('✅ Tour updated successfully in Firestore:', updatedTour.id);
    } catch (error) {
      console.error('❌ Error updating tour:', error);
      throw error;
    }
  }

  /**
   * Delete a tour
   */
  static async deleteTour(tourId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, tourId));
      console.log('✅ Tour deleted successfully from Firestore:', tourId);
    } catch (error) {
      console.error('❌ Error deleting tour:', error);
      throw error;
    }
  }

  /**
   * Get tour by ID
   */
  static async getTourById(id: string): Promise<TourItem | undefined> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          id: docSnap.id,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
        } as TourItem;
      }
      return undefined;
    } catch (error) {
      console.error('❌ Error getting tour by ID:', error);
      return undefined;
    }
  }

  /**
   * Get tour by slug
   */
  static async getTourBySlug(slug: string): Promise<TourItem | undefined> {
    const tours = await this.getAllTours();
    return tours.find(tour => tour.slug === slug);
  }

  /**
   * Get all tours
   */
  static async getAllTours(): Promise<TourItem[]> {
    return await this.loadTours();
  }

  /**
   * Get tours by region
   */
  static async getToursByRegion(region: string): Promise<TourItem[]> {
    const tours = await this.getAllTours();
    return tours.filter(tour => tour.region === region);
  }

  /**
   * Export tours as JSON
   */
  static async exportTours(): Promise<string> {
    const tours = await this.getAllTours();
    return JSON.stringify(tours, null, 2);
  }

  /**
   * Import tours from JSON
   */
  static async importTours(jsonData: string): Promise<boolean> {
    try {
      const tours = JSON.parse(jsonData);
      if (Array.isArray(tours)) {
        await this.saveTours(tours);
        return true;
      }
      return false;
    } catch (error) {
      console.error('❌ Error importing tours:', error);
      return false;
    }
  }

  /**
   * Clear all tours
   */
  static async clearAllTours(): Promise<void> {
    try {
      const tours = await this.getAllTours();
      for (const tour of tours) {
        if (tour.id) {
          await deleteDoc(doc(db, COLLECTION_NAME, tour.id));
        }
      }
      console.log('✅ All tours cleared from Firestore');
    } catch (error) {
      console.error('❌ Error clearing tours:', error);
      throw error;
    }
  }
}

