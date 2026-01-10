// Mapbox Search API Types

export interface MapboxCoordinates {
  longitude: number;
  latitude: number;
}

export interface MapboxGeometry {
  type: 'Point';
  coordinates: [number, number];
}

export interface MapboxRegion {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
  region_code: string;
  region_code_full: string;
}

export interface MapboxCountry {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
  country_code: string;
  country_code_alpha_3: string;
}

export interface MapboxPlace {
  mapbox_id: string;
  name: string;
  wikidata_id?: string;
}

export interface MapboxStreet {
  mapbox_id: string;
  name: string;
}

export interface MapboxPostcode {
  mapbox_id: string;
  name: string;
}

export interface MapboxContext {
  region?: MapboxRegion;
  country?: MapboxCountry;
  place?: MapboxPlace;
  street?: MapboxStreet;
  postcode?: MapboxPostcode;
}

export interface MapboxFeatureProperties {
  mapbox_id: string;
  feature_type: string;
  full_address: string;
  name: string;
  name_preferred: string;
  coordinates: MapboxCoordinates;
  place_formatted: string;
  bbox?: [number, number, number, number];
  context?: MapboxContext;
}

export interface MapboxFeature {
  type: 'Feature';
  id: string;
  geometry: MapboxGeometry;
  properties: MapboxFeatureProperties;
}

export interface MapboxSearchResult {
  type: 'FeatureCollection';
  features: MapboxFeature[];
  attribution: string;
}
