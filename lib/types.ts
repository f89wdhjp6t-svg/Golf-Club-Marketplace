export type Condition = "Like New" | "Excellent" | "Very Good" | "Good" | "Fair";

export interface ClubSpecs {
  headSize: string;
  adjustable: boolean;
  forgiveness: string;
  distance: string;
  spin: string;
  material: string;
}

export interface Club {
  id: number;
  name: string;
  type: string;
  brand: string;
  year: number;
  loft: string;
  shaft: string;
  condition: Condition;
  price: number;
  originalPrice: number;
  photos: string[];
  specs: ClubSpecs;
  seller: string;
  rating: number;
  reviews: number;
  daysListed: number;
  description: string;
}

export interface AIResult {
  identifiedClub?: string;
  confidence?: "High" | "Medium" | "Low";
  conditionNote?: string;
  verdict: string;
  verdictColor: string;
  valueScore: number;
  upgradeScore: number;
  summary: string;
  prosForBuyer: string[];
  consForBuyer: string[];
  comparisonInsight: string;
  buyRecommendation: string;
  error?: string;
}

export interface ValuationSpecs {
  headSize: string;
  loft: string;
  shaft: string;
  flex: string;
  adjustable: boolean;
  forgiveness: string;
  distance: string;
  spin: string;
  material: string;
}

export interface ValuationResult {
  priceLow: number;
  priceHigh: number;
  priceSuggested: number;
  originalMSRP: number;
  marketDemand: "High" | "Medium" | "Low";
  demandColor: string;
  pricingRationale: string;
  sellingTips: string[];
  specs: ValuationSpecs;
  generatedTitle: string;
  generatedDescription: string;
  error?: string;
}

export interface SellForm {
  clubName: string;
  brand: string;
  type: string;
  year: string;
  loft: string;
  shaft: string;
  condition: Condition;
  extraNotes: string;
}

export interface NewClub {
  id: number;
  name: string;
  brand: string;
  type: string;
  year: number;
  loft: string;
  shaft: string;
  msrp: number;
  photos: string[];
  specs: ClubSpecs;
  description: string;
}

export interface Retailer {
  name: string;
  domain: string;
}

export interface StorePriceEstimate {
  store: string;
  estimatedPrice: number;
  note: string;
}

export interface StorePricesResult {
  estimates: StorePriceEstimate[];
  error?: string;
}
