export type RegionId = 'himachal' | 'munnar';
export type PropertyType = 'dorms' | 'domes' | 'cottages' | 'tents' | 'cabins';
export type ContentStatus = 'draft' | 'approved';

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface PostalAddress {
  street: string;
  locality: string;
  district: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
  period: string; // e.g. 'per bed / night', 'per room / night', 'per camper'
}

export interface ImageAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface TravelRoute {
  fromCity: string;
  transitMode: string;
  routeDescription: string;
  distanceKm?: number;
}

export interface RegionData {
  id: RegionId;
  slug: string;
  name: string;
  state: string;
  primaryKeyword: string;
  targetKeywords?: string[];
  seoTitle: string;
  seoDescription: string;
  description: string;
  weight: number; // 1 for Himachal (primary), 2 for Munnar (secondary)
  heroImage: ImageAsset;
  status: ContentStatus;
}

export interface LocationData {
  id: string;
  slug: string;
  name: string;
  regionId: RegionId;
  district: string;
  altitudeFt: number;
  coordinates: GeoCoordinates;
  primaryKeyword: string;
  targetKeywords?: string[];
  seoTitle: string;
  seoDescription: string;
  description: string;
  heroImage: ImageAsset;
  howToReach: TravelRoute[];
  bestTimeToVisit: {
    seasons: string;
    summary: string;
  };
  nearbyAttractions: string[];
  status: ContentStatus;
}

export interface PropertyData {
  id: string;
  slug: string;
  name: string;
  type: PropertyType;
  typeLabel: string;
  locationId: string;
  regionId: RegionId;
  fullAddress: PostalAddress;
  coordinates: GeoCoordinates;
  phone: string;
  priceRange: PriceRange;
  amenities: string[];
  inclusions: string[];
  checkInTime: string;
  checkOutTime: string;
  images: ImageAsset[];
  rating: number;
  reviewCount: number;
  primaryKeyword: string;
  targetKeywords?: string[];
  seoTitle: string;
  seoDescription: string;
  tagline: string;
  description: string;
  verifiedStay: boolean;
  featured: boolean;
  status: ContentStatus;
}

export interface GuideSection {
  heading: string;
  content: string;
}

export interface GuideData {
  id: string;
  slug: string;
  title: string;
  regionId: RegionId;
  locationId: string;
  primaryKeyword: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  sections: GuideSection[];
  lastReviewed: string; // ISO date format YYYY-MM-DD
  status: ContentStatus;
}

export interface ReviewData {
  id: string;
  propertyId: string;
  author: string;
  city: string;
  stayName: string;
  regionId: RegionId;
  rating: number;
  date: string;
  quote: string;
  highlight: string;
  verifiedGuest: boolean;
}
