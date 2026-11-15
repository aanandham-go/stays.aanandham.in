export * from './types';
export * from './regions';
export * from './locations';
export * from './properties';
export * from './guides';
export * from './reviews';

import { regionsData } from './regions';
import { locationsData } from './locations';
import { propertiesData } from './properties';
import { guidesData } from './guides';
import { reviewsData } from './reviews';

export function getRegionBySlug(slug: string) {
  return regionsData.find(r => r.slug === slug);
}

export function getLocationsByRegion(regionId: string) {
  return locationsData.filter(l => l.regionId === regionId);
}

export function getLocationBySlug(slug: string) {
  return locationsData.find(l => l.slug === slug);
}

export function getPropertiesByRegion(regionId: string) {
  return propertiesData.filter(p => p.regionId === regionId);
}

export function getPropertiesByLocation(locationId: string) {
  return propertiesData.filter(p => p.locationId === locationId);
}

export function getPropertyBySlug(slug: string) {
  return propertiesData.find(p => p.slug === slug);
}

export function getReviewsByProperty(propertyId: string) {
  return reviewsData.filter(r => r.propertyId === propertyId);
}

export function getGuidesByRegion(regionId: string) {
  return guidesData.filter(g => g.regionId === regionId);
}

export function getGuideBySlug(slug: string) {
  return guidesData.find(g => g.slug === slug);
}
