import { getSupabaseClient } from "./supabase";
import type { Club, ClubSpecs, Condition } from "./types";

interface ListingRow {
  id: number;
  seller_id: string;
  name: string;
  type: string;
  brand: string;
  year: number | null;
  loft: string | null;
  shaft: string | null;
  condition: string;
  price: number;
  original_price: number | null;
  photos: string[];
  specs: ClubSpecs;
  description: string | null;
  profiles: { display_name: string } | { display_name: string }[] | null;
}

function sellerName(row: ListingRow): string {
  const p = row.profiles;
  if (!p) return "FairwayFind Seller";
  return Array.isArray(p) ? p[0]?.display_name ?? "FairwayFind Seller" : p.display_name;
}

function rowToClub(row: ListingRow): Club {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    brand: row.brand,
    year: row.year ?? new Date().getFullYear(),
    loft: row.loft ?? "—",
    shaft: row.shaft ?? "—",
    condition: row.condition as Condition,
    price: row.price,
    originalPrice: row.original_price ?? row.price,
    photos: row.photos,
    specs: row.specs,
    seller: sellerName(row),
    rating: 5.0,
    reviews: 0,
    daysListed: 0,
    description: row.description ?? "",
  };
}

export async function fetchListings(): Promise<Club[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("listings")
    .select("*, profiles(display_name)")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as unknown as ListingRow[]).map(rowToClub);
}

export async function createListing(sellerId: string, club: Omit<Club, "id" | "seller" | "rating" | "reviews" | "daysListed">): Promise<Club | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("listings")
    .insert({
      seller_id: sellerId,
      name: club.name,
      type: club.type,
      brand: club.brand,
      year: club.year,
      loft: club.loft,
      shaft: club.shaft,
      condition: club.condition,
      price: club.price,
      original_price: club.originalPrice,
      photos: club.photos,
      specs: club.specs,
      description: club.description,
    })
    .select("*, profiles(display_name)")
    .single();
  if (error || !data) return null;
  return rowToClub(data as unknown as ListingRow);
}

export interface CartEntry {
  clubId: number;
  source: "seed" | "listing";
  price: number;
}

export async function fetchCart(userId: string): Promise<CartEntry[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("cart_items")
    .select("club_id, club_source, price")
    .eq("user_id", userId);
  if (error || !data) return [];
  return data.map((r) => ({ clubId: Number(r.club_id), source: r.club_source as "seed" | "listing", price: r.price }));
}

export async function addCartItem(userId: string, clubId: number, source: "seed" | "listing", price: number) {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.from("cart_items").insert({ user_id: userId, club_id: String(clubId), club_source: source, price });
}

export async function removeCartItem(userId: string, clubId: number, source: "seed" | "listing") {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
    .eq("club_id", String(clubId))
    .eq("club_source", source);
}

export async function clearCart(userId: string) {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.from("cart_items").delete().eq("user_id", userId);
}
