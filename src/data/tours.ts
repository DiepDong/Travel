export type ItineraryItem = {
  time: string;
  activity: string;
  description?: string;
  images?: string[]; // Multiple images
  imageCaption?: string; // Caption for images
  dayTitle?: string; // "NGÀY 1", "NGÀY 2", etc.
  periodTitle?: string; // "Sáng:", "Chiều:", etc.
  locationTitle?: string; // Location name in blue
};

// Allow legacy data entries that store itinerary as plain strings
export type ItineraryEntry = string | ItineraryItem;

export type TourItem = {
  id?: string;
  slug: string;
  title: string;
  region: 'BinhDinh' | 'MienTrungTayNguyen' | 'MienNam' | 'MienBac';
  image: string;
  price?: string;
  duration: string;
  transport: string;
  summary: string;
  itinerary: ItineraryEntry[]; // Accepts both detailed objects and legacy strings
  includedServices: string[];
  excludedServices: string[];
  policies: string[];
  gallery?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export const tours: TourItem[] = [];



