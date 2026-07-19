import type { NewClub, Retailer } from "./types";
import { clubIconFor } from "./clubIcons";

export const RETAILERS: Retailer[] = [
  { name: "PGA Tour Superstore", domain: "pgatoursuperstore.com" },
  { name: "Golf Galaxy", domain: "golfgalaxy.com" },
  { name: "Dick's Sporting Goods", domain: "dickssportinggoods.com" },
  { name: "2nd Swing", domain: "2ndswing.com" },
];

/**
 * We don't have verified deep-link/search URL formats for each retailer's
 * site, and guessing wrong risks a dead link. A Google search scoped to the
 * retailer's domain always resolves to something useful instead.
 */
export function retailerSearchUrl(retailer: Retailer, clubName: string): string {
  const query = `${clubName} site:${retailer.domain}`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export const NEW_CLUBS: NewClub[] = [
  {
    id: 101,
    name: "TaylorMade Qi10 Driver",
    brand: "TaylorMade",
    type: "Driver",
    year: 2024,
    loft: "9°",
    shaft: "Fujikura Ventus Red TR (Regular)",
    msrp: 599,
    photos: [clubIconFor("Driver")],
    specs: {
      headSize: "460cc",
      adjustable: true,
      forgiveness: "Very High",
      distance: "Very Long",
      spin: "Low",
      material: "Carbon Twist Face",
    },
    description:
      "TaylorMade's most forgiving Qi driver to date, with a larger, higher-MOI carbon head designed to hold ball speed on off-center hits.",
  },
  {
    id: 102,
    name: "Callaway Paradym Ai Smoke Max Driver",
    brand: "Callaway",
    type: "Driver",
    year: 2024,
    loft: "10.5°",
    shaft: "Project X Denali Black (Regular)",
    msrp: 629,
    photos: [clubIconFor("Driver")],
    specs: {
      headSize: "460cc",
      adjustable: true,
      forgiveness: "Very High",
      distance: "Very Long",
      spin: "Low-Mid",
      material: "AI-designed Face",
    },
    description:
      "AI-optimized face and internal weighting built for max forgiveness, with 360° aerodynamics for faster swing speeds.",
  },
  {
    id: 103,
    name: "Titleist T100 Irons (5-PW)",
    brand: "Titleist",
    type: "Iron Set",
    year: 2023,
    loft: "5–PW",
    shaft: "True Temper Dynamic Gold 105 (Stiff)",
    msrp: 1399,
    photos: [clubIconFor("Iron Set")],
    specs: {
      headSize: "N/A",
      adjustable: false,
      forgiveness: "Mid",
      distance: "Mid",
      spin: "High",
      material: "Forged 1025 Carbon Steel",
    },
    description:
      "A tour-proven players iron with a compact forged head, precise distance control, and a soft, workable feel.",
  },
  {
    id: 104,
    name: "Ping G430 Max Driver",
    brand: "Ping",
    type: "Driver",
    year: 2023,
    loft: "10.5°",
    shaft: "Ping Alta CB Red (Regular)",
    msrp: 549,
    photos: [clubIconFor("Driver")],
    specs: {
      headSize: "460cc",
      adjustable: true,
      forgiveness: "Very High",
      distance: "Long",
      spin: "Mid",
      material: "Forged Titanium Face",
    },
    description:
      "Ping's highest-MOI driver ever, built for maximum forgiveness and a consistently high launch across the face.",
  },
  {
    id: 105,
    name: "Titleist Vokey SM10 Wedge",
    brand: "Titleist",
    type: "Wedge",
    year: 2024,
    loft: "56°",
    shaft: "True Temper Dynamic Gold (Wedge Flex)",
    msrp: 189,
    photos: [clubIconFor("Wedge")],
    specs: {
      headSize: "N/A",
      adjustable: false,
      forgiveness: "Mid",
      distance: "Short Game",
      spin: "Very High",
      material: "Tour Chrome / Raw Face options",
    },
    description:
      "The latest Vokey wedge with progressive CG placement and Titleist's most precise groove geometry yet for elite spin control.",
  },
  {
    id: 106,
    name: "Odyssey Ai-ONE Milled Putter",
    brand: "Odyssey",
    type: "Putter",
    year: 2024,
    loft: "3°",
    shaft: "Steel (35in)",
    msrp: 449,
    photos: [clubIconFor("Putter")],
    specs: {
      headSize: "Mallet",
      adjustable: false,
      forgiveness: "Very High",
      distance: "N/A",
      spin: "N/A",
      material: "Milled 1025 Carbon Steel",
    },
    description:
      "A fully milled mallet putter with Odyssey's AI-designed face pattern for consistent roll on center and off-center strikes alike.",
  },
];
