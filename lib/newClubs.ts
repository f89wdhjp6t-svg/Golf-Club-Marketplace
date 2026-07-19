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
  {
    id: 107,
    name: "Cobra Darkspeed X Driver",
    brand: "Cobra",
    type: "Driver",
    year: 2024,
    loft: "9°",
    shaft: "KBS TD 65 (Regular)",
    msrp: 599,
    photos: [clubIconFor("Driver")],
    specs: {
      headSize: "460cc",
      adjustable: true,
      forgiveness: "High",
      distance: "Very Long",
      spin: "Low",
      material: "PWR-Bridge Titanium Face",
    },
    description:
      "Cobra's fastest driver yet, with a PWR-Bridge weighting system that shifts CG for a locked-in, low-spin flight.",
  },
  {
    id: 108,
    name: "Mizuno JPX925 Hot Metal Irons (5-PW)",
    brand: "Mizuno",
    type: "Iron Set",
    year: 2025,
    loft: "5–PW",
    shaft: "Nippon NS Pro 950 (Regular)",
    msrp: 999,
    photos: [clubIconFor("Iron Set")],
    specs: {
      headSize: "N/A",
      adjustable: false,
      forgiveness: "Very High",
      distance: "Long",
      spin: "Mid",
      material: "Nickel Chromoly Face",
    },
    description:
      "A game-improvement iron with a thin, fast face and Mizuno's signature soft feel — forgiving without sacrificing workability.",
  },
  {
    id: 109,
    name: "Cleveland RTX 6 ZipCore Wedge",
    brand: "Cleveland",
    type: "Wedge",
    year: 2024,
    loft: "56°",
    shaft: "True Temper Dynamic Gold (Wedge Flex)",
    msrp: 179,
    photos: [clubIconFor("Wedge")],
    specs: {
      headSize: "N/A",
      adjustable: false,
      forgiveness: "Mid",
      distance: "Short Game",
      spin: "Very High",
      material: "ZipCore + UltiZip Grooves",
    },
    description:
      "A tour-level wedge with a low, forward center of gravity for consistent spin and feel across the whole face.",
  },
  {
    id: 110,
    name: "Srixon ZX7 Mk II Fairway Wood",
    brand: "Srixon",
    type: "Fairway Wood",
    year: 2023,
    loft: "15°",
    shaft: "Mitsubishi Tensei AV Blue (Regular)",
    msrp: 349,
    photos: [clubIconFor("Fairway Wood")],
    specs: {
      headSize: "180cc",
      adjustable: true,
      forgiveness: "High",
      distance: "Long",
      spin: "Mid",
      material: "Rebound Frame Face",
    },
    description:
      "A compact, tour-shaped fairway wood with a Rebound Frame face for consistent ball speed and easy workability.",
  },
  {
    id: 111,
    name: "PXG Black Ops Hybrid",
    brand: "PXG",
    type: "Hybrid",
    year: 2024,
    loft: "21°",
    shaft: "PX HZRDUS Smoke (Regular)",
    msrp: 349,
    photos: [clubIconFor("Hybrid")],
    specs: {
      headSize: "N/A",
      adjustable: true,
      forgiveness: "High",
      distance: "Long",
      spin: "Mid",
      material: "HT1770 Steel Face",
    },
    description:
      "A precision-milled hybrid with adjustable weighting, built to fill the gap between your longest iron and fairway wood.",
  },
  {
    id: 112,
    name: "Bettinardi Queen B Putter",
    brand: "Bettinardi",
    type: "Putter",
    year: 2024,
    loft: "3.5°",
    shaft: "Steel (34in)",
    msrp: 425,
    photos: [clubIconFor("Putter")],
    specs: {
      headSize: "Blade",
      adjustable: false,
      forgiveness: "Mid",
      distance: "N/A",
      spin: "N/A",
      material: "Carbon Steel, Honeycomb Face Milling",
    },
    description:
      "A precision-milled blade putter with Bettinardi's honeycomb face milling for soft feel and consistent roll off the face.",
  },
];
